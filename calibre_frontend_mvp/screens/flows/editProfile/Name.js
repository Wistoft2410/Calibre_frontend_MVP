import React, { useEffect, useState, useRef, Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import GoconInput from '../../../components/GoconInput';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Name from '../components/name'
import {updateData} from './update'


export default  ({ route, navigation })  =>  {
   
    
        
    
    const handlePress = (firstName, lastName) => {
        Keyboard.dismiss();
        if(firstName != "" && lastName != ""){
            console.log(firstName, lastName)
            updateData("firstName",firstName, route.params.user);
            updateData("lastName",lastName, route.params.user);
            if(route.params.edit == "userCard"){
                navigation.navigate("Menu", {
                })
            }else{
                navigation.navigate("editProfile", {
                    BACKGROUND: route.params.BACKGROUND,
                    user:route.params.user,
                    age: route.params.age,
                    city: route.params.city,
                    country: route.params.countryID,
                    dialCode: route.params.dialCode,
                    email: route.params.email,
                    firstName: firstName,
                    gender: route.params.gender,
                    lastName: lastName,
                    phone: route.params.phone,
                })
            }
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
      <Container style={{backgroundColor: route.params.BACKGROUND}}>
    

        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>Edit your <Text style={HeroContainer.greenText}>name</Text></Text>
        </Animatable.View>
      
        <Name BACKGROUND={route.params.BACKGROUND} handlePress={(firstName, lastName) => {handlePress(firstName, lastName)}} first={route.params.firstName} last={route.params.lastName}/>
        
       
        
      </Container>

    );
  }

