import React, { useEffect, useState }from 'react';
import {ActivityIndicator, Animated, Linking, StyleSheet, View, Text, StatusBar, Button, TouchableOpacity, Image, TouchableWithoutFeedback, MaskedView, Switch} from 'react-native';
import {AuthContext} from '../utils/authContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // https://oblador.github.io/react-native-vector-icons/
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { FeedStackScreen } from '../config/navigation';
import * as Haptics from 'expo-haptics';
import SwitchCustom from 'expo-custom-switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import changeSVGColor from '@killerwink/lottie-react-native-color';
import * as Location from 'expo-location';


import { getOwnProfile } from '../utils/profileService';
import { interestsForDisplay } from '../utils/passions';
import { NeuView, NeuInput, NeuButton, NeuSwitch } from '../components/neu-element';
import {menuIconLight,lightGreen, darkGreen , RADIUS,  Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown, LogoContainer} from "../components/Style";

import { Dimensions } from 'react-native';

import Feed from '../screens/Feed'
import UserCard from '../screens/userCard'
import Messages from '../screens/Messages'
import Setteings from '../screens/Settings'
import Profile from '../screens/Profile'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth-windowWidth/12;
const neuHeight = windowHeight-windowWidth/1.5;

// Version 0: This is the first version off the app with messages and edit profile
// Version 1: This is the second version off the app with simpel meetUpMap
const appVersion = 1;

// Icon colour for the Discover People action buttons (white circles).
const ACTION_ICON = "#1A1A1A";

// Drop-down navigation, top to bottom. `key` doubles as the title it opens,
// except "map" which pushes the meetUpMap screen instead of switching tabs.
// Icon names match the Material Icons used in the Calibre 3.0 XD prototype.
const NAV_ITEMS = [
    { key: 'map',        icon: 'public' },
    { key: 'people',     icon: 'supervised-user-circle' },
    { key: 'mes',        icon: 'chat' },
    { key: 'people-set', icon: 'dashboard' },
    { key: 'set',        icon: 'build' },
];

// The header button mirrors whichever section is open. Expanded cards borrow
// their parent section's icon.
const navIconFor = (title) => {
    const key = title === 'userCard' ? 'people' : title === 'userCard-set' ? 'people-set' : title;
    const item = NAV_ITEMS.find(i => i.key === key);
    return item ? item.icon : null;
};

export default ({ navigation, route }) => {

    const feedRef = React.useRef(); // lets the footer buttons swipe the Discover deck
    const [viewedProfile, setViewedProfile] = React.useState(null); // person shown in the expanded card
    const [interests, setInterests] = React.useState();
    const [userData, setUserData] = React.useState();
    const [ID, setID] = React.useState();
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [age, setAge] = React.useState();
    const [city, setCity] = React.useState();
    const [email, setEmail] = React.useState();
    const [gender, setGender] = React.useState();
    const [phone, setPhone] = React.useState();
    const [countryID, setCountryID] = React.useState();
    const [profileImage, setProfileImage] = React.useState();
    const [description, setDescription] = React.useState();
    const [latitude, setLatitude] = React.useState(55.68);
    const [longitude, setLongitude] = React.useState(12.57);
    const [locationAllowed, setLocationAllowed] = React.useState(false);


   

    // get information about the signed-in user from Supabase
    const getData = async () => {
      try {
        const profile = await getOwnProfile();
        if (!profile) return;

        setID(profile.id)
        setFirstName(profile.firstName)
        setLastName(profile.lastName)
        setAge(profile.bday) // userCard's getAge() turns the birthdate into an age
        setCity(profile.city)
        setEmail(profile.email)
        setGender(profile.gender)
        setPhone(profile.phone)
        setCountryID(profile.country)
        setProfileImage(profile.profileImage)
        setDescription(profile.description)
        setInterests(interestsForDisplay(profile.interests))
      } catch (error) {
        console.error(error);
      }
    }


    


    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isEnabled, setEnabled] = React.useState(false);
    const [isThemeEnabled, setThemeEnabled] = React.useState(false);
    const [title, setTitle] = React.useState("people-set");
    const [BACKGROUND, setBACKGROUND] = React.useState("#F2F2F2");
    const [COLOR, setCOLOR] = React.useState("");
    const [PLACEHOLDER, setPLACEHOLDER] = React.useState("");

    // store data about theme
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@theme', jsonValue)
        } catch (e) {
          // saving error
        }
      }
