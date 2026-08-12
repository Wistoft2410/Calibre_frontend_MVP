import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard,  ScrollView, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
// import GoconInput from '../../../components/GoconInput';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, PasswordInfo} from "../../../components/Style";

import { Dimensions } from 'react-native';
import { set } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {
    const ref = React.useRef(); 

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [waitConfirm, setWaitConfirm] = React.useState(false);
    const [buttonState, setButtonState] = React.useState(true);
    const [smallState, setSmallState] = React.useState(false);
    const [bigState, setBigState] = React.useState(false);
    const [numberState, setNumberState] = React.useState(false);
    const [lengthState, setLengthState] = React.useState(false);
    const [specialState, setSpecialState] = React.useState(false);
    const [passColorState, setPassColorState] = React.useState("red");
    const [passStrengthState, setPassStrengthState] = React.useState("EXTREMELY WEAK");
    const [hiddenState, setHiddenState] = React.useState(true);


    const handleHiddenPress = () => {
      hiddenState ? setHiddenState(false) : setHiddenState(true)
    }
    const handlePress = () => {
      if(buttonState == false){

        if(password == confirmPassword){
          Keyboard.dismiss();
          console.log("\nBday: "+route.params.bday)
          console.log("Gender: "+ route.params.gender)
          console.log("Name: "+ route.params.firstname + " " + route.params.lastname)
          console.log("Language: "+ route.params.language)
          console.log("Country: "+ route.params.country)
          console.log("City: "+ route.params.city)
          console.log("City lat: "+ route.params.cityLat)
          console.log("City lng: "+ route.params.cityLng)
          console.log("Phone: " + route.params.phone)
          console.log("Email: "+ route.params.email)
          console.log("Pass: "+ password)

          navigation.navigate('Education1', {
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
            email: route.params.email,
            password: password,
          });
        }else{
          alert("Please enter two identical passwords")
        }
      }else{
        alert("Your password does not follow our guidelines")
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
        width: '54%',
      },
      to:{
        width: '63%',
      }
    };

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
          <Text style={HeroContainer.text}>Security is <Text style={HeroContainer.greenText}>important</Text>?</Text>
        </Animatable.View>

        <View style={[NeumorphismInput.container, {height: '40%', top: '16%'}]}>
          <NeuView color={BACKGROUND} width={windowWidth-80} height={100} borderRadius={RADIUS}>
            <ScrollView >
                  <View style={PasswordInfo.passwordInfoHeroContainer}>
                     <View style={[PasswordInfo.passwordInfoBall, {backgroundColor: passColorState}]}></View> 
                     <Text style={PasswordInfo.passwordInfoHero}>PASSWORD STRENGTH: {"\n"+passStrengthState}</Text>
                   </View>
                   <Text style={[PasswordInfo.passwordInfoP, smallState ? {display : 'none'} : ""]}>- Must contain at least one lowercase letter.</Text>
                   <Text style={[PasswordInfo.passwordInfoP, bigState ? {display : 'none'} : ""]}>- Must contain at least one uppercase letter.</Text>
                   <Text style={[PasswordInfo.passwordInfoP, numberState ? {display : 'none'} : ""]}>- Must contain at least one number.</Text>
                   <Text style={[PasswordInfo.passwordInfoP, lengthState ? {display : 'none'} : ""]}>- Must be at least 8 characters long.</Text>
                   <Text style={[PasswordInfo.passwordInfoP, specialState ? {display : 'none'} : ""]}>- Make your password even stronger by including of at least one speacial character, e.g., ! * # ? ] Note: do not use {"<"} or {">"} in your password, as both can cause problems in Webbrowsers </Text>
               </ScrollView>
          </NeuView>

         
            
            <NeuInput color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS} 
            
              onChangeText={(value) => {
                if (value === "") {
                    setPassword(value);
                    setButtonState(true);
                    setBigState(false);
                    setSmallState(false);
                    setNumberState(false);
                  } else {
                    if (value.indexOf('<') > -1)
                    {
                      alert("< can not be used");
                    }else if(value.indexOf('>') > -1){
                      alert("> can not be used");
                    }else{
                    let containNumber = /[0-9]/.test(value);
                    let containBigLetter = /[A-Z]/.test(value);
                    let containSmallLetter = /[a-z]/.test(value);
                    let containSpecialCharacter = /\W/.test(value);
                    let passwordLength = value.length;

                    
                    console.log("\nContain number: "+ containNumber)
                    console.log("Contain uppercase letter: "+ containBigLetter)
                    console.log("Contain lowercase letter: "+ containSmallLetter)
                    console.log("Contain special character: "+ containSpecialCharacter)
                    console.log("Password length: "+ passwordLength)

                    if(containBigLetter == true){
                      setBigState(true);
                    }else{
                      setBigState(false);
                    }
                    if(containSmallLetter == true){
                      setSmallState(true);
                    }else{
                      setSmallState(false);
                    }
                    if(containNumber == true){
                      setNumberState(true)
                    }else{
                      setNumberState(false);
                    }
                    if(passwordLength >= 8){
                      setLengthState(true)
                    }else{
                      setLengthState(false)
                    }
                    if(containSpecialCharacter == true){
                      setSpecialState(true)
                    }else{
                      setSpecialState(false)
                    }
                    if(passwordLength >= 8 && containBigLetter == true && containNumber == true && containSmallLetter == true && containSpecialCharacter == true){
                      setPassColorState("green")
                      setPassStrengthState("STRONG")
                    }else if(passwordLength >= 8 && containBigLetter == true && containNumber == true && containSmallLetter == true){
                      setPassColorState("lightgreen")
                      setPassStrengthState("PRETTY STRONG")
                    }else if((passwordLength >= 8 && (containBigLetter == true || containNumber == true || containSmallLetter == true)) || passwordLength >= 4 && ((containBigLetter == true && containNumber == true) || (containSmallLetter == true && containNumber == true) || (containSmallLetter == true && containBigLetter == true))){
                      setPassColorState("orange")
                      setPassStrengthState("WEAK")
                    }else{
                      setPassColorState("red")
                      setPassStrengthState("EXTREMELY WEAK")
                    }
                    if(passwordLength >= 8 && containBigLetter == true && containSmallLetter == true && containNumber == true && value == confirmPassword){ 
                      setButtonState(false);
                    }else if(passwordLength >= 8 && containBigLetter == true && containSmallLetter == true && containNumber == true){ 
                      setWaitConfirm(true)
                      setButtonState(true);
                    }else{
                      setWaitConfirm(false);
                      setButtonState(true)
                    }

                    setPassword(value)
                    }
                    
                  }
                }
              }
              value={password}
              placeholder='Set password' 
              autoFocus={true} 
              autoCapitalize='none' 
              secureTextEntry={hiddenState} 
              textContentType={'newPassword'}
              returnKeyType={'next'}
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={() => ref.current.focus()}
              autoFocus={false}
              blurOnSubmit={false}
              autoFocus={true}
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
                      setConfirmPassword(value)
                      if(waitConfirm == true && password == value){ 
                        setButtonState(false);
                      }else{
                        setButtonState(true)
                      }
                    }
                  }
                  color={COLOR}
                  placeholderTextColor={PLACEHOLDER}
                  value={confirmPassword}
                  placeholder='Confirm password' 
                  autoCapitalize='none' 
                  secureTextEntry={hiddenState} 
                  textContentType={'newPassword'}
                  returnKeyType={'next'}
                  onSubmitEditing={()=> handlePress()}
                  enablesReturnKeyAutomatically={true}
                  ref={ref}
                />
              </View>
          </NeuView>
        </View>


        <View  style={ActionContainer.actionContainerSignUp}>
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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{position: 'absolute', right: 20, bottom: '10%'}}>
          <View style={ActionContainer.actionContainerSignUpAvoiding}>
            <NeuButton width={50} height={50} color={BACKGROUND} borderRadius={RADIUS} onPressIn={() => handleHiddenPress()} onPressOut={() => handleHiddenPress()}>
                {hiddenState ?  <Icon name="eye" size={20} color={COLOR} /> : <Icon name="eye-slash" size={20} color={COLOR} />}
            </NeuButton>
          </View>  
        </KeyboardAvoidingView>
      </Container>
      // <View style={signUp.container}>
      //   <View style={signUp.contentsContainer}>
      //       <View style={signUp.heroContainer}>
      //           <Animatable.Text style={signUp.hero} animation={fadeIn} iterationDelay={250}>
      //             SET YOUR <Text style={signUp.lightGreen}>PASSWORD</Text> 
      //           </Animatable.Text>
      //       </View>
      //       <View style={signUp.passwordInfo}>
      //         <ScrollView >
      //           <View style={signUp.passwordInfoHeroContainer}>
      //             <View style={[signUp.passwordInfoBall, {backgroundColor: passColorState}]}></View> 
      //             <Text style={signUp.passwordInfoHero}>PASSWORD STRENGTH: {"\n"+passStrengthState}</Text>
      //           </View>
      //           <Text style={[signUp.passwordInfoP, smallState ? {display : 'none'} : ""]}>- Must contain at least one lowercase letter.</Text>
      //           <Text style={[signUp.passwordInfoP, bigState ? {display : 'none'} : ""]}>- Must contain at least one uppercase letter.</Text>
      //           <Text style={[signUp.passwordInfoP, numberState ? {display : 'none'} : ""]}>- Must contain at least one number.</Text>
      //           <Text style={[signUp.passwordInfoP, lengthState ? {display : 'none'} : ""]}>- Must be at least 8 characters long.</Text>
      //           <Text style={[signUp.passwordInfoP, specialState ? {display : 'none'} : ""]}>- Make your password even stronger by including of at least one speacial character, e.g., ! * # ? ] Note: do not use {"<"} or {">"} in your password, as both can cause problems in Webbrowsers </Text>
      //         </ScrollView>
      //       </View>
      //       <View style={signUp.inputContainer}>
      //         <TextInput
      //             style={signUp.Input}
      //             onChangeText={(value) => {
      //               if (value === "") {
      //                   setPassword(value);
      //                   setButtonState(true);
      //                   setBigState(false);
      //                   setSmallState(false);
      //                   setNumberState(false);
      //                 } else {
      //                   if (value.indexOf('<') > -1)
      //                   {
      //                     alert("< can not be used");
      //                   }else if(value.indexOf('>') > -1){
      //                     alert("> can not be used");
      //                   }else{
      //                   let containNumber = /[0-9]/.test(value);
      //                   let containBigLetter = /[A-Z]/.test(value);
      //                   let containSmallLetter = /[a-z]/.test(value);
      //                   let containSpecialCharacter = /\W/.test(value);
      //                   let passwordLength = value.length;

                        
      //                   console.log("\nContain number: "+ containNumber)
      //                   console.log("Contain uppercase letter: "+ containBigLetter)
      //                   console.log("Contain lowercase letter: "+ containSmallLetter)
      //                   console.log("Contain special character: "+ containSpecialCharacter)
      //                   console.log("Password length: "+ passwordLength)

      //                   if(containBigLetter == true){
      //                     setBigState(true);
      //                   }else{
      //                     setBigState(false);
      //                   }
      //                   if(containSmallLetter == true){
      //                     setSmallState(true);
      //                   }else{
      //                     setSmallState(false);
      //                   }
      //                   if(containNumber == true){
      //                     setNumberState(true)
      //                   }else{
      //                     setNumberState(false);
      //                   }
      //                   if(passwordLength >= 8){
      //                     setLengthState(true)
      //                   }else{
      //                     setLengthState(false)
      //                   }
      //                   if(passwordLength >= 8 && containBigLetter == true && containNumber == true && containSmallLetter == true && containSpecialCharacter == true){
      //                     setPassColorState("green")
      //                     setPassStrengthState("STRONG")
      //                   }else if(passwordLength >= 8 && containBigLetter == true && containNumber == true && containSmallLetter == true){
      //                     setPassColorState("lightgreen")
      //                     setPassStrengthState("PRETTY STRONG")
      //                   }else if((passwordLength >= 8 && (containBigLetter == true || containNumber == true || containSmallLetter == true)) || passwordLength >= 4 && ((containBigLetter == true && containNumber == true) || (containSmallLetter == true && containNumber == true) || (containSmallLetter == true && containBigLetter == true))){
      //                     setPassColorState("orange")
      //                     setPassStrengthState("WEAK")
      //                   }else{
      //                     setPassColorState("red")
      //                     setPassStrengthState("EXTREMELY WEAK")
      //                   }



      //                   if(passwordLength >= 8 && containBigLetter == true && containSmallLetter == true && containNumber == true){ 
      //                     setButtonState(false);
      //                   }

      //                   setPassword(value)
      //                   }
                        
      //                 }
      //               }
      //             }
      //             value={password}
      //             autoFocus={true}
      //             placeholder="ILoveCats321"
      //             secureTextEntry={true}
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
      //               CONTINUE
      //           </Text>
      //       </TouchableOpacity> 
      //   </KeyboardAvoidingView>
      // </View>
    );
  }
