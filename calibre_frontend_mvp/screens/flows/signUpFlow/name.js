import React, { useEffect, useState, useRef, Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// import GoconInput from '../../../components/GoconInput';
import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default  ({ route, navigation })  =>  {
    const ref = React.useRef();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [buttonState, setButtonState] = React.useState(true);
    
    
    const handlePress = () => {
        Keyboard.dismiss();
        if(firstName != "" && lastName != ""){
          console.log("\nBday: "+route.params.bday)
          console.log("Gender: "+ route.params.gender)
          console.log("Name: "+ firstName + " "+ lastName)
          navigation.navigate('City', {
            bday: route.params.bday,
            gender: route.params.gender,
            firstname: firstName,
            lastname: lastName,
          });
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
        width: '18%',
      },
      to:{
        width: '27%',
      }
    };

    const illegalNames = [];
    illegalNames.push("fuck");
    illegalNames.push("shit");
    illegalNames.push("hitler");

    const checkName = (name) => {
    let small_name = name.toLowerCase(); // makes the name lower case, so we dont have to check each word with all types of lower and upper case.
    let legal = true;
      illegalNames.map((value, index) =>{
        if(small_name.indexOf(value) > -1){
          legal = false;
        } 
      })
      return legal;
    }
    const buttonStateStyle = buttonState ? signUp.lowOpacity : "";

    return(
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
        </TouchableWithoutFeedback>

        <NeuView style={ProgressBar.progressBar} color={BACKGROUND} borderRadius={RADIUS} width={windowWidth-80} height={15}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </NeuView>

        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>name</Text>?</Text>
        </Animatable.View>
      
        <View style={NeumorphismInput.container}>
       
          <NeuInput color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS} 
            onChangeText={
              (value) => {
                if (value === "") {
                  setFirstName(value);
                  setButtonState(true);
                } else {
                  let isLegal = checkName(value); 
                  
                  if(isLegal == false){
                    alert("This name is not allowed!")
                    console.log(isLegal)
                  }else{
                    setFirstName(value)
                  }
                }
                if(value != "" && lastName != ""){
                  setButtonState(false)
                }else{setButtonState(true)}
              }
            }
            value={firstName}
            placeholder='My firstname is'
            returnKeyType={'next'}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={() => ref.current.focus()}
            autoFocus={false}
            blurOnSubmit={false}
          />
 
          <NeuView color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS} inset>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 12,
                height: '100%',
              }}
            >
              <TextInput 
                style={{
                  borderBottomWidth: 0,
                  width: '100%',
                  height: '100%',
                  paddingVertical:0,
                  letterSpacing: 1,
                }}
                onChangeText={
                  (value) => {
                    if (value === "") {
                      setLastName(value);
                      setButtonState(true);
                    } else {
                      let isLegal = checkName(value); 
                      
                      if(isLegal == false){
                        alert("This name is not allowed!")
                        console.log(isLegal)
                      }else{
                        setLastName(value)
                      }
                    }
                    if(value != "" && firstName != ""){
                      setButtonState(false)
                    }else{setButtonState(true)}
                  }
                }
                color={COLOR}
                placeholderTextColor={PLACEHOLDER}
                value={lastName}
                placeholder='My lastname is'
                returnKeyType={'next'}
                onSubmitEditing={()=> handlePress()}
                enablesReturnKeyAutomatically={true}
                ref={ref}
              />
            </View>
          </NeuView>
        
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
      //             SET <Text style={signUp.lightGreen}>NAME</Text>
      //           </Animatable.Text>
      //       </View>
        
      //       <View style={signUp.inputContainer}>
      //         <TextInput
      //             style={signUp.Input}
      //             onChangeText={(value) => {
      //               if (value === "") {
      //                   setName(value);
      //                   setButtonState(true);
      //                 } else {
      //                   let isLegal = checkName(value); 
      //                   console.log(isLegal)
      //                   if(isLegal == false){
      //                     alert("This name is not allowed!")
      //                     setButtonState(true);
      //                   }else{
      //                     setName(value)
      //                     setButtonState(false);
      //                   }
      //                 }
      //               }
      //             }
      //             autoCorrect={false}
      //             value={name}
      //             autoFocus={true}
      //             placeholder="John Doe"
      //         />          
      //       </View>
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
      //             CONTINUE
      //           </Text>
      //       </TouchableOpacity> 
      //   </KeyboardAvoidingView>
      // </View>
    );
  }