// get data about theme
      const retrieveTheme = async () => {
        try {
          const value = await AsyncStorage.getItem('@theme');
          if (value !== null) {
        
            const val = JSON.parse(value)
            setBACKGROUND(val.bgColor)
            return val.theme
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    //   toggle the theme switch on load. so it matches the right theme
      const themeToggle = async ()=> {
        const theme = await retrieveTheme()
        console.log("Theme: "+theme)
        theme == "dark" ? (
            setThemeEnabled(true)
        ) : (
            setThemeEnabled(false)
        )
      }

       // location variables
        const [location, setLocation] = useState(null);
        const [errorMsg, setErrorMsg] = useState(null);
        const[currentCity, setCurrentCity] = useState(null);

    // Check if location is allowed and if true get location. If false title will be set to "nonLoc" and a screen will show that location should be enabled.
      const getLocation = async (geo) => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLocation(null);
          setLocationAllowed(false);
          setCurrentCity(null); // Delete saved location information, when location it turned off
          console.log(errorMsg);
          return;
        }


        let location = await Location.getCurrentPositionAsync({});
        // console.log('Location: ')
        // console.log(location);
        setErrorMsg(null);
        setLocation(location);

        
            
        
      }

      const GetCurrentLocation = async () => {
        // do not check if access to location is granted, since it only runs if it is
        let { coords } = await Location.getCurrentPositionAsync();
      
        if (coords) {
          const { latitude, longitude } = coords;
            setLongitude(longitude);
            setLatitude(latitude);
            setLocationAllowed(true);

          let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
          });
      
          for (let item of response) {
            // let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`; // gets address
            let city = item.city;
            setCurrentCity(city);
            // console.log("Current city: " + city);
          }
        }
      };  


      useEffect(() => {
        retrieveTheme();
        themeToggle();
        getData(); // profile comes from Supabase now — no need to poll, edits refetch on return
        getLocation(); // get location on load
        GetCurrentLocation() // get city onload
        const interval = setInterval(() => {
            getLocation(); // get new location on interval
            GetCurrentLocation();
          }, 10000);
        return () => {clearInterval(interval)} // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.


    },[0])


      
      
    const closeMenu = () => {
        setIsMenuOpen(false);
    }
    const openMenu = () => {
        setIsMenuOpen(true);
    }

    // 0 = nav closed, 1 = nav open. Drives both the panel dropping in and the
    // content sliding out of its way.
    const menuAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.spring(menuAnim, {
            toValue: isMenuOpen ? 1 : 0,
            useNativeDriver: true,
            friction: 9,
            tension: 55,
        }).start();
    }, [isMenuOpen]);

    const contentShift = menuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -windowWidth * 0.24],
    });
    const contentFade = menuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.25],
    });
    const panelDrop = menuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-windowHeight * 0.55, 0],
    });

    // Flips between Discover People and Your Profile (and the event equivalents).
    // open() keeps isEnabled in sync, so menu navigation and this switch agree.
    const toggleSwitch  = () => {
        const next = !isEnabled;
        if (title == "people" || title == "people-set") {
            open(next ? "people" : "people-set");
        } else {
            open(next ? "event" : "event-set");
        }
    }

    // toggle the theme on switch
    const toggleTheme = async () => {
        isThemeEnabled ? (
            storeData({"theme":"light","bgColor": "#F2F2F2", "color": "rgba(0, 0, 0, 0.8)", "placeholder" :"rgba(0, 0, 0, 0.4)", "shadow": "rgba(209, 205, 199, 0.72)"})
        ):(
            storeData({"theme":"dark","bgColor": "#35363A", "color": "rgba(255, 255, 255, 0.8)", "placeholder" :"rgba(255, 255, 255, 0.4)", "shadow": "rgba(28, 29, 33, 0.5)"})
        )
        retrieveTheme()
        console.log(BACKGROUND)
        setThemeEnabled(!isThemeEnabled);
    }

    const openMessage = (user, userToName, userTo, photoUri) => {
        console.log(user, userToName, userTo, photoUri)
        navigation.navigate('Message', {
            user: user,
            userToName: userToName,
            userTo: userTo,
            photoUri: photoUri,
            BACKGROUND: BACKGROUND,
        })
    }
    const openEditProfile = () => {
        
        navigation.navigate('editProfile', {
            BACKGROUND: BACKGROUND,
            user:ID,
            age: age,
            city: city,
            countryID: countryID,
            email: email,
            firstName: firstName,
            gender: gender,
            lastName: lastName,
            phone: phone,
        })
    }
    const editProfile = (edit) => {
        console.log(route)
         navigation.navigate(edit, {
            edit: "userCard",
            BACKGROUND: BACKGROUND,
            user:ID,
            age: age,
            city: city,
            countryID: countryID,
            email: email,
            firstName: firstName,
            gender: gender,
            lastName: lastName,
            phone: phone,
         })
     }

     const map = () => {
        console.log(route)
         navigation.navigate("Map", {
            longitude: longitude,
            latitude: latitude,
            locationAllowed: locationAllowed,
         })
     }

    const fadeOut = {
    from: {
        opacity: 1,
        zIndex: 99,
    },
    to: {
        opacity: 0,
        zIndex: -99,
    },
    };
    const fadeIn = {
      from: {
          opacity: 0,
      },
      to: {
          opacity: 1,

      },
    };

    // Expands the person currently on top of the Discover deck.
    const openViewedCard = (profile) => {
        const person = profile || (feedRef.current && feedRef.current.getCurrentProfile());
        if (!person) return;
        setViewedProfile(person);
        open("userCard");
    }

    const open = (value) => {
        setTitle(value)
        // Keep the Discover/Profile switch showing where we actually are.
        if (value == "people" || value == "event") setEnabled(true);
        if (value == "people-set" || value == "event-set") setEnabled(false);
        closeMenu()
    }


    return(


      <Container style={{backgroundColor: BACKGROUND}}>
         
        <Animatable.View style={styles.container} animation={fadeIn} duration={500} delay={500}> 

        {/* Everything except the drop-down nav. Slides left and dims while the nav is open. */}
        <Animated.View
            style={[styles.content, {opacity: contentFade, transform: [{translateX: contentShift}]}]}
            pointerEvents={isMenuOpen ? 'none' : 'auto'}
        >

          {title != "userCard" && title != "userCard-set" ? (
            <View style={styles.header}>
                {/* Display switch */}
                <View style={styles.switch}>
                    {title == 'people' || title == 'event' || title == 'people-set' || title == 'event-set' ? (
                        <Switch
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            ios_backgroundColor={BACKGROUND}
                            trackColor={{ false: "#FFF", true: darkGreen }}
                            thumbColor={isEnabled ? lightGreen : lightGreen}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    ) : title == 'set' ? (
                        <SwitchCustom
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            onChange={toggleTheme}
                            
                            value={isThemeEnabled}
                            rightColor="rgba(255,255,255,0.6)"
                            leftColor="rgba(0,0,0,0.6)"
                            iconLeft={{
                                name: 'white-balance-sunny',
                                color: 'yellow',
                                style: {
                                  height: 22,
                                  width: 22,
                                },
                              }}
                              iconRight={{
                                name: 'moon-waxing-crescent',
                                color: 'yellow',
                                style: {
                                    height: 22,
                                    width: 22,
                                },
                              }}
                        />
                    ) : null}
                </View>
                {/* Display title */}
                <View style={styles.heading}>
                    {title == 'people' || title == 'event' || title == 'people-set' || title == 'event-set' || title == 'mes' ? (
                        <View style={styles.headingLines}>
                            {title == 'mes'? (
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.headingTextBig}>Links</Text>
                            ):(
                            title == 'people-set' ? (
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.headingTextBigBig}>Your</Text>
                            ):(
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.headingText}>Discover</Text>
                            ))}
                            {title == 'people' ? (
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.headingTextBig}>People</Text>
                            ):(
                            title == 'mes' ? (
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.headingTextBigBig}>Made</Text>
                            ):(title == 'people-set' ? (
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.headingText}>Profile</Text>
                            ):(
                                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.headingTextBigBig}>Events</Text>
                            )))}
                        </View>
                    ) : null}
                </View>
                <View style={styles.headerLogo}>
                {(title != "people-set" || appVersion <= 1) && title != 'event-set'? ( 
                    <TouchableOpacity  onPress={() =>{openMenu(), Haptics.selectionAsync(); }} style={[styles.menuBarPage]}>
                        {/* Shows the current section's icon, from the same list the nav panel uses */}
                        {navIconFor(title) ? (
                            <MaterialIcon name={navIconFor(title)} size={windowWidth/6-25} color={ACTION_ICON} />
                        ) : null}
                    </TouchableOpacity> ) : null}
                </View>

          </View>
        ) : null}

    {/* Display elements */}
    {title == "people"? (
        !location && !errorMsg ?(
            <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                <ActivityIndicator size="large" />
            </View>
        ) : (
            errorMsg ? (
                <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex:-99}}>
                    <MaterialIcon name="location-off" size={100} color={lightGreen} />
                    <Text style={{width: '80%', marginBottom: 20, marginTop: 20}}>{errorMsg}.</Text> 
                    <Text style={{width: '80%', marginBottom: 20}}>In order to use this feature, you must allow access to location</Text>
                    <NeuButton onPress={() => {Linking.openURL("app-settings:");}} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}>
                        <Text>
                            Open settings
                        </Text>
                    </NeuButton>
                </View>
            ) :(
                <Feed ref={feedRef} open={(profile)=> openViewedCard(profile)} BACKGROUND={BACKGROUND} />
            )
        )
    ) : title == "userCard" ? (
        <UserCard
            BACKGROUND={BACKGROUND}
            profileImage={viewedProfile && viewedProfile.profileImage}
            interests={interestsForDisplay(viewedProfile && viewedProfile.interests)}
            firstName={viewedProfile && viewedProfile.firstName}
            lastName={viewedProfile && viewedProfile.lastName}
            age={viewedProfile && viewedProfile.bday}
            city={viewedProfile && viewedProfile.city}
            currentCity={viewedProfile && viewedProfile.city}
            theme={viewedProfile && viewedProfile.theme}
        />
    ) : title == "people-set" ? (
        <Profile open={()=> {open("userCard-set"); }} BACKGROUND={BACKGROUND}  profileImage={profileImage} interests={interests} firstName={firstName} lastName={lastName} age={age} city={city} email={email} gender={gender} phone={phone} currentCity={currentCity}/>
    ) : title == "userCard-set" ? (
        <UserCard BACKGROUND={BACKGROUND} settings={true} id={ID} description={description} profileImage={profileImage} interests={interests} firstName={firstName} lastName={lastName} age={age} city={city} email={email} gender={gender} phone={phone} currentCity={currentCity} editProfile={(edit) => editProfile(edit)}/>
    ) : title == "mes" ? (
        <Messages BACKGROUND={BACKGROUND} openMessage={(user, userToName, userTo, photoUri)=> openMessage(user, userToName, userTo, photoUri)}/>
    ) : title == "set" ? (
        <Setteings BACKGROUND={BACKGROUND} openEditProfile={() => openEditProfile()} />
    )  : null}

    {/* Footer */}
    {title == "userCard" ? (
        <View style={styles.navCard}>
            <View style={styles.navContainerCard} left={10}> 
                <View style={styles.navContentCard}>
                    <TouchableOpacity style={styles.navCircles} >
                            <MaterialIcon name="youtube-searched-for" size={35} color="purple" /> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => open("people")} style={styles.navCircles}>
                            <MaterialIcon name="report" size={35} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.navContainerCard} right={10}>
                <View style={styles.navContentCard}>
                    <TouchableOpacity style={styles.navCircles} >
                            <MaterialCommunityIcon name="hand-right" size={35} color={lightGreen} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => open("people")} style={styles.navCircles} >
                            <MaterialIcon name="vibration" size={35} color={"rgb(55,133,223)"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    ) : title == "userCard-set" ?(
        <View style={styles.navCard}>
            <View style={[styles.navContainerCard, {height: 70}]} right={10}>
                <View style={styles.navContentCard}>
                    <TouchableOpacity onPress={() => {open("people-set");}} style={styles.navCircles} >
                            <MaterialIcon name="vibration" size={35} color={"rgb(55,133,223)"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    ): title == "people" ?(
        <View style={styles.nav}>
            <TouchableOpacity
                onPress={() => {Haptics.selectionAsync(); feedRef.current && feedRef.current.swipeLeft()}}
                style={[styles.actionButton, styles.actionPass, styles.actionShadow]}
            >
                <MaterialIcon name="close" size={windowWidth*0.19*0.46} color={ACTION_ICON} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => openViewedCard()}
                style={[styles.actionButton, styles.actionInfo, styles.actionShadow]}
            >
                <MaterialCommunityIcon name="information-variant" size={windowWidth*0.18*0.5} color={ACTION_ICON} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {Haptics.selectionAsync(); feedRef.current && feedRef.current.swipeRight()}}
                style={[styles.actionButton, styles.actionLike, styles.actionShadow]}
            >
                <MaterialIcon name="check" size={windowWidth*0.21*0.46} color={ACTION_ICON} />
            </TouchableOpacity>
        </View>
    ) : null}
            </Animated.View>

            {/* Tap anywhere outside the panel to dismiss it */}
            {isMenuOpen ? (
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={styles.scrim} />
                </TouchableWithoutFeedback>
            ) : null}

            {/* Drop-down navigation: a soft-cornered column that falls in from the top right */}
            <Animated.View
                style={[styles.navPanel, {opacity: menuAnim, transform: [{translateY: panelDrop}]}]}
                pointerEvents={isMenuOpen ? 'auto' : 'none'}
            >
                {NAV_ITEMS.map(item => (
                    <TouchableOpacity
                        key={item.key}
                        style={styles.navPanelItem}
                        onPress={() => {Haptics.selectionAsync(); item.key === 'map' ? map() : open(item.key)}}
                    >
                        <MaterialIcon
                            name={item.icon}
                            size={windowWidth*0.075}
                            color={ACTION_ICON}
                        />
                    </TouchableOpacity>
                ))}
            </Animated.View>
            </Animatable.View>
      </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
      },
    content: {
        height: '100%',
        width: '100%',
      },
    scrim: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
      },
    // Soft-cornered column that drops in from the top right.
    navPanel: {
        position: 'absolute',
        top: '6%',
        right: 14,
        width: windowWidth * 0.19,
        backgroundColor: '#FFFFFF',
        borderRadius: 26,
        alignItems: 'center',
        paddingVertical: 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      },
    navPanelItem: {
        width: windowWidth * 0.19,
        height: windowWidth * 0.155,
        alignItems: 'center',
        justifyContent: 'center',
      },
    header: {
        width: '100%', height: '10%',
        alignItems: 'center',
        flexDirection: 'row',
        
    },
    // switch + heading + headerLogo must total 100%: RN won't shrink fixed widths.
    switch:{
        left:'4%',
        width: '23%',
        alignItems: 'center',
        top:-5,
    },
    heading:{
        width: '54%', height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    // Inner wrapper stacks the two title words. It must NOT reuse `heading` —
    // nesting that style halved the available width and broke words mid-word.
    headingLines:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingText: {
        fontSize: 18, 
        textTransform: 'uppercase',
        color: 'lightgray',
        fontWeight: '700',
    },
    headingTextBig:{
        fontSize:23, 
        textTransform: 'uppercase',
        color: 'lightgray',
        fontWeight: '700',
    },
    headingTextBigBig:{
        fontSize:24, 
        textTransform: 'uppercase',
        color: 'lightgray',
        fontWeight: '700',
    },
    // No right offset: the button sits near the screen edge, as in the prototype.
    headerLogo:{
        width: '23%',
        alignItems: 'center',
    },
    menuLogo: {
        height: 45,
        width: 45,
        resizeMode: 'contain',

    },
    // Soft-cornered square, matching the nav panel's corner treatment.
    menuBarPage: {
        width: windowWidth/6,
        height: windowWidth/6,
        borderRadius: windowWidth/6 * 0.26,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        top:-5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.14,
        shadowRadius: 8,
        elevation: 5,
    },
    // Discover People actions: three floating circles, no container bar.
    nav:{
        width: '100%',
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      actionButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 11,
      },
      actionShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.14,
        shadowRadius: 8,
        elevation: 5,
      },
      // The like button is the primary action, so it reads slightly larger.
      actionPass: { width: windowWidth*0.19, height: windowWidth*0.19 },
      actionInfo: { width: windowWidth*0.18, height: windowWidth*0.18 },
      actionLike: { width: windowWidth*0.21, height: windowWidth*0.21 },
      navCircles: {
        backgroundColor: "rgb(25,25,25)",
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.55,
        shadowRadius: 10,
        elevation: 1,

        height: 60, width: 60,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      navContainerCard:{
        position: 'absolute',
        bottom: 20,
        height: 150,
        width: 70,
        backgroundColor: "rgb(46,46,46)",
        borderRadius: 100, 
        position: 'absolute',
      },

      navContentCard: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 5, paddingBottom: 5,
      },
   
  });
