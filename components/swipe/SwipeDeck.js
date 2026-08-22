import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;
const CARDS_BEHIND = 2; // how many cards peek out under the top one

// Tinder-style card deck. Drag the top card: past a quarter of the screen it
// flies off and the next card comes forward, otherwise it springs back.
// Exposes swipeLeft()/swipeRight() via ref so the footer buttons can drive it too.
const SwipeDeck = forwardRef(({
    data,
    renderCard,
    renderEmpty,
    onSwipeLeft,
    onSwipeRight,
    cardWidth,
    cardHeight,
}, ref) => {
    const [index, setIndex] = useState(0);
    const position = useRef(new Animated.ValueXY()).current;
    // Blocks a second swipe while one is still flying off, so rapid taps on the
    // footer buttons can't skip a card.
    const animating = useRef(false);

    // The PanResponder is created once, so it must read live values through a
    // ref rather than closing over the first render's props/state.
    const live = useRef({});
    live.current = { data, index, onSwipeLeft, onSwipeRight };

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
        }).start();
    };

    const onSwipeComplete = (direction) => {
        const { data: items, index: i, onSwipeLeft: left, onSwipeRight: right } = live.current;
        const item = items[i];
        position.setValue({ x: 0, y: 0 });
        setIndex(i + 1);
        animating.current = false;
        if (direction === 'right') {
            right && right(item);
        } else {
            left && left(item);
        }
    };

    const forceSwipe = (direction) => {
        const { data: items, index: i } = live.current;
        if (i >= items.length || animating.current) return; // nothing left, or one already in flight

        animating.current = true;
        Animated.timing(position, {
            toValue: { x: direction === 'right' ? SCREEN_WIDTH * 1.6 : -SCREEN_WIDTH * 1.6, y: 40 },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false,
        }).start(() => onSwipeComplete(direction));
    };

    useImperativeHandle(ref, () => ({
        swipeLeft: () => forceSwipe('left'),
        swipeRight: () => forceSwipe('right'),
        getCurrent: () => live.current.data[live.current.index],
        reset: () => {
            position.setValue({ x: 0, y: 0 });
            animating.current = false;
            setIndex(0);
        },
    }));

    const panResponder = useRef(
        PanResponder.create({
            // Claim the gesture only after real movement, so taps still reach the card.
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (evt, gs) =>
                !animating.current && (Math.abs(gs.dx) > 6 || Math.abs(gs.dy) > 6),
            onPanResponderMove: (evt, gs) => {
                position.setValue({ x: gs.dx, y: gs.dy });
            },
            onPanResponderRelease: (evt, gs) => {
                if (gs.dx > SWIPE_THRESHOLD) {
                    forceSwipe('right');
                } else if (gs.dx < -SWIPE_THRESHOLD) {
                    forceSwipe('left');
                } else {
                    resetPosition();
                }
            },
            onPanResponderTerminate: () => resetPosition(),
        })
    ).current;

    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
        outputRange: ['-28deg', '0deg', '28deg'],
    });

    // The card underneath grows toward full size as the top card is dragged away.
    const behindScale = position.x.interpolate({
        inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
        outputRange: [1, 0.94, 1],
        extrapolate: 'clamp',
    });

    if (index >= data.length) {
        return <View style={styles.container}>{renderEmpty && renderEmpty()}</View>;
    }

    const cards = [];
    const last = Math.min(index + CARDS_BEHIND, data.length - 1);

    // Deepest card first so the active one is rendered last (i.e. on top).
    for (let i = last; i >= index; i--) {
        const item = data[i];
        const depth = i - index;

        if (depth === 0) {
            cards.push(
                <Animated.View
                    key={item.id || i}
                    style={[
                        styles.card,
                        { width: cardWidth, height: cardHeight },
                        { transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }] },
                    ]}
                    {...panResponder.panHandlers}
                >
                    {renderCard(item)}
                </Animated.View>
            );
        } else {
            cards.push(
                <Animated.View
                    key={item.id || i}
                    style={[
                        styles.card,
                        { width: cardWidth, height: cardHeight },
                        {
                            transform: [
                                { scale: depth === 1 ? behindScale : 0.88 },
                                { translateY: depth * 10 },
                            ],
                            opacity: depth === 1 ? 1 : 0.7,
                        },
                    ]}
                    pointerEvents="none"
                >
                    {renderCard(item)}
                </Animated.View>
            );
        }
    }

    return <View style={styles.container}>{cards}</View>;
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SwipeDeck;
