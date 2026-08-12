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

const Email = props => {
  const {
        BACKGROUND,
        handlePress,
        currentEmail = "",
        ...rest
    } = props;

    const [email, setEmail] = React.useState(currentEmail);
    const [buttonState, setButtonState] = React.useState(true);
    const [emailTestText, setEmailTestText] = React.useState(true); // Hide validEmailText
    
    const serverName = require('../../../appSettings/db.json');

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
                  handlePress(email);
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
    const validatePress = () => {
        validateEmail(email) ? checkEmail() : alert('Please enter valid mail')
        
    }
    const buttonStateStyle = buttonState ? signUp.lowOpacity : "";
    return(
        <View style={{position: 'absolute', width: '100%', height: '100%'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
            </TouchableWithoutFeedback>
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
                    onSubmitEditing={()=> validatePress(email)}
                    />
                
                
        
            </View>

            <View style={ActionContainer.actionContainerSignUp}>
            <View style={ActionContainer.actionContainerSignUpAvoiding}>
                <NeuButton
                disabled={buttonState}
                style={buttonStateStyle} 
                onPress={() => validatePress(email)} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}
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

  Email.propTypes = {
    BACKGROUND: PropTypes.string,
    currentEmail: PropTypes.string,
    handlePress: PropTypes.func,
    ...Email.propTypes
  };
  export default Email;