import React, { useEffect, useState, useRef, Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import GoconInput from '../../../components/GoconInput';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Name from '../components/name'

export default  ({ route, navigation })  =>  {
   

    
    
    
    const handlePress = (firstName, lastName) => {
        Keyboard.dismiss();
        if(firstName != "" && lastName != ""){
          console.log("\nBday: "+route.params.bday)
          console.log("Email: "+route.params.email)
          console.log("Name: "+ firstName + " "+ lastName)
          navigation.navigate('City', {
            bday: route.params.bday,
            email: route.params.email,
            firstname: firstName,
            lastname: lastName,
          });
        }else{
          console.log("Missing firstname or lastname")
          alert('Please enter firstname and lastname')
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
        width: '32%',
      },
      to:{
        width: '47%',
      }
    };

    
 

    return(
      <Container>
        

        <View style={ProgressBar.progressBar}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </View>

        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>name</Text>?</Text>
        </Animatable.View>
      
        <Name BACKGROUND={BACKGROUND} handlePress={(firstName, lastName) => {handlePress(firstName, lastName)}}/>
        
       
        
      </Container>

    );
  }

