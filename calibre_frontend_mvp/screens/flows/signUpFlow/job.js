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
    const ref = React.useRef();

    const [jobState, setJobState] = useState(false);
    const [jobPlaceState, setJobPlaceState] = useState(false);
    const [jobStatus, setJobStatus] = useState('');
    const [job, setJob] = useState('');
    const [jobID, setJobID] = useState('');
    const [jobPlace, setJobPlace] = useState('');
    const [buttonState, setButtonState] = React.useState(true);
    
    const handlePress = () => {
        Keyboard.dismiss();
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
        console.log("Job status: " + jobStatus)
        if(jobStatus != "employed"){
          setJob(null)
          setJobID(null)
          setJobPlace(null)
        }
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
          jobStatus: jobStatus,
          job: job,
          jobID: jobID,
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
          <Text style={HeroContainer.text}>Do you have a <Text style={HeroContainer.greenText}>job</Text>?</Text>
        </Animatable.View>

        <View style={[NeumorphismInput.container, {height: '34%', top: '15%'}]}>
          <NeuView color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS} >
            <DropDownPicker
                
                placeholder={"Are you employed?"}
                showArrow={false}
                items={[
                    {label: 'Yes', value: 'employed'},
                    {label: 'No', value: 'unemployed'},
                ]}
                containerStyle={{height: 50,width: windowWidth-80}}
                style={DropDown.dropDownButton}
                itemStyle={[DropDown.items, {paddingVertical: 15}]}
                dropDownStyle={DropDown.dropDownStyle}
                onChangeItem={item =>{
                    console.log(item)
                    if(item.value == "employed"){
                        setJobState(true)
                        setButtonState(true);
                        if(job != ""){
                          setJobPlaceState(true)
                        }
                    }else{
                        setJobState(false)
                        setButtonState(false)
                    }
                    setJobStatus(item.value)
                }}
                onOpen={() => {Keyboard.dismiss(); setJobState(false); setJobPlaceState(false)}}
            />
          </NeuView>


          <View style={ [(jobState ? "" : {display: 'none'} ), {width: windowWidth-80} ]}>
            <NeuView inset color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS} >
              <JobInput
                requiredCharactersBeforeSearch={0}
                requiredTimeBeforeSearch={200}
                onSelect={job => {
                    console.log("Job: " + job.Job)
                    console.log("JobID: " + job.ID)
                    setJob(job.Job)
                    setJobID(job.ID)
                    setJobPlaceState(true);
                    
                }}
                onSubmitEditing={() => {if(jobPlaceState == true){ref.current.focus()}else{alert('Please select a job')}}}
                onFocus={() => {setJobPlaceState(false); setButtonState(true);}}
              />
            </NeuView>
          </View>
          
          <View style={ (jobPlaceState ? "" : {display: 'none'} )}>
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
                  color={COLOR}
                  placeholderTextColor={PLACEHOLDER}
                  autoCorrect={false}
                  value={jobPlace}
                  placeholder={"Where do you work?"}
                  returnKeyType={'next'}
                  onSubmitEditing={()=> handlePress()}
                  enablesReturnKeyAutomatically={true}
                  ref={ref}
                />
              </View>
            </NeuView> 
          </View>

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

