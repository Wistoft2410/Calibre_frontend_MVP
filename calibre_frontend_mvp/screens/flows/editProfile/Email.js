import React, { useEffect, useState, useRef, Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import GoconInput from '../../../components/GoconInput';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Email from '../components/email'
import {updateData} from './update'


export default  ({ route, navigation })  =>  {
   
    
        
    
    const handlePress = (email) => {
        Keyboard.dismiss();
        if(email != ""){
            console.log(email)
            updateData("email",email, route.params.user);
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
                  email: email,
                  firstName: route.params.firstName,
                  gender: route.params.gender,
                  lastName: route.params.lastName,
                  phone: route.params.phone,
              })
            }
        }else{
          console.log("Missing email")
          alert('Please enter E-mail')
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
          <Text style={HeroContainer.text}>Edit your <Text style={HeroContainer.greenText}>Email</Text></Text>
        </Animatable.View>
      
        <Email BACKGROUND={route.params.BACKGROUND} handlePress={(email) => {handlePress(email)}}  currentEmail={route.params.email}/>
        
       
        
      </Container>

    );
  }

