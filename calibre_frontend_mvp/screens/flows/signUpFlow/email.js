import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import GoconInput from '../../../components/GoconInput';

import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {
    const [email, setEmail] = React.useState('');
    const [buttonState, setButtonState] = React.useState(true);
    const [emailTestText, setEmailTestText] = React.useState(true); // Hide validEmailText
    
    const nextPage = () => {
      console.log("\nBday: "+route.params.bday)
      console.log("Gender: "+ route.params.gender)
      console.log("Name: "+ route.params.firstname + " " + route.params.lastname)
      console.log("Language: "+ route.params.language)
      console.log("Country: "+ route.params.country)
      console.log("City: "+ route.params.city)
      console.log("City lat: "+ route.params.cityLat)
      console.log("City lng: "+ route.params.cityLng)
      console.log("Phone: " + route.params.phone)
      console.log("Email: "+email)

      navigation.navigate('Password', {
        bday: route.params.bday,
        gender: route.params.gender,
        firstname: route.params.firstname,
        lastname: route.params.lastname,
        language: route.params.language,
        country: route.params.country,
        city: route.params.city,
        cityLat: route.params.cityLat,
        cityLng: route.params.cityLng,
        phone: route.params.phone,
        email: email
      });
    }

    const serverName = require('./appSettings/db.json');

    const checkEmail = async () => {
      
      fetch(serverName.app.db + 'register.php', { // Sends data to server to check if email is used
          method: 'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          body:JSON.stringify({
              "checkEmail": "true", // send chechEmail: true, to tell register.php to check for email and not to create new user
              "email": email
          })
      })
      .then((response) => response.json())
          .then((responseJson) =>{
              if(responseJson == "MNU"){ // MNU: Mail not used
                nextPage();
              }else{
                  alert(responseJson);
              }
          })
          .catch((error)=>{
              console.error(error);
          });
      
  }
  // check if email is vaild
  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }
    const handlePress = () => {
      validateEmail(email) ? checkEmail() : alert('Please enter valid mail')
        
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
        width: '45%',
      },
      to:{
        width: '54%',
      }
    };

    const buttonStateStyle = buttonState ? signUp.lowOpacity : "";
    const emailTestTextStyle = emailTestText ? signUp.hidden : "";
    return(
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
        </TouchableWithoutFeedback>
        
        <NeuView style={ProgressBar.progressBar} color={BACKGROUND} borderRadius={RADIUS} width={windowWidth-80} height={15}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </NeuView>

        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>e-mail</Text>?</Text>
        </Animatable.View>
        <View style={NeumorphismInput.container}>
            
            
            <NeuInput color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS} 
                 onChangeText={(value) => {
                    if (value === "") {
                        setEmail(value);
                        setButtonState(true);
                      } else {
                        setEmail(value)
                        const emailTest = validateEmail(value);
                        if(emailTest == true){
                          setButtonState(false);
                          setEmailTestText(true); // hide validEmailText
                        }else{
                          setButtonState(true);
                          setEmailTestText(false); // show validEmailText
                        }
                      }
                    }
                  }
                  value={email}
                  autoFocus={true}
                  placeholder="john@doe.com"
                  keyboardType="email-address"
                  autoCapitalize='none'
                  returnKeyType={'next'}
                  enablesReturnKeyAutomatically={true}
                  onSubmitEditing={()=> handlePress()}
                  />
              
              
     
        </View>

        <View style={ActionContainer.actionContainerSignUp}>
          <View style={ActionContainer.actionContainerSignUpAvoiding}>
            <NeuButton
              disabled={buttonState}
              style={buttonStateStyle} 
              onPress={() => handlePress()} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}
            >
              <Text style={Neumorphism.buttonText}>
                NEXT
              </Text>
            </NeuButton>  
          </View>
        </View>
        
      </Container>
      // <View style={signUp.container}>
      //   <View style={signUp.contentsContainer}>
      //       <View style={signUp.heroContainer}>
      //           <Animatable.Text style={signUp.hero} animation={fadeIn} iterationDelay={250}>
      //             SET <Text style={signUp.lightGreen}>EMAIL</Text>
      //           </Animatable.Text>
      //       </View>
      //       <View style={signUp.inputContainer}>
      //         <TextInput
      //             style={signUp.Input}
      //             onChangeText={(value) => {
      //               if (value === "") {
      //                   setEmail(value);
      //                   setButtonState(true);
      //                 } else {
      //                   setEmail(value)
      //                   const emailTest = validateEmail(value);
      //                   if(emailTest == true){
      //                     setButtonState(false);
      //                     setEmailTestText(true); // hide validEmailText
      //                   }else{
      //                     setButtonState(true);
      //                     setEmailTestText(false); // show validEmailText
      //                   }
      //                 }
      //               }
      //             }
      //             value={email}
      //             autoFocus={true}
      //             placeholder="john@doe.com"
      //             keyboardType="email-address"
      //             autoCapitalize='none'
      //         />            
      //       </View>
      //       <Text style={[signUp.validEmailText, emailTestTextStyle]}>
      //              Please enter valid email
      //       </Text>
      //   </View>
      //   <KeyboardAvoidingView 
      //     style={signUp.actionContainer}
      //     behavior={ Platform.OS === 'ios'? 'padding': null}
      //   >
           
      //       <TouchableOpacity 
      //           disabled={buttonState}
      //           style={[signUp.action, buttonStateStyle]}
      //           onPress={() => handlePress()}
      //       >
      //           <Text style={signUp.actionText}>
      //               CONTINUE
      //           </Text>
      //       </TouchableOpacity> 
      //   </KeyboardAvoidingView>
      // </View>
    );
  }

