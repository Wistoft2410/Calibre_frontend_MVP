import React, { useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, View, Text, TextInput, StatusBar, Button, TouchableOpacity,TouchableWithoutFeedback, Keyboard, Image, LinearGradient, KeyboardAvoidingView} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // https://oblador.github.io/react-native-vector-icons/
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, PasswordInfo} from "../../../components/Style";
import { signUp } from "../newSignUpFlow/style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth-windowWidth/8;
const neuHeight = windowHeight-windowHeight/2.3;

const Name = props => {
  const {
        BACKGROUND,
        handlePress,
        password1 = "",
        password2 = "",
        ...rest
    } = props;


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
   
    const buttonStateStyle = buttonState ? signUp.lowOpacity : "";
    return(
        <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
        </TouchableWithoutFeedback>

        <View style={[NeumorphismInput.container, {height: '40%', top: '16%'}]}>
          <View style={[PasswordInfo.passwordInfoHeroContainer, {alignItems: 'center', justifyContent: 'center'}]}>
            <View style={[PasswordInfo.passwordInfoBall, {backgroundColor: passColorState}]}></View> 
            <Text style={PasswordInfo.passwordInfoHero}>PASSWORD STRENGTH: {"\n"+passStrengthState}</Text>
          </View>

         
            
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
                  onSubmitEditing={()=> handlePress(buttonState, password, confirmPassword)}
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
              onPress={() => handlePress(buttonState, password, confirmPassword)} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}
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
                {hiddenState ?  <FontAwesome5Icon name="eye" size={20} color={COLOR} /> : <FontAwesome5Icon name="eye-slash" size={20} color={COLOR} />}
            </NeuButton>
          </View>  
        </KeyboardAvoidingView>
      </View>
    );
}

const styles = StyleSheet.create({
 
    
   
  });

  Name.propTypes = {
    BACKGROUND: PropTypes.string,
    password1: PropTypes.string,
    password2: PropTypes.string,
    handlePress: PropTypes.func,
    ...Name.propTypes
  };
  export default Name;