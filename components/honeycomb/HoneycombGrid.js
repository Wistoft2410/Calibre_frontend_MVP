import React, { useMemo, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import PassionHex from './PassionHex';
import { hexSpiral, hexToPixel } from './hexLayout';

const MIN_ZOOM = 0.55;
const MAX_ZOOM = 1.4;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const touchDist = (touches) =>
    Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY);

// Free-panning, pinch-zoomable honeycomb canvas. One finger pans, two fingers
// zoom; taps fall through to the items because the responder only claims the
// gesture after real movement.
const HoneycombGrid = ({ items, itemSize, spacing, selectedIds, dimmedIds, onPressItem }) => {
    const positions = useMemo(
        () => hexSpiral(items.length).map((cell) => hexToPixel(cell, spacing)),
        [items.length, spacing]
    );
    const bounds = useMemo(
        () =>
            positions.reduce(
                (b, p) => ({ x: Math.max(b.x, Math.abs(p.x)), y: Math.max(b.y, Math.abs(p.y)) }),
                { x: 0, y: 0 }
            ),
        [positions]
    );

    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const zoom = useRef(new Animated.Value(1)).current;

    // Gesture bookkeeping lives in refs so the PanResponder (created once)
    // always sees current values.
    const lastRef = useRef({ x: 0, y: 0 });
    const liveRef = useRef({ x: 0, y: 0 });
    const startRef = useRef({ x: 0, y: 0 });
    const pinchRef = useRef(null);
    const modeRef = useRef(null);
    const zoomRef = useRef(1);
    const boundsRef = useRef(bounds);
    boundsRef.current = bounds;
    const sizeRef = useRef(itemSize);
    sizeRef.current = itemSize;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (evt, gs) =>
                gs.numberActiveTouches === 2 || Math.abs(gs.dx) > 6 || Math.abs(gs.dy) > 6,
            onMoveShouldSetPanResponderCapture: (evt, gs) =>
                gs.numberActiveTouches === 2 || Math.abs(gs.dx) > 6 || Math.abs(gs.dy) > 6,
            onPanResponderGrant: () => {
                startRef.current = { ...lastRef.current };
                liveRef.current = { ...lastRef.current };
                pinchRef.current = null;
                modeRef.current = null;
            },
            onPanResponderMove: (evt, gs) => {
                const touches = evt.nativeEvent.touches;
                if (gs.numberActiveTouches === 2 && touches.length >= 2) {
                    // Once a pinch starts, the rest of the gesture stays a pinch so
                    // lifting one finger doesn't cause a pan jump.
                    modeRef.current = 'pinch';
                    const d = touchDist(touches);
                    if (!pinchRef.current) {
                        pinchRef.current = { dist: d, zoom: zoomRef.current };
                        return;
                    }
                    const z = clamp(
                        (pinchRef.current.zoom * d) / pinchRef.current.dist,
                        MIN_ZOOM,
                        MAX_ZOOM
                    );
                    zoomRef.current = z;
                    zoom.setValue(z);
                } else if (modeRef.current !== 'pinch') {
                    const maxX = boundsRef.current.x + sizeRef.current;
                    const maxY = boundsRef.current.y + sizeRef.current;
                    const x = clamp(startRef.current.x + gs.dx, -maxX, maxX);
                    const y = clamp(startRef.current.y + gs.dy, -maxY, maxY);
                    liveRef.current = { x, y };
                    pan.setValue({ x, y });
                }
            },
            onPanResponderRelease: () => {
                lastRef.current = { ...liveRef.current };
            },
            onPanResponderTerminate: () => {
                lastRef.current = { ...liveRef.current };
            },
        })
    ).current;

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <Animated.View
                style={[
                    styles.anchor,
                    {
                        transform: [
                            { translateX: pan.x },
                            { translateY: pan.y },
                            { scale: zoom },
                        ],
                    },
                ]}
            >
                {items.map((item, i) => (
                    <PassionHex
                        key={item.ID}
                        item={item}
                        x={positions[i].x}
                        y={positions[i].y}
                        size={itemSize}
                        pan={pan}
                        selected={selectedIds.includes(item.ID)}
                        dimmed={!!dimmedIds && !dimmedIds.has(item.ID)}
                        onPress={onPressItem}
                    />
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        width: '100%',
    },
    anchor: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 0,
        height: 0,
    },
});

export default HoneycombGrid;
