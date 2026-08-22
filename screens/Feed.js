import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import PropTypes from 'prop-types';

import { NeuView, NeuButton } from '../components/neu-element';
import SwipeDeck from '../components/swipe/SwipeDeck';
import { listDiscoverProfiles } from '../utils/profileService';
import { interestsForDisplay } from '../utils/passions';
import { RADIUS } from '../components/Style';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth - windowWidth / 8;
const neuHeight = windowHeight - windowHeight / 2.3;

const getAge = (dateString) => {
    if (!dateString) return '?';
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// One person's card — the same layout for the active card and the ones stacked
// behind it.
const ProfileCard = ({ profile, BACKGROUND, onPress }) => {
    const interests = interestsForDisplay(profile.interests).slice(0, 3);

    return (
        <TouchableOpacity activeOpacity={0.95} onPress={onPress} disabled={!onPress}>
            <NeuView height={neuHeight} width={neuWidth} color={BACKGROUND} borderRadius={25}>
                <View style={styles.profile}>
                    <View style={styles.profileNameTagContainer}>
                        <Text style={styles.profileNameTag}>{profile.firstName}, {getAge(profile.bday)}</Text>
                    </View>
                    <View style={styles.profilePhotoContainer}>
                        {profile.profileImage ? (
                            <Image
                                style={styles.profilePhoto}
                                source={{ uri: profile.profileImage }}
                            />
                        ) : (
                            <Image
                                style={[styles.profilePhoto, { backgroundColor: "#fff" }]}
                                source={require('../assets/calibre.png')}
                            />
                        )}
                    </View>
                    <View style={styles.userInterests}>
                        {interests.map((item) => (
                            <View key={item.emoji} style={[styles.interest, { backgroundColor: item.bgColor }]}>
                                <Emoji name={item.emoji} style={{ fontSize: 25 }} />
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.quickinfo}>
                    <NeuView height={neuHeight / 2.6} width={neuWidth - 25} color={BACKGROUND} borderRadius={10}>
                        <View style={styles.quickinfoView}>
                            <View style={styles.quickinfoHeaderView}>
                                <Text style={styles.quickinfoHeaderText}>- Quick info -</Text>
                            </View>
                            <View style={styles.quickinfoTextView}>
                                <MaterialIcon name="location-on" size={windowWidth / 6 / 3} color={"gray"} />
                                <Text style={styles.quickinfoText}> {profile.city}{profile.country ? ", " + profile.country : ""}</Text>
                            </View>
                            <View style={styles.quickinfoTextView}>
                                <MaterialIcon name="chat-bubble-outline" size={windowWidth / 6 / 3} color={"gray"} />
                                <Text style={styles.quickinfoText} numberOfLines={2}> {profile.description || "No description yet"}</Text>
                            </View>
                        </View>
                    </NeuView>
                </View>
            </NeuView>
        </TouchableOpacity>
    );
};

const Feed = forwardRef((props, ref) => {
    const {
        open,
        BACKGROUND,
        ...rest
    } = props;

    const [profiles, setProfiles] = useState(null); // null = still loading
    const deckRef = useRef();

    useEffect(() => {
        listDiscoverProfiles().then(setProfiles);
    }, []);

    // Lets Menu's footer buttons drive the deck.
    useImperativeHandle(ref, () => ({
        swipeLeft: () => deckRef.current && deckRef.current.swipeLeft(),
        swipeRight: () => deckRef.current && deckRef.current.swipeRight(),
        getCurrentProfile: () => deckRef.current && deckRef.current.getCurrent(),
    }));

    if (profiles === null) {
        return (
            <View style={styles.feed}>
                <ActivityIndicator size="large" style={{ marginTop: '40%' }} />
            </View>
        );
    }

    const onSwipeRight = (profile) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        console.log('Liked:', profile.firstName);
        // TODO: persist likes to Supabase once the matching table exists.
    };

    const onSwipeLeft = (profile) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        console.log('Passed:', profile.firstName);
    };

    const renderEmpty = () => (
        <View style={styles.emptyState}>
            <MaterialIcon name="group" size={80} color="lightgray" />
            <Text style={styles.emptyText}>
                {profiles.length === 0
                    ? "No one to discover yet — check back soon!"
                    : "That's everyone for now!"}
            </Text>
            {profiles.length > 0 && (
                <NeuButton
                    onPress={() => deckRef.current && deckRef.current.reset()}
                    width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}
                    style={{ marginTop: 20 }}
                >
                    <Text style={styles.emptyButtonText}>START OVER</Text>
                </NeuButton>
            )}
        </View>
    );

    return (
        // the profiles being browsed in the 'Discover People' section
        <View style={styles.feed}>
            <SwipeDeck
                ref={deckRef}
                data={profiles}
                cardWidth={neuWidth}
                cardHeight={neuHeight}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
                renderEmpty={renderEmpty}
                renderCard={(profile) => (
                    <ProfileCard profile={profile} BACKGROUND={BACKGROUND} onPress={() => open(profile)} />
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({

    feed: {
        position: 'absolute',
        top: '12%',
        width: '100%',
        height: '70%',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    emptyState: {
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
    emptyButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: 'gray',
    },
    profile: {
        width: neuWidth - 25,
        height: '48%',
        top: 14,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgb(158,215,204)",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 1,
    },
    profilePhotoContainer: {
        position: 'absolute',
        left: 20,
        height: windowWidth / 2.3, width: windowWidth / 2.3,
        borderRadius: 100,
        backgroundColor: '#000',
        overflow: 'hidden',
        borderWidth: 10,
        borderColor: "rgb(87,182,159)",
    },
    profilePhoto: {
        width: '100%',
        height: '100%'
    },
    profileNameTagContainer: {
        position: 'absolute',
        backgroundColor: '#000',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 3,
        paddingTop: 3,
        top: -10,
        zIndex: 2,
    },
    profileNameTag: {
        color: '#FFF',
        letterSpacing: 0,
        fontWeight: '700',
        fontSize: 16,
        textTransform: "uppercase",
    },
    userInterests: {
        position: 'absolute',
        right: 25,
        top: "10%",
        borderColor: '#FFF',
        borderWidth: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 30,
        paddingBottom: 2, paddingTop: 2,
        paddingLeft: 5, paddingRight: 5,
        height: "80%",

    },
    interest: {
        width: 45, height: 45,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quickinfo: {
        width: '100%',
        height: '45%',
        bottom: 2,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    quickinfoView: {
        width: '100%', height: '90%',
        justifyContent: 'space-around',
        top: -5,
    },
    quickinfoHeaderView: {
        width: '100%',
        alignItems: 'center',
    },
    quickinfoHeaderText: {
        fontWeight: 'bold',
        fontSize: 12,

    },
    quickinfoTextView: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    quickinfoText: {
        fontSize: 18,
        color: 'gray',
        fontWeight: '400',
        paddingLeft: 10,
        flexShrink: 1,
    },
});

Feed.propTypes = {
    open: PropTypes.func,
    BACKGROUND: PropTypes.string,
};
export default Feed;
