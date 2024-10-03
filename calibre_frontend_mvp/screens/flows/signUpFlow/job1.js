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
        
    const handlePress = (jobStatus) => {
        
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
        console.log("Job status: " + jobStatus)

        if(jobStatus != "employed"){
            let job = null;
            let jobID = null;
            let jobPlace = null;
        
            console.log("Job: "+ job)
            console.log("Job ID: "+ jobID)
            console.log("employer: " + jobPlace)

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
                jobStatus: jobStatus,
                job: job,
                jobID: jobID,
                employer: jobPlace
            });
        }else{
            navigation.navigate('Job2', {
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
                jobStatus: jobStatus,
            });
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
          width: '72%',
        },
        to:{
          width: '81%',
        }
      };

    
    return(
    <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
        </TouchableWithoutFeedback>
        
        <NeuView style={ProgressBar.progressBar} color={BACKGROUND} borderRadius={RADIUS} width={windowWidth-80} height={15}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </NeuView>
        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>Do you have a <Text style={HeroContainer.greenText}>job</Text>?</Text>
        </Animatable.View>

        <View style={[NeumorphismInput.container, { top: '30%'}]}>
            <NeuButton onPress={() => handlePress("employed")} width={windowWidth-80} height={50} color={BACKGROUND} borderRadius={RADIUS}>
                <Text>Yes</Text>
            </NeuButton>
            <NeuButton onPress={() => handlePress("unemployed")} width={windowWidth-80} height={50} color={BACKGROUND} borderRadius={RADIUS}>
                <Text>No</Text>
            </NeuButton>
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

  