// Passion picker — Apple Watch style honeycomb. Pan in any direction, pinch to
// zoom out to a bird's-eye view, tap to select. Pick at least 3, max 7.
// The first three picks become the user's "top picks" (changeable later under profile).
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Haptics from 'expo-haptics';

import HoneycombGrid from '../../../components/honeycomb/HoneycombGrid';
import { PASSIONS } from '../../../utils/passions';
import { NeuButton } from '../../../components/neu-element';
import { BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, Container, ActionContainer, HeroContainer, ProgressBar, lightGreen } from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const MIN_PICKS = 3;
const MAX_PICKS = 7;
const ITEM_SIZE = 100;
const ITEM_SPACING = 114;

// PASSIONS lives in utils/passions.js (shared with the profile cards, and the
// same names are stored on Supabase profiles). Order matters here: first item
// anchors the center of the honeycomb, the rest radiate outward ring by ring.

export default ({ navigation, route }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [showSelected, setShowSelected] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');

    // Progress bar fills from 63% (step baseline) toward 79% as picks come in,
    // matching the 63→79 hand-off the surrounding sign-up steps animate.
    const progressAnim = useRef(new Animated.Value(63)).current;
    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: 63 + (Math.min(selectedIds.length, MAX_PICKS) / MAX_PICKS) * 16,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [selectedIds.length]);
    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    const dimmedIds = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!searchOpen || !q) return null;
        return new Set(
            PASSIONS.filter(p => p.interest.toLowerCase().includes(q)).map(p => p.ID)
        );
    }, [searchOpen, query]);

    const selectedItems = useMemo(
        () => PASSIONS.filter(p => selectedIds.includes(p.ID)),
        [selectedIds]
    );

    const toggleItem = (item) => {
        if (selectedIds.includes(item.ID)) {
            Haptics.selectionAsync();
            setSelectedIds(selectedIds.filter(id => id !== item.ID));
        } else if (selectedIds.length >= MAX_PICKS) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            alert("You have already selected seven passions");
        } else {
            Haptics.selectionAsync();
            setSelectedIds([...selectedIds, item.ID]);
        }
    };

    const nextPage = () => {
        const chosenInterests = selectedItems.map(item => item.interest);

        console.log("\nBday: " + route.params.bday)
        console.log("Email: " + route.params.email)
        console.log("Name: " + route.params.firstname + " " + route.params.lastname)
        console.log("Language: " + route.params.language)
        console.log("Country: " + route.params.country)
        console.log("City: " + route.params.city)
        console.log("City lat: " + route.params.cityLat)
        console.log("City lng: " + route.params.cityLng)
        console.log("Interests: " + chosenInterests)

        navigation.navigate('Password', {
            bday: route.params.bday,
            email: route.params.email,
            firstname: route.params.firstname,
            lastname: route.params.lastname,
            language: route.params.language,
            country: route.params.country,
            city: route.params.city,
            cityLat: route.params.cityLat,
            cityLng: route.params.cityLng,
            interests: chosenInterests,
        });
    };

    const handlePress = () => {
        if (selectedIds.length < MIN_PICKS) {
            alert("Please select a minimum of 3 passions, you have only selected " + selectedIds.length);
        } else {
            nextPage();
        }
    };

    const fadeIn = {
        from: { opacity: 0 },
        to: { opacity: 1 },
    };

    const nextDisabled = selectedIds.length < MIN_PICKS;

    return (
        <Container>
            <View style={ProgressBar.progressBar}>
                <Animated.View style={[ProgressBar.progress, { width: progressWidth }]} />
            </View>

            <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>
                <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>passion</Text>?</Text>
            </Animatable.View>

            <View style={styles.canvasWrapper}>
                <HoneycombGrid
                    items={PASSIONS}
                    itemSize={ITEM_SIZE}
                    spacing={ITEM_SPACING}
                    selectedIds={selectedIds}
                    dimmedIds={dimmedIds}
                    onPressItem={toggleItem}
                />

                {searchOpen && (
                    <View style={styles.searchBar}>
                        <Icon name="search" size={16} color={PLACEHOLDER} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Find a passion"
                            placeholderTextColor={PLACEHOLDER}
                            autoFocus={true}
                            autoCorrect={false}
                            autoCapitalize='none'
                        />
                    </View>
                )}

                {showSelected && (
                    <View style={styles.selectedPanel}>
                        <Text style={styles.selectedTitle}>
                            {selectedItems.length ? "Your picks — tap to remove" : "Nothing picked yet"}
                        </Text>
                        <ScrollView>
                            <View style={styles.chipRow}>
                                {selectedItems.map(item => (
                                    <TouchableOpacity
                                        key={item.ID}
                                        onPress={() => toggleItem(item)}
                                        style={[styles.chip, { backgroundColor: item.bgColor }]}
                                    >
                                        <Text style={[styles.chipText, { color: item.color }]}>
                                            {item.interest} {item.interestsEmoji}  ✕
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )}
            </View>

            <Text style={styles.caption}>
                PICK AT <Text style={{ color: lightGreen }}>LEAST {MIN_PICKS}</Text> AND MAX {MAX_PICKS}
            </Text>

            <View style={ActionContainer.actionContainerSignUp}>
                <View style={ActionContainer.actionContainerSignUpAvoiding}>
                    <NeuButton
                        disabled={nextDisabled}
                        style={nextDisabled ? styles.lowOpacity : null}
                        onPress={handlePress} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}
                    >
                        <Text style={Neumorphism.buttonText}>
                            NEXT
                        </Text>
                    </NeuButton>
                </View>
            </View>

            <View style={{ position: 'absolute', left: 20, bottom: '10%' }}>
                <View style={ActionContainer.actionContainerSignUpAvoiding}>
                    <NeuButton
                        onPress={() => { setShowSelected(!showSelected); setSearchOpen(false); }}
                        width={50} height={50} color={BACKGROUND} borderRadius={RADIUS}
                    >
                        <Icon name="bookmark" size={20} color={COLOR} />
                        <View style={styles.count}>
                            <Text style={styles.countText}>{selectedIds.length}</Text>
                        </View>
                    </NeuButton>
                </View>
            </View>

            <View style={{ position: 'absolute', right: 20, bottom: '10%' }}>
                <View style={ActionContainer.actionContainerSignUpAvoiding}>
                    <NeuButton
                        onPress={() => { setSearchOpen(!searchOpen); setShowSelected(false); if (searchOpen) setQuery(''); }}
                        width={50} height={50} color={BACKGROUND} borderRadius={RADIUS}
                    >
                        <Icon name="search" size={20} color={COLOR} />
                    </NeuButton>
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    canvasWrapper: {
        position: 'absolute',
        top: '20%',
        bottom: '22%',
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    caption: {
        position: 'absolute',
        left: 30,
        bottom: '17.5%',
        fontSize: 14,
        letterSpacing: 1,
        color: COLOR,
    },
    searchBar: {
        position: 'absolute',
        top: 10,
        left: 30,
        right: 30,
        height: 44,
        borderRadius: RADIUS,
        backgroundColor: BACKGROUND,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowColor: '#000',
        elevation: 5,
        zIndex: 50,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        letterSpacing: 1,
        color: COLOR,
    },
    selectedPanel: {
        position: 'absolute',
        top: 10,
        left: 20,
        right: 20,
        maxHeight: '60%',
        borderRadius: 16,
        backgroundColor: BACKGROUND,
        padding: 14,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowColor: '#000',
        elevation: 5,
        zIndex: 50,
    },
    selectedTitle: {
        fontSize: 12,
        letterSpacing: 1,
        color: PLACEHOLDER,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginRight: 8,
        marginTop: 8,
    },
    chipText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    lowOpacity: {
        opacity: 0.4,
    },
    count: {
        width: 20,
        height: 20,
        backgroundColor: "#73EC70",
        borderRadius: 100,
        position: 'absolute',
        top: -10,
        right: -10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});
