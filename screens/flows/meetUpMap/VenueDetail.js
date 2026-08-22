import React, { useState } from 'react';
import {
    Alert, Image, Linking, Platform, ScrollView, StyleSheet, Text,
    TouchableOpacity, View, Dimensions,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Emoji from 'react-native-emoji';

import { PASSIONS } from '../../../utils/passions';

const windowWidth = Dimensions.get('window').width;

const PANEL = '#1A1A1A';
const LINK = '#2E7CF6';
const MONEY = '#1DB954';

// Google's photo endpoint enforces the key's iOS bundle restriction, so the
// image request has to carry the same header the API calls use.
const PHOTO_HEADERS = Platform.select({
    ios: { 'X-Ios-Bundle-Identifier': 'com.human-interface.calibre' },
    default: {},
});

export function photoUrl(photoReference, width = 900) {
    if (!photoReference) return null;
    const key = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}`
        + `&photo_reference=${encodeURIComponent(photoReference)}&key=${key}`;
}

const passionByName = {};
PASSIONS.forEach(p => { passionByName[p.interest.toLowerCase()] = p; });

// "$$$" in green up to the venue's tier, the remainder greyed out.
const PriceMeter = ({ price }) => {
    if (price === null || price === undefined) return null;
    if (price === 0) {
        return (
            <View style={styles.metaPill}>
                <Text style={[styles.priceOn, { color: MONEY }]}>FREE</Text>
            </View>
        );
    }
    return (
        <View style={styles.metaPill}>
            <Text style={styles.priceOn}>{'$'.repeat(price)}</Text>
            <Text style={styles.priceOff}>{'$'.repeat(3 - price)}</Text>
        </View>
    );
};

// 0·1·2·3·4·5 with the digits up to the rating highlighted.
const RatingMeter = ({ rating }) => {
    if (rating === null || rating === undefined) return null;
    const rounded = Math.round(rating);
    return (
        <View style={[styles.metaPill, styles.ratingPill]}>
            {[0, 1, 2, 3, 4, 5].map((n, i) => (
                <Text key={n} style={n <= rounded ? styles.ratingOn : styles.ratingOff}>
                    {n}{i < 5 ? '·' : ''}
                </Text>
            ))}
        </View>
    );
};

const InterestPill = ({ name }) => {
    const p = passionByName[String(name).toLowerCase()];
    if (!p) return null;
    return (
        <View style={[styles.interestPill, { backgroundColor: p.bgColor }]}>
            <Text style={[styles.interestText, { color: p.color }]}>{p.interest} </Text>
            <Emoji name={p.emojiName} style={{ fontSize: 14 }} />
        </View>
    );
};

const InfoRow = ({ icon, text, onPress }) => (
    <TouchableOpacity style={styles.infoRow} onPress={onPress} disabled={!onPress} activeOpacity={0.6}>
        <MaterialIcon name={icon} size={18} color={onPress ? '#8A8B8F' : '#B0B1B5'} style={styles.infoIcon} />
        <Text style={[styles.infoText, onPress && styles.infoLink]}>{text}</Text>
    </TouchableOpacity>
);

const VenueDetail = ({ venue, onClose }) => {
    const [saved, setSaved] = useState(false);
    const photo = photoUrl(venue.photoReference);

    const openUrl = (url) => Linking.openURL(url).catch(() =>
        Alert.alert("Couldn't open that link"));

    const openMaps = () => {
        const q = encodeURIComponent(venue.address || venue.name);
        openUrl(Platform.OS === 'ios'
            ? `https://maps.apple.com/?q=${q}`
            : `geo:0,0?q=${q}`);
    };

    return (
        <View style={styles.overlay} pointerEvents="box-none">
            <View style={styles.sheet}>
                <View style={styles.titlePill}>
                    <Text style={styles.titleText} numberOfLines={1}>{venue.name.toUpperCase()}</Text>
                </View>

                <ScrollView
                    style={styles.card}
                    contentContainerStyle={styles.cardContent}
                    showsVerticalScrollIndicator={false}
                >
                    {photo ? (
                        <Image style={styles.photo} source={{ uri: photo, headers: PHOTO_HEADERS }} />
                    ) : (
                        <View style={[styles.photo, styles.photoEmpty]}>
                            <MaterialIcon name="image" size={40} color="#C8C9CC" />
                        </View>
                    )}

                    <Text style={styles.sectionTitle}>Information</Text>

                    <View style={styles.metaRow}>
                        <PriceMeter price={venue.price} />
                        <RatingMeter rating={venue.rating} />
                        {(venue.price != null || venue.rating != null) && venue.interests.length > 0 ? (
                            <View style={styles.divider} />
                        ) : null}
                        {venue.interests.map(name => <InterestPill key={name} name={name} />)}
                    </View>

                    {venue.description ? (
                        <Text style={styles.description}>{venue.description}</Text>
                    ) : null}

                    <View style={styles.infoBlock}>
                        {venue.category ? <InfoRow icon="local-offer" text={venue.category} /> : null}
                        {venue.address ? (
                            <InfoRow icon="location-on" text={venue.address} onPress={openMaps} />
                        ) : null}
                        {venue.phone ? (
                            <InfoRow icon="phone" text={venue.phone}
                                onPress={() => openUrl(`tel:${venue.phone.replace(/\s/g, '')}`)} />
                        ) : null}
                        {venue.reviewsCount ? (
                            <InfoRow icon="star-outline"
                                text={`${venue.rating} from ${venue.reviewsCount.toLocaleString()} Google reviews`} />
                        ) : null}
                    </View>

                    {venue.website ? (
                        <TouchableOpacity style={styles.websiteButton} onPress={() => openUrl(venue.website)}>
                            <Text style={styles.websiteText}>Website </Text>
                            <MaterialCommunityIcon name="web" size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                    ) : null}
                </ScrollView>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={[styles.actionButton, styles.actionLight]} onPress={onClose}>
                    <MaterialIcon name="arrow-back-ios-new" size={24} color={PANEL} />
                </TouchableOpacity>
                <View style={styles.actionsRight}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.actionDark]}
                        onPress={() => setSaved(!saved)}
                    >
                        <MaterialIcon name={saved ? 'bookmark' : 'bookmark-border'} size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.actionDark, styles.actionSpaced]}
                        onPress={() => Alert.alert('Coming soon', 'Inviting people to a place is not built yet.')}
                    >
                        <MaterialIcon name="person-add-alt" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheet: {
        width: windowWidth - 44,
        maxHeight: '76%',
        alignItems: 'center',
    },
    titlePill: {
        backgroundColor: PANEL,
        borderRadius: 100,
        paddingHorizontal: 22,
        paddingVertical: 10,
        maxWidth: '90%',
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    card: {
        marginTop: -22,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 26,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.16,
        shadowRadius: 14,
        elevation: 8,
    },
    cardContent: {
        padding: 14,
        paddingTop: 34,
    },
    photo: {
        width: '100%',
        height: 190,
        borderRadius: 18,
        backgroundColor: '#EDEDED',
    },
    photoEmpty: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: PANEL,
        marginTop: 16,
        marginBottom: 10,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    metaPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: PANEL,
        borderRadius: 100,
        paddingHorizontal: 11,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    ratingPill: {
        backgroundColor: '#F2C230',
    },
    priceOn: { color: MONEY, fontSize: 14, fontWeight: 'bold' },
    priceOff: { color: '#5A5B5F', fontSize: 14, fontWeight: 'bold' },
    ratingOn: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' },
    ratingOff: { color: '#C9A227', fontSize: 13, fontWeight: 'bold' },
    divider: {
        width: 1,
        height: 22,
        backgroundColor: '#D8D9DC',
        marginRight: 10,
        marginBottom: 8,
    },
    interestPill: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    interestText: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#6E6F73',
        marginTop: 4,
    },
    infoBlock: {
        marginTop: 18,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
    },
    infoIcon: {
        width: 26,
    },
    infoText: {
        fontSize: 15,
        color: '#6E6F73',
        flexShrink: 1,
    },
    infoLink: {
        color: LINK,
    },
    websiteButton: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: LINK,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 9,
        marginTop: 14,
    },
    websiteText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    actions: {
        position: 'absolute',
        left: 24, right: 24, bottom: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    actionsRight: {
        flexDirection: 'row',
    },
    actionButton: {
        width: 62, height: 62,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 8,
        elevation: 5,
    },
    actionLight: { backgroundColor: '#FFFFFF' },
    actionDark: { backgroundColor: PANEL },
    actionSpaced: { marginLeft: 12 },
});

export default VenueDetail;
