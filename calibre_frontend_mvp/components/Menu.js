import React, { useEffect, useState }from 'react';
import {ActivityIndicator, Linking, StyleSheet, View, Text, StatusBar, Button, TouchableOpacity, Image, TouchableWithoutFeedback, MaskedView, Switch} from 'react-native';
import {AuthContext} from '../utils/authContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // https://oblador.github.io/react-native-vector-icons/
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
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

export default ({ navigation, route }) => {

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


   

    // get server
    const serverName = require('../appSettings/db.json');
    // set acces_key
    const access_key = "TEST123";
    
    // get information about user
    const fetchData = (user) => {
      fetch(serverName.app.db + 'getUserInfo.php', { 
          method: 'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          body:JSON.stringify({
            "access_token": access_key,
             "user": user,
             "type": "email",

          })
      })
      .then((response) => response.json())
          .then((responseJson) =>{
            console.log("Response from web:")
                if(responseJson != userData){

                        setID(responseJson.ID)
                        setFirstName(responseJson.firstName)
                        setLastName(responseJson.lastName)
                        setAge(responseJson.age)
                        setCity(responseJson.city)
                        setEmail(responseJson.email)
                        setGender(responseJson.gender)
                        setPhone(responseJson.phone)
                        setCountryID(responseJson.countryID)
                        setProfileImage(responseJson.profileImage)
                        setDescription(responseJson.description)
                    getInt(responseJson.ID);
                }else{
                    console.log("t")
                }
          })
          .catch((error)=>{
              console.error(error);
          });
      }


      // get userID from async storage
      const retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('@user_Token');
        //   const val = await AsyncStorage.getItem('@user');
          if (value !== null && userData !== null) {

            // setUserData(val)

            return value;
           
          }
        } catch (error) {
          // Error retrieving data
        }
      };
  

    // async function to make sure that the data is retrieved
    const getData = async(oldData) => {
      const user = await retrieveData()
      await fetchData(user);
    }

    const fetchInt = (user) => {
    //   console.log("userID: "+ user)
      fetch(serverName.app.db + 'getUserInterests.php', { 
          method: 'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          body:JSON.stringify({
            "access_token": access_key,
             "user" : user,
          })
      })
      .then((response) => response.json())
          .then((responseJson) =>{
                // console.log("Interests array:")
                // console.log(responseJson);
                setInterests(responseJson)
          })
          .catch((error)=>{
              console.error(error);
          });
      }
    const getInt = async(id) => {
      await fetchInt(id);
      
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
        getData();
        getLocation(); // get location on load
        GetCurrentLocation() // get city onload
        const shortInterval = setInterval(() => {
            getData(); // get data on interval if there is a change, then it will update the info
          }, 2000);
        const interval = setInterval(() => {
            getLocation(); // get new location on interval
            GetCurrentLocation();
          }, 10000);
        return () => {clearInterval(interval); clearInterval(shortInterval)} // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      

    },[0])


      
      
    const closeMenu = () => {
        setIsMenuOpen(false);
    }
    const openMenu = () => {
        setIsMenuOpen(true);
    }

    const toggleSwitch  = () => {
        title == "people" || title == "people-set" ? (
            isEnabled ? (open("people")) : (open("people-set"))
        ) : (
            isEnabled ? (open("event")) : (open("event-set"))
        )
        setEnabled(!isEnabled);
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

    const open = (value) => {
        setTitle(value)
        closeMenu()
    }


    return(


      <Container style={{backgroundColor: BACKGROUND}}>
         
        <Animatable.View style={styles.container} animation={fadeIn} duration={500} delay={500}> 

        {/* Menu */}
          {isMenuOpen ? (
            <View style={styles.openHeader}>
                {appVersion >= 2 ? (
                    <TouchableOpacity onPress={()=> {open("people")}} style={[styles.menuBarPage, styles.menuBarPageShadow]}>
                                <MaterialIcon name="group" size={windowWidth/6/2} color={darkGreen} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={()=> {open("people-set")}} style={[styles.menuBarPage, styles.menuBarPageShadow]}>
                        <MaterialIcon name="person" size={windowWidth/6/2} color={darkGreen} />
                    </TouchableOpacity>
                )}
                {appVersion >= 2 ? (
                    <TouchableOpacity onPress={()=> {open("event")}} style={[styles.menuBarPage, styles.menuBarPageShadow]}>
                        <FontAwesome5Icon name="globe-europe" size={windowWidth/6-25} color={darkGreen} />
                        {/* <LottieView 
                        source={changeSVGColor(require('../assets/globe.json'), darkGreen)}
                        autoPlay
                        speed={.2}
                        /> */}
                    </TouchableOpacity> 
                ) : appVersion >= 1 ? (
                    <TouchableOpacity onPress={()=> {map()}} style={[styles.menuBarPage, styles.menuBarPageShadow]}>
                        <MaterialIcon name="map" size={windowWidth/6/2} color={darkGreen} />
                    </TouchableOpacity>
                ) : (
                    null
                )}
               
                
                <TouchableOpacity onPress={()=> {open("mes")}} style={[styles.menuBarPage, styles.menuBarPageShadow]}>
                        <MaterialIcon name="message" size={windowWidth/6-25} color={darkGreen} />
                        {/* <LottieView 
                              source={changeSVGColor(require('../assets/consultation$.json'), darkGreen)}
                              autoPlay
                              speed={.2}
                            /> */}
                </TouchableOpacity>
            
                <TouchableOpacity onPress={()=> { open("set")}} style={[styles.menuBarPage, styles.menuBarPageShadow]}>
                        <MaterialIcon name="build" size={windowWidth/6-25} color={darkGreen} />
                        {/* <LottieView 
                            source={changeSVGColor(require('../assets/tool.json'), darkGreen)}
                            autoPlay
                            speed={.2}
                        /> */}
                </TouchableOpacity>

            </View>
        ): title != "userCard" && title != "userCard-set" ? (
<           View style={styles.header}>    
                {/* Display switch */}
                <View style={styles.switch}>
                    {(title == 'people' && appVersion >= 2) || title == 'event' || (title == 'people-set' && appVersion >= 2) || title == 'event-set' ? (
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
                        <View style={styles.heading}>
                            {title == 'mes'? (
                                <Text style={styles.headingTextBig}>Links</Text>
                            ):(
                            title == 'people-set' ? (
                                <Text style={styles.headingTextBigBig}>Your</Text>
                            ):(
                                <Text style={styles.headingText}>Discover</Text>
                            ))}
                            {title == 'people' ? (
                                <Text style={styles.headingTextBig}>People</Text>
                            ):(
                            title == 'mes' ? (
                                <Text style={styles.headingTextBigBig}>Made</Text>
                            ):(title == 'people-set' ? (
                                <Text style={styles.headingText}>Profile</Text>
                            ):(
                                <Text style={styles.headingTextBigBig}>Events</Text>
                            )))}
                        </View>
                    ) : null}
                </View>
                <View style={styles.headerLogo}>
                {(title != "people-set" || appVersion <= 1) && title != 'event-set'? ( 
                    <TouchableOpacity  onPress={() =>{openMenu(), Haptics.selectionAsync(); }} style={[styles.menuBarPage]}>
                        {title == "people-set" && appVersion <= 1 ? (
                            <MaterialIcon name="person" size={windowWidth/6-25} color={darkGreen} />
                        ) : null}
                        {title == "people" ? (
                            <MaterialIcon name="group" size={windowWidth/6-25} color={darkGreen} />
                        ) : null}
                        {title == "event" ? (
                            <FontAwesome5Icon name="globe-europe" size={windowWidth/6-25} color={darkGreen} />
                        ) : null}
                        {title == "mes" ? (
                            <MaterialIcon name="message" size={windowWidth/6-25} color={darkGreen} />
                        ) : null}
                        {title == "set" ? (
                            <MaterialIcon name="build" size={windowWidth/6-25} color={darkGreen} />
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
                <Feed open={()=> open("userCard")} BACKGROUND={BACKGROUND} />   
            )
        )
    ) : title == "userCard" ? (
        <UserCard BACKGROUND={BACKGROUND}/>
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
            <View height={windowHeight/12} width={neuWidth-45} backgroundColor={"rgb(45,45,45)"} borderRadius={100} > 
                <View style={styles.navContent}>
                    <TouchableOpacity style={styles.navCircles} >
                            <MaterialIcon name="block" size={40} color="red" /> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => open("userCard")} style={styles.navCircles}>
                            <MaterialIcon name="vibration" size={40} color="rgb(55,133,223)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navCircles} >
                            <MaterialCommunityIcon name="hand-right" size={40} color={lightGreen} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    ) : null}
            </Animatable.View>
      </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
      },
    header: {
        width: '100%', height: '10%',
        alignItems: 'center',
        flexDirection: 'row',
        
    },
    switch:{
        left:'8%',
        width: '25%',
        alignItems: 'center',
        top:-5,
    },
    heading:{
        width: '50%', height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

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
    headerLogo:{
        right: '12%',
        width: '25%',
        alignItems: 'center',
    },
    menuLogo: {
        height: 45,
        width: 45,
        resizeMode: 'contain',

    },
    openHeader:{
        width: '100%', height: '10%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    menuBarPage: {
        width: windowWidth/6,
        height: windowWidth/6,
        borderRadius: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        top:-5,

        
    },
    menuBarPageShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    nav:{
        width: '100%',
        height: 70,
        position: 'absolute',
        bottom: 35,
        alignItems: 'center',
        justifyContent: 'center',
      },
      navContent: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5, paddingRight: 5,
      },
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
