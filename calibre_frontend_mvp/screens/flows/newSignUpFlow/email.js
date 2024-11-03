import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// Importing custom components and styles
import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import { BACKGROUND, RADIUS, COLOR, Neumorphism, NeumorphismInput, Container, ActionContainer, HeroContainer, ProgressBar } from "../../../components/Style";
import { Dimensions } from 'react-native';

// Getting screen dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {
  // State variables to store email, button status, and email validation status
  const [email, setEmail] = React.useState('');
  const [buttonState, setButtonState] = React.useState(true);
  const [emailTestText, setEmailTestText] = React.useState(true); // Hide validEmailText by default

  // Loading server settings from a configuration file
  const serverName = require('../../../appSettings/db.json');

  // Function to navigate to the next page with email and birthday data
  const nextPage = () => {
    console.log("\nBday: " + route.params.bday)
    console.log("Email: " + email)

    navigation.navigate('Name', {
      bday: route.params.bday,
      email: email
    });
  }

  // Function to check if the entered email is already used by sending a request to the server
  const checkEmail = async () => {
    fetch(serverName.app.db + 'register.php', { // Sends data to server to check if email is used
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "checkEmail": "true", // send chechEmail: true, to tell register.php to check for email and not to create new user
        "email": email
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == "MNU") { // MNU: Mail not used, proceed to next page
          nextPage();
        } else {
          alert(responseJson); // Show error message if email is used
        }
      })
      .catch((error) => {
        console.error(error); // Log errors in case of network issues
      });

  }

  // Function to validate email format using a regular expression
  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
  }
  // Handle button press by validating email format and checking email in the database
  const handlePress = () => {
    validateEmail(email) ? checkEmail() : alert('Please enter valid mail')

  }
  
  // Animation styles for fade-in effect and progress bar
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
    to: {
      width: '32%',
    }
  };
  
  // Styles for button and email text based on state
  const buttonStateStyle = buttonState ? signUp.lowOpacity : "";
  const emailTestTextStyle = emailTestText ? signUp.hidden : "";
  return (
    <Container>
      {/* TouchableWithoutFeedback dismisses keyboard when tapped outside of input */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ height: '100%', width: '100%', zIndex: -99 }}></View>
      </TouchableWithoutFeedback>
      
      {/* Progress bar animation */}
      <View style={ProgressBar.progressBar}>
        <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
      </View>
      
      {/* Hero text animation */}
      <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>
        <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>e-mail</Text>?</Text>
      </Animatable.View>

      {/* Input field with neumorphism effect */}
      <View style={NeumorphismInput.container}>
        <NeuInput color={BACKGROUND} width={windowWidth - 80} height={50} borderRadius={RADIUS}
          onChangeText={(value) => {
            if (value === "") {
              setEmail(value);
              setButtonState(true);
            } else {
              setEmail(value)
              const emailTest = validateEmail(value);
              if (emailTest == true) {
                setButtonState(false);
                setEmailTestText(true); // hide validEmailText
              } else {
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
          onSubmitEditing={() => handlePress()}
        />



      </View>
      
      {/* Action button container */}
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

