import React, { useEffect, useState, useRef, Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import GoconInput from '../../../components/GoconInput';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import City from '../components/city'
import {updateData} from './update'


export default  ({ route, navigation })  =>  {
   
    
        
    
    const handlePress = (city, countryID) => {
        Keyboard.dismiss();
        if(city != "" || countryID != ""){
            console.log("City: ", city, "countryID: ", countryID)
            updateData("city",city, route.params.user, "Null");
            updateData("countryID",countryID, route.params.user);
            if(route.params.edit == "userCard"){
              navigation.navigate("Menu", {
              })
            }else{
            navigation.navigate("editProfile", {
                BACKGROUND: route.params.BACKGROUND,
                user:route.params.user,
                age: route.params.age,
                city: city,
                countryID: countryID,
                dialCode: route.params.dialCode,
                email: route.params.email,
                firstName: route.params.firstName,
                gender: route.params.gender,
                lastName: route.params.lastName,
                phone: route.params.phone,
            })
          }
        }else{
          console.log("Missing city or countryID")
          alert('Please enter city or Country')
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
          <Text style={HeroContainer.text}>Edit your <Text style={HeroContainer.greenText}>city</Text></Text>
        </Animatable.View>
      
        <City BACKGROUND={route.params.BACKGROUND} handlePress={(city, country) => {handlePress(city, country)}} />
        
       
        
      </Container>

    );
  }

