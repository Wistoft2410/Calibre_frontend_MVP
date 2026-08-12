import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import GoconInput from '../../../components/GoconInput';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import JobInput from '../../../components/job-input';

import { signUp } from "./style";

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {
    
    const [jobPlace, setJobPlace] = useState('');
    const [buttonState, setButtonState] = React.useState(true);

    const handlePress = () => {
        
        console.log("\nBday: "+route.params.bday)
        console.log("Gender: "+ route.params.gender)
        console.log("Name: "+ route.params.firstname + " " + route.params.lastname)
        console.log("Language: "+ route.params.language)
        console.log("Country: "+ route.params.country)
        console.log("City: "+ route.params.city)
        console.log("City lat: "+ route.params.cityLat)
        console.log("City lng :"+ route.params.cityLng)
        console.log("Email: "+ route.params.email)
        console.log("Pass: "+ route.params.password)
        console.log("Under education: "+ route.params.underEducation)
        console.log("Education level: "+ route.params.educationLevel)
        console.log("School: "+ route.params.school)
        console.log("School ID: "+ route.params.schoolID)
        console.log("Job status: " + route.params.jobStatus)
        console.log("Job: "+ route.params.job)
        console.log("Job ID: "+ route.params.jobID)
        console.log("Employer: " + jobPlace)
        
    
        navigation.navigate('YourThing', {
            bday: route.params.bday,
            gender: route.params.gender,
            firstname: route.params.firstname,
            lastname: route.params.lastname,
            language: route.params.language,
            country: route.params.country,
            city: route.params.city,
            cityLat: route.params.cityLat,
            cityLng: route.params.cityLng,
            email: route.params.email,
            password: route.params.password,
            underEducation: route.params.underEducation,
            educationLevel: route.params.educationLevel,
            school: route.params.school,
            schoolID: route.params.schoolID,
            jobStatus: route.params.jobStatus,
            job: route.params.job,
            jobID: route.params.jobID,
            employer: jobPlace
        });
    }
    const illegalNames = [];
    illegalNames.push("fuck");
    illegalNames.push("shit");
    illegalNames.push("hitler");

    const checkJobPlace = (jobPlace) => {
    let small_name = jobPlace.toLowerCase(); // makes the name lower case, so we dont have to check each word with all types of lower and upper case.
    let legal = true;
      illegalNames.map((value, index) =>{
        if(small_name.indexOf(value) > -1){
          legal = false;
        } 
      })
      return legal;
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
          width: '72%',
        },
        to:{
          width: '81%',
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
          <Text style={HeroContainer.text}>Where do you <Text style={HeroContainer.greenText}>work</Text>?</Text>
        </Animatable.View>

        <View style={[NeumorphismInput.container]}>
           <NeuInput color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS}
                onChangeText={
                    (value) => {
                    if (value === "") {
                        setJobPlace(value);
                        setButtonState(true);
                    } else {
                        let isLegal = checkJobPlace(value); 
                        if(isLegal == false){
                        console.log(isLegal)
                        alert("This name is not allowed!")
                        setButtonState(true);
                        }else{
                        setJobPlace(value)
                        setButtonState(false);
                        }
                    }
                    }
                }
                placeholderTextColor={PLACEHOLDER}
                autoCorrect={false}
                value={jobPlace}
                placeholder={"Where do you work?"}
                returnKeyType={'next'}
                onSubmitEditing={()=> handlePress()}
                enablesReturnKeyAutomatically={true}
                autoFocus={true}
           />
        </View>

        <View style={ActionContainer.actionContainerSignUp}>
          <View style={ActionContainer.actionContainerSignUpAvoiding}>
            <NeuButton
              disabled={buttonState}
              style={buttonStateStyle} 
              onPress={() => handlePress()} width={140} height={50} color={'#EDECEC'} borderRadius={10}
            >
              <Text style={Neumorphism.neumorphismButtonText}>
                NEXT
              </Text>
            </NeuButton>  
          </View>
        </View>     
    </Container>
    // <View style={{marginTop: 300, marginLeft: '10%', width: '80%'}}>
        
    //    <DropDownPicker
    //             placeholder={"What is your job staus?"}
    //             items={[
    //                 {label: 'Self employed', value: 'employed',  icon: () => <Icon name="md-school" size={18} color="green" />},
    //                 {label: 'Looking for job (employed)', value: 'employed',  icon: () => <Icon name="md-school" size={18} color="green" />},
    //                 {label: 'Looking for job (unemployed)', value: 'unemployed',  icon: () => <Icon name="md-school" size={18} color="green" />},
    //                 {label: 'Not looking for job (employed)', value: 'employed',  icon: () => <Icon name="md-school" size={18} color="green" />},
    //                 {label: 'Not looking for job (unemployed)', value: 'unemployed',  icon: () => <Icon name="md-school" size={18} color="green" />},
    //                // evt Looking for job (self-employed)
    //             ]}
    //             containerStyle={{height: 40}}
    //             style={{backgroundColor: '#fafafa'}}
    //             itemStyle={{
    //                 justifyContent: 'flex-start'
    //             }}
    //             dropDownStyle={{backgroundColor: '#fafafa'}}
    //             onChangeItem={item =>{
    //                 console.log(item)
                    
    //                 if(item.value == "employed"){
    //                     setEducatedState(true)
    //                     setButtonState(true)
    //                 }else{
    //                     setEducatedState(false)
    //                     setButtonState(false)
    //                 }
                     
    //             }}
    //         />
            
    //         <View style={ (educatedState ? "" : {display: 'none'} )}>
             
    //             <TextInput
    //                 style={[signUp.Input,{marginTop: 20,}]}
    //                 onChangeText={(value) => {
    //                     if (value === "") {
    //                         setName(value);
    //                         setButtonState(true);
    //                     } else {
    //                         let isLegal = checkName(value); 
    //                         console.log(isLegal)
    //                         if(isLegal == false){
    //                         alert("This name is not allowed!")
    //                         setButtonState(true);
    //                         }else{
    //                         setName(value)
    //                         setButtonState(false);
    //                         }
    //                     }
    //                     }
    //                 }
    //                 autoCorrect={false}
    //                 value={name}
                    
    //                 placeholder={"Where are you employed?"}
    //             />    
               
    //         </View>
    //         <KeyboardAvoidingView 
    //       style={{position:'absolute',width:'100%', marginTop:300,}}
    //       behavior={ Platform.OS === 'ios'? 'padding': null}
    //     >
    //         <TouchableOpacity 
    //             disabled={buttonState}
    //             style={[signUp.action, buttonStateStyle]}
    //             onPress={() => handlePress()}
    //         >
    //             <Text style={signUp.actionText}>
    //               CONTINUE
    //             </Text>
    //         </TouchableOpacity> 
    //     </KeyboardAvoidingView>
    //   </View>
    );
  }

  