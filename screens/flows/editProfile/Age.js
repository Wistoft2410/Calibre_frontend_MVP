import React, { useEffect, useState, useRef, Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Moment from 'moment';
// import GoconInput from '../../../components/GoconInput';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Age from '../components/age'
import {updateData} from './update'


export default  ({ route, navigation })  =>  {
   
    
        
    
    const handlePress = (dateYear, dateMonth, dateDay) => {
        let dato = dateYear+"-"+dateMonth+"-"+dateDay;
        let valid = Moment(new Date(dato)).format('YYYY-MM-DD'); // Check if dato is a valid date. If valid it will be equal to dato
        let todayYear = Moment(new Date()).format('YYYY');
        let todayMonth = Moment(new Date()).format('MM');
        let todayDay = Moment(new Date()).format('DD');
        let age;
        console.log(dato);
        console.log(valid);
        
        if(valid !== dato){
          alert("Please enter valid date")
        }else{
          if(dateMonth<=todayMonth){
            if(dateMonth==todayMonth){
              if(dateDay<=todayDay){
                age = todayYear-dateYear;
                console.log(age)
              }else{
                age = todayYear-dateYear-1;
                console.log(age)
              }
            }else{
              age = todayYear-dateYear;
              console.log(age)
            } 
          }else{
            age = todayYear-dateYear-1;
            console.log(age)
          }
          if(age>=13){
            console.log("\nBday: "+valid)

            updateData("age",dato, route.params.user);
            if(route.params.edit == "userCard"){
              navigation.navigate("Menu", {
              })
            }else{
              navigation.navigate("editProfile", {
                  BACKGROUND: route.params.BACKGROUND,
                  user:route.params.user,
                  age: dato,
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
            alert("You must be at least 13 years old")
          }
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
          <Text style={HeroContainer.text}>Edit your <Text style={HeroContainer.greenText}>birthday</Text></Text>
        </Animatable.View>
      
        <Age BACKGROUND={route.params.BACKGROUND} handlePress={(dateYear, dateMonth, dateDay) => {handlePress(dateYear, dateMonth, dateDay)}} />
        
       
        
      </Container>

    );
  }

