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

    

    const [number, setNumber] = React.useState('');
    const [countryCode, setCountryCode] = React.useState(''); 
    const [buttonState, setButtonState] = React.useState(true);
    
    const getCountryCode = () => {
        if(route.params.language == 'dk'){
            setCountryCode('45')
        }
    }
  
    useEffect(() => {
        getCountryCode()
      }, []);    
            
    const nextPage = () => {

            console.log("\nBday: "+route.params.bday)
            console.log("Gender: "+ route.params.gender)
            console.log("Name: "+ route.params.firstname + " " + route.params.lastname)
            console.log("Language: "+ route.params.language)
            console.log("Country: "+ route.params.country)
            console.log("City: "+ route.params.city)
            console.log("City lat: "+ route.params.cityLat)
            console.log("City lng: "+ route.params.cityLng)
            console.log("Phone: " + number )

            navigation.navigate('Email', {
                bday: route.params.bday,
                gender: route.params.gender,
                firstname: route.params.firstname,
                lastname: route.params.lastname,
                language: route.params.language,
                country: route.params.country,
                city: route.params.city,
                cityLat: route.params.cityLat,
                cityLng: route.params.cityLng,
                phone: number
            });
        
    }
    const checkPhone = async () => {
      
    //   fetch('https://myso1ve.dk/bonjour/register.php', { // Sends data to server to check if email is used
    //       method: 'post',
    //       header:{
    //           'Accept': 'application/json',
    //           'Content-type': 'application/json'
    //       },
    //       body:JSON.stringify({
    //           "checkEmail": "true", // send chechEmail: true, to tell register.php to check for email and not to create new user
    //           "email": email
    //       })
    //   })
    //   .then((response) => response.json())
    //       .then((responseJson) =>{
    //           if(responseJson == "MNU"){ // MNU: Mail not used
    //             nextPage();
    //           }else{
    //               alert(responseJson);
    //           }
    //       })
    //       .catch((error)=>{
    //           console.error(error);
    //       });
      
  }
  // check if email is vaild

    const handlePress = () => {
        checkPhone();
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
        width: '36%',
      },
      to:{
        width: '45%',
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
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>phone number</Text>?</Text>
        </Animatable.View>
        <View style={NeumorphismInput.container}>

           
            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', paddingLeft: 20, justifyContent: 'center'}}>
                <Text style={{fontSize: 18, marginRight: 10, color: COLOR}}>+ {countryCode}</Text>
                <View style={{marginLeft: 10}}>
                    <NeuInput color={BACKGROUND} width={105} height={50} borderRadius={RADIUS} 
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
              onPress={() => nextPage()} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}
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

