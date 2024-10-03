import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
// import GoconInput from '../../../components/GoconInput';

import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, Neumorphism, Container, ActionContainer, HeroContainer, ProgressBar, Gender} from "../../../components/Style";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {
    
    const [buttonState, setButtonState] = React.useState(true);
    const [moreState, setMoreState] = React.useState(false);

   const handlePress = () => {
      moreState ? setMoreState(false) : setMoreState(true)
   }


    const handleGenderPress = (genderType) => {
          console.log("\nBday: "+route.params.bday)
          console.log("Gender: " + genderType)
          navigation.navigate('Name', {
            bday: route.params.bday,
            gender: genderType
          });
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
        width: '9%',
      },
      to:{
        width: '18%',
      }
    };
    
    return(
      <Container>
        <NeuView style={ProgressBar.progressBar} color={BACKGROUND} borderRadius={RADIUS} width={windowWidth-80} height={15}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </NeuView>

        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>gender</Text>?</Text>
        </Animatable.View>

        <View style={Gender.container}>
              
                <TouchableOpacity 
                    style={[Gender.maleGender, Gender.gender]}
                    onPress={() => handleGenderPress('male')}
                >
                    <Text style={Gender.genderText}>
                        Male
                    </Text>
                </TouchableOpacity>
 
                <TouchableOpacity 
                    style={[Gender.maleGender, Gender.gender, (moreState ? "" : {display:'none'})]}
                    onPress={() => handleGenderPress('trans-male')}
                >
                    <Text style={Gender.genderText}>
                      Trans-male
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[Gender.femaleGender, Gender.gender]}
                    onPress={() => handleGenderPress('female')}
                >
                    <Text style={Gender.genderText}>
                        Female
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[Gender.femaleGender, Gender.gender, (moreState ? "" : {display:'none'})]}
                    onPress={() => handleGenderPress('trans-female')}
                >
                    <Text style={Gender.genderText}>
                      Trans-female
                    </Text>
                </TouchableOpacity> 
                  
            </View>

        <View style={[ActionContainer.actionContainerSignUp, ActionContainer.actionContainerSignUpAvoiding]}>
            <NeuButton onPress={() => handlePress()} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}>
                  <Text style={Neumorphism.buttonText}>
                      Show {moreState ? "les" : "more"}
                  </Text>
            </NeuButton>         
        </View>
      </Container>

      // <View style={signUp.container}>
      //   <View style={signUp.contentsContainer}>
      //       <View style={signUp.heroContainer}>
      //           <Animatable.Text style={signUp.hero} animation={fadeIn} iterationDelay={250}>
      //            YOUR <Text style={signUp.lightGreen}>GENDER</Text>
      //           </Animatable.Text>
      //       </View>
            // <View style={signUp.inputContainer}>
            //     <TouchableOpacity 
            //         style={signUp.maleGender}
            //         onPress={() => handleGenderPress('male')}
            //     >
            //         <Text style={signUp.genderText}>
            //             MALE
            //         </Text>
            //     </TouchableOpacity> 
            //     <TouchableOpacity 
            //         style={[signUp.maleGender, (moreState ? "" : {display:'none'})]}
            //         onPress={() => handleGenderPress('trans-male')}
            //     >
            //         <Text style={signUp.genderText}>
            //           TRANS-MALE
            //         </Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity 
            //         style={signUp.femaleGender}
            //         onPress={() => handleGenderPress('female')}
            //     >
            //         <Text style={signUp.genderText}>
            //             FEMALE
            //         </Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity 
            //         style={[signUp.femaleGender, (moreState ? "" : {display:'none'})]}
            //         onPress={() => handleGenderPress('trans-female')}
            //     >
            //         <Text style={signUp.genderText}>
            //           TRANS-FEMALE
            //         </Text>
            //     </TouchableOpacity> 
                  
            // </View>
      //   </View>
      //   <KeyboardAvoidingView 
      //     style={signUp.actionContainer}
      //     behavior={ Platform.OS === 'ios'? 'padding': null}
      //   >
      //       <TouchableOpacity 
      //           style={[signUp.action]}
      //           onPress={() => handlePress()}
      //       >
      //           <Text style={signUp.actionText}>
      //                {moreState ? "LES" : "MORE"} GENDERS
      //           </Text>
      //       </TouchableOpacity> 
      //   </KeyboardAvoidingView>
      // </View>
    );
  }

