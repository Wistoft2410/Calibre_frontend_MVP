import React, {useRef} from 'react';
import { Dimensions, Platform,Button, View, TextInput, StyleSheet, Image, Text, TouchableOpacity, PanResponder} from 'react-native';
import {AuthContext} from '../utils/authContext';
import * as Animatable from 'react-native-animatable';
import { NeuView, NeuInput, NeuButton } from '../components/neu-element';

import * as AppleAuthentication from 'expo-apple-authentication';

import {BACKGROUND, RADIUS, COLOR, Container, Neumorphism, ActionContainer, LogoContainer, NeumorphismInput, lightGreen} from "../components/Style";

import Tap from '../components/tap'

export default ({ navigation, route}) => {
    const { signInApple } = React.useContext(AuthContext);

    const handleSignupPress = () => { 
        
        navigation.navigate('Sign up');
          
    }

    const handleLoginPress = () => {
        navigation.navigate('Sign in');
    }

    const access_key = "TEST123";
    const serverName = require('../appSettings/db.json');

    const fetchDataApple = (user, email, firstName, lastName) => {
        console.log(user);
            fetch(serverName.app.db + 'appleSignIn.php', { 
                method: 'post',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                  "access_token": access_key,
                   "user": user,
                   "email":email,
                   "firstname": firstName,
                   "lastname": lastName,
                })
            })
            .then((response) => response.json())
                .then((responseJson) =>{
                  console.log(responseJson)
                  if(responseJson == "Access denied"){
                      alert("Access denied")
                  }else if(responseJson == "signUp"){
                    // signInApple({email: responseJson})
                    navigation.navigate('Age', {
                            user: user,
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                        });


                  }
                  else if(responseJson == "Failed"){
                        alert("User no longer exists! Go to settings and stop using Apple sign up for this app. Then try again.");
                  }else{
                    signInApple({email: responseJson})
                  }
                })
                .catch((error)=>{
                    console.error(error);
                });
            }

    function AppleSignIn() {
        return (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={{ width: 200, height: 50, marginTop: 20 }}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });
                // signed in
                console.log(credential)

                await fetchDataApple(credential.user, credential.email, credential.fullName.givenName, credential.fullName.familyName)

                  
              } catch (e) {
                if (e.code === 'ERR_CANCELED') {
                  // handle that the user canceled the sign-in flow
                } else {
                  // handle other errors
                  Alert("Something went wrong. Please try again. Error: "+e.code)
                }
              }
            }}
          />
        );
      }
    
   
    const moveUp = {
        from: {
            top: '30%',
        },
        to: {
            top: '20%',
        },
    };
    const calibreMoveUp = {
      from : {
          bottom: -500,
          color: "#FFFFFF"
      }, 
      to : {
          bottom: 0,
          color: lightGreen,
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
    
    return(

        <Container >
            <Tap/>
            <Animatable.View style={LogoContainer.logoContainerBig} animation={moveUp} duration={400}>
              <View style={LogoContainer.logoContainer}>
                <Image
                  style={LogoContainer.logoBig}
                  source={require('../assets/calibre.png')}
                />
              </View>
            <Animatable.Text animation={calibreMoveUp} duration={500} style={LogoContainer.tagline}>Calibre </Animatable.Text>
            <Animatable.Text style={[LogoContainer.tagline, LogoContainer.taglineI]} >Seize the Moments</Animatable.Text>
        </Animatable.View> 
            <Animatable.View style={ActionContainer.actionContainerStart} animation={fadeIn} duration={500} >
                    <NeuButton onPress={() => handleSignupPress()} width={200} height={50} color={BACKGROUND} borderRadius={RADIUS}>
                        <Text style={Neumorphism.buttonText}>Get Started</Text>
                    </NeuButton>
                    {AppleAuthentication.isAvailableAsync() ? (
                        <AppleSignIn/>
                    ):  null}
            </Animatable.View>
            <Animatable.View animation={fadeIn} duration={500} style={ActionContainer.secondaryActionContainer}>
                <View style={ActionContainer.divider}></View>
                  <TouchableOpacity style={ActionContainer.secondaryAction} onPress={() => handleLoginPress()}>   
                      <Text style={ActionContainer.secondaryActionText}>
                          LOG IN
                      </Text>
                  </TouchableOpacity> 
                <View style={ActionContainer.divider}></View>
            </Animatable.View>
        </Container>

    );
}

