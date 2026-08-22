import React, { useEffect, useMemo, useState, useRef } from 'react';
// react-native-maps 1.x no longer hangs Marker off the MapView default export,
// so it has to be imported by name.
import MapView, { Marker } from 'react-native-maps';
import {
    LayoutAnimation, Platform, StyleSheet, Text, TextInput, TouchableOpacity,
    UIManager, View, Dimensions,
} from 'react-native';
import * as Location from 'expo-location';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm

import { PASSIONS, interestsForDisplay } from '../../../utils/passions';
import { listMapVenues } from '../../../utils/venueService';
import VenueDetail from './VenueDetail';

const windowWidth = Dimensions.get('window').width;

const PANEL = '#2B2C30';
const PANEL_MUTED = '#8A8B8F';
const LINK_BLUE = '#2E7CF6';

// Below this zoom the cards collapse to plain emoji pins. Chosen from how
// tightly the partners actually cluster: a card covers ~330m of ground here, and
// the closest pair (Limitless VR / Paludan Bogcafe) is 232m apart, so this is
// about as wide as it can go before cards start colliding.
const CARD_ZOOM_THRESHOLD = 0.025;

// The map always opens on central Copenhagen (Indre By) rather than the device's
// own position — venues are Copenhagen-based, and a simulator reports San
// Francisco. The user's real position still shows as the blue dot.
const COPENHAGEN = {
    latitude: 55.6800,
    longitude: 12.5700,
    latitudeDelta: 0.035,
    longitudeDelta: 0.025,
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default ({ navigation, route }) => {
    const mapRef = useRef(null);

    const INITIAL_REGION = COPENHAGEN;

    const [venues, setVenues] = useState([]);
    const [region, setRegion] = useState(INITIAL_REGION);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [activePassions, setActivePassions] = useState([]);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(null);   // tapped pin -> summary card
    const [expanded, setExpanded] = useState(null);   // "read more" -> full detail

    // Tapping a marker on iOS also fires the map's own onPress, which would clear
    // the selection the instant it was set. The event's `marker-press` flag that
    // would tell them apart is Android-only, so fall back to timing: ignore a map
    // press that lands immediately after a marker press.
    const lastMarkerPress = useRef(0);
    const onMapPress = () => {
        if (Date.now() - lastMarkerPress.current < 400) return;
        setSelected(null);
    };
    const onMarkerPress = (venue) => {
        lastMarkerPress.current = Date.now();
        setSelected(venue);
    };

    useEffect(() => {
        listMapVenues().then(setVenues);
    }, []);

    // Partners run from Gentofte down to Christiania, so no fixed zoom shows them
    // all. Let the map work out the framing once the data is in — edgePadding
    // keeps markers clear of the search panel and the detail card.
    useEffect(() => {
        if (!venues.length || !mapRef.current) return;
        mapRef.current.fitToCoordinates(
            venues.map(v => ({ latitude: v.latitude, longitude: v.longitude })),
            {
                edgePadding: { top: 240, right: 70, bottom: 140, left: 70 },
                animated: false,
            }
        );
    }, [venues]);

    // The native map draws the live user dot itself (showsUserLocation), so this
    // only needs to run once to ask for permission.
    useEffect(() => {
        let cancelled = false;
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (cancelled || status !== 'granted') return;
        })();
        return () => { cancelled = true; };
    }, []);

    const toggleFilters = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFiltersOpen(!filtersOpen);
    };

    const togglePassion = (name) => {
        setActivePassions(
            activePassions.includes(name)
                ? activePassions.filter(p => p !== name)
                : [...activePassions, name]
        );
    };

    // A venue shows when it matches the search text and, if any passion filters
    // are on, when it offers at least one of them.
    const visibleVenues = useMemo(() => {
        const q = query.trim().toLowerCase();
        return venues.filter(v => {
            const matchesQuery = !q
                || v.name.toLowerCase().includes(q)
                || (v.category || '').toLowerCase().includes(q);
            const matchesPassion = activePassions.length === 0
                || v.interests.some(p => activePassions.includes(p));
            return matchesQuery && matchesPassion;
        });
    }, [venues, query, activePassions]);

    const showCards = region.latitudeDelta < CARD_ZOOM_THRESHOLD;

    // Only offer filters for passions some venue actually has, so there are no
    // dead pills that filter everything away.
    const filterablePassions = useMemo(() => {
        const offered = new Set();
        venues.forEach(v => v.interests.forEach(p => offered.add(p)));
        return PASSIONS.filter(p => offered.has(p.interest));
    }, [venues]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                initialRegion={INITIAL_REGION}
                onRegionChangeComplete={setRegion}
                onPress={onMapPress}
                mapType={"standard"}
                userInterfaceStyle={'light'}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsCompass={false}
                scrollEnabled={true}
                zoomEnabled={true}
                rotateEnabled={true}
                pitchEnabled={true}
                loadingEnabled={true}
                loadingBackgroundColor={'#F2F2F2'}
            >
                {visibleVenues.map(venue => (
                    <Marker
                        key={venue.id}
                        coordinate={{ latitude: venue.latitude, longitude: venue.longitude }}
                        onPress={() => onMarkerPress(venue)}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        {/* The tapped partner expands even when zoomed out, so a pin
                            always gives its details on the first tap. */}
                        {showCards || (selected && selected.id === venue.id) ? (
                            <VenueCard venue={venue} />
                        ) : (
                            <VenuePin venue={venue} />
                        )}
                    </Marker>
                ))}
            </MapView>

            {/* Search + passion filters, floating over the map */}
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchInput}
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search in Calibre"
                            placeholderTextColor={PANEL_MUTED}
                            autoCorrect={false}
                            returnKeyType="search"
                        />
                        <MaterialIcon name="search" size={24} color={PANEL_MUTED} />
                    </View>
                    <TouchableOpacity style={styles.globeButton} onPress={() => navigation.goBack()}>
                        <MaterialIcon name="public" size={windowWidth * 0.075} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>

                {filtersOpen ? (
                    <View style={styles.pillWrap}>
                        {filterablePassions.map(p => {
                            const on = activePassions.includes(p.interest);
                            return (
                                <TouchableOpacity
                                    key={p.ID}
                                    onPress={() => togglePassion(p.interest)}
                                    style={[
                                        styles.pill,
                                        { backgroundColor: p.bgColor },
                                        !on && activePassions.length > 0 && styles.pillDimmed,
                                    ]}
                                >
                                    <Text style={[styles.pillText, { color: p.color }]}>
                                        {p.interest.toUpperCase()} {p.interestsEmoji}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ) : (
                    <Text style={styles.filterLabel}>
                        {activePassions.length > 0
                            ? `${activePassions.length} passion${activePassions.length > 1 ? 's' : ''} selected`
                            : 'Filter passions'}
                    </Text>
                )}

                <TouchableOpacity style={styles.chevron} onPress={toggleFilters}>
                    <MaterialIcon
                        name={filtersOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={26}
                        color={PANEL_MUTED}
                    />
                </TouchableOpacity>
            </View>

            {/* Detail card for the tapped venue */}
            {selected ? (
                <View style={styles.detail}>
                    <View style={styles.detailTop}>
                        <Text style={styles.detailName}>{selected.name}</Text>
                        <TouchableOpacity onPress={() => setSelected(null)} style={styles.detailClose}>
                            <MaterialIcon name="close" size={20} color="#1A1A1A" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailRow}>
                        {selected.category ? (
                            <View style={[styles.tag, styles.tagSpaced, styles.tagOpen]}>
                                <Text style={styles.tagText}>{selected.category.toUpperCase()}</Text>
                            </View>
                        ) : null}
                        <PriceTag price={selected.price} />
                        <View style={styles.detailEmojis}>
                            {interestsForDisplay(selected.interests).map(i => (
                                <View key={i.emoji} style={[styles.emojiCircle, { backgroundColor: i.bgColor }]}>
                                    <Emoji name={i.emoji} style={{ fontSize: 14 }} />
                                </View>
                            ))}
                        </View>
                    </View>
                    {selected.address ? (
                        <Text style={styles.detailPassions}>{selected.address}</Text>
                    ) : null}
                    <TouchableOpacity style={styles.readMore} onPress={() => setExpanded(selected)}>
                        <Text style={styles.readMoreText}>Read more</Text>
                        <MaterialIcon name="chevron-right" size={20} color={LINK_BLUE} />
                    </TouchableOpacity>
                </View>
            ) : null}

            {/* Full partner page */}
            {expanded ? (
                <VenueDetail venue={expanded} onClose={() => setExpanded(null)} />
            ) : null}
        </View>
    );
}

// price is null for partners nobody has researched yet, 0 for free entry.
const PriceTag = ({ price }) => {
    if (price === null || price === undefined) return null;
    return (
        <View style={styles.tag}>
            <Text style={styles.priceText}>{price === 0 ? 'FREE' : '$'.repeat(price)}</Text>
        </View>
    );
};

// White rounded card marker: name + price on top, category + passions below.
const VenueCard = ({ venue }) => (
    <View style={styles.card}>
        <View style={styles.cardTop}>
            <Text style={styles.cardName} numberOfLines={1}>{venue.name}</Text>
            <PriceTag price={venue.price} />
        </View>
        <View style={styles.cardBottom}>
            {venue.category ? (
                <View style={[styles.tag, styles.tagOpen]}>
                    <Text style={styles.tagText} numberOfLines={1}>{venue.category.toUpperCase()}</Text>
                </View>
            ) : <View />}
            <View style={styles.cardEmojis}>
                {interestsForDisplay(venue.interests).map(i => (
                    <View key={i.emoji} style={[styles.emojiCircle, { backgroundColor: i.bgColor }]}>
                        <Emoji name={i.emoji} style={{ fontSize: 14 }} />
                    </View>
                ))}
            </View>
        </View>
    </View>
);

// Collapsed form when zoomed out: just the venue's first passion as a pin.
const VenuePin = ({ venue }) => {
    const first = interestsForDisplay(venue.interests)[0];
    return (
        <View style={[styles.pin, { backgroundColor: (first && first.bgColor) || '#FFFFFF' }]}>
            {first ? <Emoji name={first.emoji} style={{ fontSize: 16 }} /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },

    // --- header panel ---
    header: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        backgroundColor: PANEL,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingTop: 60,
        paddingHorizontal: 18,
        paddingBottom: 6,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBar: {
        flex: 1,
        height: 52,
        backgroundColor: '#3A3B40',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 17,
        padding: 0,
    },
    globeButton: {
        width: windowWidth / 6,
        height: windowWidth / 6,
        borderRadius: windowWidth / 6 * 0.26,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    filterLabel: {
        color: PANEL_MUTED,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 12,
    },
    pillWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 14,
    },
    pill: {
        borderRadius: 100,
        paddingHorizontal: 16,
        paddingVertical: 10,
        margin: 4,
    },
    pillDimmed: {
        opacity: 0.35,
    },
    pillText: {
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    chevron: {
        alignSelf: 'center',
        paddingTop: 2,
        paddingHorizontal: 30,
    },

    // --- venue markers ---
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        minWidth: 150,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 4,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginRight: 8,
        flexShrink: 1,
    },
    cardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    cardEmojis: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    emojiCircle: {
        width: 26, height: 26,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
    tag: {
        backgroundColor: PANEL,
        borderRadius: 100,
        paddingHorizontal: 9,
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagSpaced: {
        marginRight: 8,
    },
    tagOpen: {
        backgroundColor: '#1A1A1A',
    },
    tagClosed: {
        backgroundColor: '#9A9A9A',
    },
    tagText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    priceText: {
        color: '#4FCB8D',
        fontSize: 11,
        fontWeight: 'bold',
    },
    pin: {
        width: 34, height: 34,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },

    // --- tapped venue detail ---
    detail: {
        position: 'absolute',
        left: 18, right: 18, bottom: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 8,
    },
    detailTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detailName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
        flexShrink: 1,
    },
    detailClose: {
        width: 30, height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    detailEmojis: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    detailPassions: {
        marginTop: 12,
        color: '#8A8B8F',
        fontSize: 14,
    },
    readMore: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    readMoreText: {
        color: LINK_BLUE,
        fontSize: 15,
        fontWeight: 'bold',
    },
});
