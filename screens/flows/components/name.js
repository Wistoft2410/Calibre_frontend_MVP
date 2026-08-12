import React, { useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, View, Text, TextInput, StatusBar, Button, TouchableOpacity,TouchableWithoutFeedback, Keyboard, Image, LinearGradient} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // https://oblador.github.io/react-native-vector-icons/
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {darkGreen, lightGreen, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown, LogoContainer} from "../../../components/Style";

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
        first = "",
        last = "",
        ...rest
    } = props;
    const ref = React.useRef();

    const [firstName, setFirstName] = React.useState(first);
    const [lastName, setLastName] = React.useState(last);
    const [buttonState, setButtonState] = React.useState(true);
    const [shouldShow, setShouldShow] = React.useState(false);

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
        <View style={{position: 'absolute', width: '100%', height: '100%'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
            </TouchableWithoutFeedback>
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
          onSubmitEditing={() => {ref.current.focus()}}
          autoFocus={false}
          blurOnSubmit={false}
        />
        
            <NeuView color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS} inset >
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
                onSubmitEditing={()=> handlePress(firstName, lastName)}
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
              onPress={() => handlePress(firstName, lastName)} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}
            >
              <Text style={Neumorphism.buttonText}>
                NEXT
              </Text>
            </NeuButton>  
          </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
 
    
   
  });

  Name.propTypes = {
    BACKGROUND: PropTypes.string,
    first: PropTypes.string,
    last: PropTypes.string,
    handlePress: PropTypes.func,
    ...Name.propTypes
  };
  export default Name;