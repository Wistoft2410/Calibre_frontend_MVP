import React, { useEffect, useState, useRef, Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import GoconInput from '../../../components/GoconInput';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, Gender} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


import {updateData} from './update'

import { signUp } from "../newSignUpFlow/style";

export default  ({ route, navigation })  =>  {
   
    const [buttonState, setButtonState] = React.useState(true);
    const [moreState, setMoreState] = React.useState(false);

   const handleMoreState = () => {
      moreState ? setMoreState(false) : setMoreState(true)
   }
        
    
    const handlePress = (gender) => {
        Keyboard.dismiss();
        if(gender != ""){
            console.log(gender)
            updateData("gender",gender, route.params.user);
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
                  gender: gender,
                  lastName: route.params.lastName,
                  phone: route.params.phone,
              })
            }
        }else{
          console.log("Missing gender")
          alert('Please select gender')
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

  
      const buttonStateStyle = buttonState ? signUp.lowOpacity : "";
      
 

    return(
        <Container>
        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>gender</Text>?</Text>
        </Animatable.View>

        <View style={Gender.container}>
              
                <TouchableOpacity 
                    style={[Gender.maleGender, Gender.gender]}
                    onPress={() => handlePress('male')}
                >
                    <Text style={Gender.genderText}>
                        Male
                    </Text>
                </TouchableOpacity>
 
                <TouchableOpacity 
                    style={[Gender.maleGender, Gender.gender, (moreState ? "" : {display:'none'})]}
                    onPress={() => handlePress('trans-male')}
                >
                    <Text style={Gender.genderText}>
                      Trans-male
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[Gender.femaleGender, Gender.gender]}
                    onPress={() => handlePress('female')}
                >
                    <Text style={Gender.genderText}>
                        Female
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[Gender.femaleGender, Gender.gender, (moreState ? "" : {display:'none'})]}
                    onPress={() => handlePress('trans-female')}
                >
                    <Text style={Gender.genderText}>
                      Trans-female
                    </Text>
                </TouchableOpacity> 
                  
            </View>

        <View style={[ActionContainer.actionContainerSignUp, ActionContainer.actionContainerSignUpAvoiding]}>
            <NeuButton onPress={() => handleMoreState()} width={140} height={50} color={route.params.BACKGROUND} borderRadius={RADIUS}>
                  <Text style={Neumorphism.buttonText}>
                      Show {moreState ? "les" : "more"}
                  </Text>
            </NeuButton>         
        </View>
      </Container>
     

    );
  }

