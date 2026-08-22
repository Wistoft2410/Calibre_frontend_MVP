import React, { useMemo } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Fisheye effect: items shrink as they approach the viewport edges, like the
// Apple Watch launcher. True radial distance isn't expressible with Animated's
// interpolation, so we approximate it by multiplying independent x/y falloffs.
const EDGE_X = windowWidth * 0.7;
const EDGE_Y = windowHeight * 0.32;
const MIN_SCALE = 0.55;

const PassionHex = ({ item, x, y, size, pan, selected, dimmed, onPress }) => {
    const scale = useMemo(() => {
        const sx = Animated.add(pan.x, x).interpolate({
            inputRange: [-EDGE_X, 0, EDGE_X],
            outputRange: [MIN_SCALE, 1, MIN_SCALE],
            extrapolate: 'clamp',
        });
        const sy = Animated.add(pan.y, y).interpolate({
            inputRange: [-EDGE_Y, 0, EDGE_Y],
            outputRange: [MIN_SCALE, 1, MIN_SCALE],
            extrapolate: 'clamp',
        });
        return Animated.multiply(sx, sy);
    }, [pan.x, pan.y, x, y]);

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: x - size / 2,
                top: y - size / 2,
                width: size,
                height: size,
                transform: [{ scale }],
                opacity: dimmed ? 0.22 : 1,
            }}
        >
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => onPress(item)}
                style={[
                    styles.circle,
                    { backgroundColor: item.bgColor },
                    selected && styles.circleSelected,
                ]}
            >
                <Text style={styles.emoji}>{item.interestsEmoji}</Text>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    minimumFontScale={0.6}
                    style={[styles.label, { color: item.color, width: size - 18 }]}
                >
                    {item.interest}
                </Text>
                {selected && (
                    <Animated.View style={styles.badge}>
                        <Text style={styles.badgeText}>✓</Text>
                    </Animated.View>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    circle: {
        flex: 1,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        shadowColor: '#000',
        elevation: 3,
    },
    circleSelected: {
        borderWidth: 3,
        borderColor: '#FFFFFF',
        shadowOpacity: 0.55,
        elevation: 6,
    },
    emoji: {
        fontSize: 28,
        marginBottom: 2,
    },
    label: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    badge: {
        position: 'absolute',
        top: 2,
        right: 8,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#2ECC40',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default React.memo(PassionHex);
