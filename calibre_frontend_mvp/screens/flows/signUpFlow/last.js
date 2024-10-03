import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import GoconInput from '../../../components/GoconInput';

import { signUp } from "./style";

export default ({ navigation, route }) => {
   
    const nextPage = () => {
      console.log("\nName: "+route.params.name)
      console.log("Bday: "+route.params.bday)
      console.log("Email: "+email)
      navigation.navigate('Password', {
        name: route.params.name,
        bday: route.params.bday,
        email: email
      });
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
      <View style={signUp.container}>
        <View style={signUp.contentsContainer}>
            <View style={signUp.heroContainer}>
                <Animatable.Text style={signUp.hero} animation={fadeIn} iterationDelay={250}>
                  YOU ARE NOW ONLY ONE STEP FROM JOINING THE <Text style={signUp.lightGreen}>STICK FAMILY</Text>
                </Animatable.Text>
            </View>
            
            
        </View>
        <KeyboardAvoidingView 
          style={signUp.actionContainer}
          behavior={ Platform.OS === 'ios'? 'padding': null}
        >
           
            <TouchableOpacity 
               
                style={[signUp.action]}
                onPress={() => handlePress()}
            >
                <Text style={signUp.actionText}>
                    JOIN STICK
                </Text>
            </TouchableOpacity> 
        </KeyboardAvoidingView>
      </View>
    );
  }

