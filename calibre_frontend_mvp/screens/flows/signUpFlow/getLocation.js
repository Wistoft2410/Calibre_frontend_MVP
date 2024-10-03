import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
// import GoconInput from '../../../components/GoconInput';
import * as Location from 'expo-location'; // get location info
import * as Permissions from 'expo-permissions';
import * as Linking from 'expo-linking';

import { signUp } from "./style";
import Morph from "../../../components/Morph";
import { Neumorphism, Container, ActionContainer, HeroContainer, ProgressBar} from "../../../components/Style";

export default ({ navigation, route }) => {
    
const [buttonState, setButtonState] = React.useState(true);
    
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [permission, setPermission] = useState(false);


    useEffect(() => {
      (async () => {
        const { status } = await Permissions.getAsync(Permissions.LOCATION);
        if(status == 'granted'){
            setPermission(true)
            setButtonState(false)
        }
      })();
    }, []);

    const getpermission = async () => {
        const { status } = await Permissions.getAsync(Permissions.LOCATION);
        let newStatus = status;
        if (status !== 'granted') {
            const {status}  =  await Permissions.askAsync(Permissions.LOCATION); 
            newStatus = status;
        }
        if (newStatus !== 'granted') {
            setButtonState(true)
            setPermission(false)
            Alert.alert(
                "Location",
                "Sorry, we need your permissions to make this work! Please go to settings and change your permission",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "Go to settings", onPress: () => goToSettings() }
                ],
                { cancelable: false }
              );
        }else{
            setButtonState(false)
            setPermission(true)
            return newStatus;
        }
        }
  
        
// let location = await Location.getCurrentPositionAsync({});
        // setLocation(location);
//     let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }
    
    const goToSettings = () => {
        Linking.openURL('app-settings:expo Go')
    }

    const handlePress = async() => {
        const { status } = await Permissions.getAsync(Permissions.LOCATION);
        if(status !== 'granted'){ // make sure user have not turned off location
            setPermission(false)
            setButtonState(true)
            alert("You have denied permission to your locatin! We need your loction to make the app work.")
        }else{
            console.log("\nBday: "+route.params.bday)
            console.log("Gender: "+ route.params.gender)
            console.log("Name: "+ route.params.name)
            console.log("Language: "+ route.params.language)
            console.log("Country: "+ route.params.country)
            console.log("City: "+ route.params.city)
            console.log("City lat: "+ route.params.cityLat)
            console.log("City lng :"+ route.params.cityLng)
            console.log("Email: "+ route.params.email)
            console.log("Pass: "+ route.params.password)
            console.log("Things: "+ route.params.things)

            navigation.navigate('Photo', {
                bday: route.params.bday,
                gender: route.params.gender,
                name: route.params.name,
                language: route.params.language,
                country: route.params.country,
                city: route.params.city,
                cityLat: route.params.cityLat,
                cityLng: route.params.cityLng,
                email: route.params.email,
                password: route.params.password,
                things: route.params.things,
              });
        }
    }

    const fadeIn = {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      };
    const progress = {
        from: {
          width: '81%',
        },
        to:{
          width: '90%',
        }
      };

   const buttonStateStyle = buttonState ? signUp.lowOpacity : "";

    return(
    <Container>
        <View style={ProgressBar.progressBar}>
            <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>   
        </View>
        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>Why we need your <Text style={HeroContainer.greenText}>location</Text></Text>
        </Animatable.View>


        <View style={[ActionContainer.actionContainerSignUp, ActionContainer.actionContainerSignUpAvoiding]}>
          <Morph borderless radius={10} >
            <TouchableOpacity onPress={() =>  handlePress() }>
                  <Text style={Neumorphism.neumorphismButtonText}>
                      Done
                  </Text>
              </TouchableOpacity> 
            </Morph>
        </View>
    </Container>
    //   <View style={signUp.container}>
    //       <View style={{zIndex:-1,width: '100%', height:'100%',position:'absolute', justifyContent:'center', alignItems:'center'}}>
    //           <Text style={{marginBottom: 20}}>We use your location to match you...</Text>
              
    //               {
    //                 permission ? <Text>You have accepted</Text> :
    //                 <TouchableOpacity style={signUp.action} onPress={() => getpermission()}><Text style={signUp.actionText} >Please click here to accept</Text></TouchableOpacity> 
    //             }
              
    //         </View>
    //     <View style={signUp.actionContainer}>
    //         <TouchableOpacity
    //             disabled={buttonState}
    //             style={[signUp.action, buttonStateStyle]}
    //             onPress={() => handlePress()}
    //         >
    //             <Text style={signUp.actionText}>
    //                 CONTINUE 
    //             </Text>
    //         </TouchableOpacity> 
    //     </View>
    //   </View>
    );
  }

  