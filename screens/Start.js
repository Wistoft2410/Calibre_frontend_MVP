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

    const fetchDataApple = async (user, email, firstName, lastName, identityToken) => {
        const { error } = await signInApple(identityToken);
        if (error) return;

        // Apple only returns the full name on the very first authorization for
        // this app, so its presence is our signal this is a brand-new account —
        // route into the profile-completion flow. Returning users skip straight
        // to the signed-in app once the session lands (handled in App.js).
        if (firstName) {
            navigation.navigate('Age', {
                user: user,
                email: email,
                firstName: firstName,
                lastName: lastName,
            });
        }
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

                await fetchDataApple(credential.user, credential.email, credential.fullName?.givenName, credential.fullName?.familyName, credential.identityToken)

                  
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

