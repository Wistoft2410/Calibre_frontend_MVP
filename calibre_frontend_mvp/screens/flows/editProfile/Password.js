import React, { useEffect, useState, useRef, Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import GoconInput from '../../../components/GoconInput';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Password from '../components/password'
import {updateData} from './update'


export default  ({ route, navigation })  =>  {
   
    
        
    
    const handlePress = (buttonState, password, password2) => {
        Keyboard.dismiss();
        if(buttonState == false){

        if(password == password2){
            console.log(password, password2)
            updateData("password",password, route.params.user);
            if(route.params.edit == "userCard"){
              navigation.navigate("Menu", {
              })
            }else{
              navigation.navigate("editProfile", {
                  BACKGROUND: route.params.BACKGROUND,
                  user:route.params.user,
                  age: route.params.age,
                  city: route.params.city,
                  countryID: route.params.countryID,
                  dialCode: route.params.dialCode,
                  email: route.params.email,
                  firstName: route.params.firstName,
                  gender: route.params.gender,
                  lastName: route.params.lastName,
                  phone: route.params.phone,
              })
            }
        }else{
            alert("Please enter two identical passwords")
          }
        }else{
          alert("Your password does not follow our guidelines. Must contain at least one number, character and a capitalized character")
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
      <Container style={{backgroundColor: route.params.BACKGROUND}}>
    

        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>Update your <Text style={HeroContainer.greenText}>Password</Text></Text>
        </Animatable.View>
      
        <Password BACKGROUND={route.params.BACKGROUND} handlePress={(buttonState, password, password2) => {handlePress(buttonState, password, password2)}}/>
        
       
        
      </Container>

    );
  }

