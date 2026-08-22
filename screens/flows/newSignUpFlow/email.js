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
      console.log("Email: "+email)

      navigation.navigate('Name', {
        bday: route.params.bday,
        email: email
      });
    }
  // check if email is vaild
  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }
    const handlePress = () => {
      // Availability is checked at the final signUp() step instead — Supabase's
      // client API doesn't expose a safe "does this email exist" lookup (it's
      // deliberately withheld to prevent user enumeration).
      validateEmail(email) ? nextPage() : alert('Please enter valid mail')

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
        width: '16%',
      },
      to:{
        width: '32%',
      }
    };

    const buttonStateStyle = buttonState ? signUp.lowOpacity : "";
    const emailTestTextStyle = emailTestText ? signUp.hidden : "";
    return(
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
        </TouchableWithoutFeedback>
        
        <View style={ProgressBar.progressBar}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </View>

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

