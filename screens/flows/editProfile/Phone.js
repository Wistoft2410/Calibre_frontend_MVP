import React, { useEffect, useState, useRef, Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import GoconInput from '../../../components/GoconInput';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


import {updateData} from './update'

import { signUp } from "../newSignUpFlow/style";

export default  ({ route, navigation })  =>  {
   
    const [number, setNumber] = React.useState('');
    const [buttonState, setButtonState] = React.useState(true);
    
        
    
    const handlePress = (phone) => {
        Keyboard.dismiss();
        if(phone != ""){
            console.log(phone)
            updateData("phone",phone, route.params.user);
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
                  phone: phone,
              })
            }
        }else{
          console.log("Missing phone")
          alert('Please enter phone number')
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
      <Container style={{backgroundColor: route.params.BACKGROUND}}>
    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
        </TouchableWithoutFeedback>

        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>Edit your <Text style={HeroContainer.greenText}>Phone Number</Text></Text>
        </Animatable.View>

        
       
       <View style={NeumorphismInput.container}>

          
           <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', paddingLeft: 20, justifyContent: 'center'}}>
               <Text style={{fontSize: 18, marginRight: 10, color: COLOR}}>+ {route.params.dialCode}</Text>
               <View style={{marginLeft: 10}}>
                   <NeuInput color={route.params.BACKGROUND} width={105} height={50} borderRadius={RADIUS} 
                       onChangeText={(value) => {
                           setNumber(value)
                           if (value.length < 8) {
                               setButtonState(true)
                           }else{
                               setButtonState(false)
                           }
                           }
                       }
                       value={number}
                       autoFocus={true}
                       placeholder="12345678"
                       keyboardType="phone-pad"
                       maxLength={8}
                       />
               </View>
           </View>
             
    
       </View>

       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={ActionContainer.actionContainerSignUp}>
         <View style={ActionContainer.actionContainerSignUpAvoiding}>
           <NeuButton
             disabled={buttonState}
             style={buttonStateStyle} 
             onPress={() => handlePress(number)} width={140} height={50} color={route.params.BACKGROUND} borderRadius={RADIUS}
           >
             <Text style={Neumorphism.buttonText}>
               NEXT
             </Text>
           </NeuButton>  
         </View>
       </KeyboardAvoidingView>
       
     </Container>
     

    );
  }

