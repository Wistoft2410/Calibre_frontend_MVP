import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
// import GoconInput from '../../../components/GoconInput';
import DropDownPicker from '../../../components/dropdown-picker';
import { signUp } from "./style";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // https://oblador.github.io/react-native-vector-icons/
import Moment from 'moment';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, Neumorphism, Container, ActionContainer, HeroContainer, ProgressBar, DropDown, Swipe as SwipeBackHint} from "../../../components/Style";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {
    const [date, setDate] = React.useState('');
    const [buttonState, setButtonState] = React.useState(true);
    const [dateDay, setDateDay] = React.useState('');
    const [dateMonth, setDateMonth] = React.useState('');
    const [dateYear, setDateYear] = React.useState('');
    const [showText, setShowText] = React.useState(true);


    
      
      const handlePress = () => {
        let dato = dateYear+"-"+dateMonth+"-"+dateDay;
        let valid = Moment(new Date(dato)).format('YYYY-MM-DD'); // Check if dato is a valid date. If valid it will be equal to dato
        let todayYear = Moment(new Date()).format('YYYY');
        let todayMonth = Moment(new Date()).format('MM');
        let todayDay = Moment(new Date()).format('DD');
        let age;
        console.log(dato);
        console.log(valid);
        
        if(valid !== dato){
          alert("Please enter valid date")
        }else{
          if(dateMonth<=todayMonth){
            if(dateMonth==todayMonth){
              if(dateDay<=todayDay){
                age = todayYear-dateYear;
                console.log(age)
              }else{
                age = todayYear-dateYear-1;
                console.log(age)
              }
            }else{
              age = todayYear-dateYear;
              console.log(age)
            } 
          }else{
            age = todayYear-dateYear-1;
            console.log(age)
          }
          if(age>=13){
            console.log("\nBday: "+valid)

            navigation.navigate('Email', {
                bday: valid,
            });
          }else{
            alert("You must be at least 13 years old")
          }
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
        width: '0%',
      },
      to:{
        width: '16%',
      }
    };
    const buttonStateStyle = buttonState ? styles.lowOpacity : "";

    const days = [];

    for(let i = 1; i <= 31; i++){
      let day = i;
      let dayVal = day;
      if(day < 10){
        dayVal = "0"+day;
      }
      days.push(
        {label: ""+day+"", value: ""+dayVal+""}
      )
    }
    const months = [];
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    for(let i = 1; i <= 12; i++){
      let month = i;
      let monthVal = month;
      if(month < 10){
        monthVal = "0"+month;
      }
      months.push(
        {label: ""+monthName[month-1]+"", value: ""+monthVal+""}
      )
    }
    const years = [];

   
    const maxYear = Moment(new Date()).format('YYYY'); // The latest year where it is posible to be at least 13


    for(let i = maxYear; i >= 1900; i--){
      let year = i;
      years.push(
        {label: ""+year+"", value: ""+year+""}
      )
    }

    return(
      <Container>
        <View style={ProgressBar.progressBar}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </View>

        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>birthday</Text>?</Text>
        </Animatable.View>



        
          <View style={DropDown.container}>
              <NeuView width={80} height={40} color={BACKGROUND} borderRadius={RADIUS}>
                <DropDownPicker
                    placeholder={"Day"}
                    showArrow={false}
                    items={days}
                    containerStyle={{height: 40,width: 80}}
                    style={DropDown.dropDownButton}
                    itemStyle={DropDown.items}
                    dropDownStyle={DropDown.dropDownStyle}
                    onChangeItem={item =>{
                        console.log(item)
                        setDateDay(item.value)
                        
                    }}
                    onOpen={() => {setShowText(false); setDateDay(null)}}
                    onClose={() => setShowText(true)}
                />
              </NeuView>
              <View style={DropDown.margin}>
                <NeuView width={95} height={40} color={BACKGROUND} borderRadius={RADIUS} >
                  <DropDownPicker
                      placeholder={"Month"}
                      showArrow={false}
                      items={months}
                      containerStyle={{height: 40,width: 95}}
                      style={DropDown.dropDownButton}
                      itemStyle={DropDown.items}
                      dropDownStyle={DropDown.dropDownStyle}
                      onChangeItem={item =>{
                          console.log(item)
                          setDateMonth(item.value)
                      }}
                      onOpen={() => {setShowText(false); setDateMonth(null)}}
                      onClose={() => setShowText(true)}
                  />
                </NeuView>
              </View>
              <NeuView width={80} height={40} color={BACKGROUND} borderRadius={RADIUS}>
              <DropDownPicker
                  placeholder={"Year"}
                  showArrow={false}
                  items={years}
                  containerStyle={{height: 40,width: 80}}
                  style={DropDown.dropDownButton}
                  itemStyle={DropDown.items}
                  dropDownStyle={DropDown.dropDownStyle}
                  onChangeItem={item =>{
                      console.log(item)
                      setDateYear(item.value)
                  }}
                  onOpen={() => {setShowText(false), setDateYear(null)}}
                  onClose={() => setShowText(true)}
              />
              </NeuView>
          </View>

          
            

        <View style={[ActionContainer.actionContainerSignUp, ActionContainer.actionContainerSignUpAvoiding]}>
          <View style={SwipeBackHint.swipeBackHintContent}>
              <Text style={SwipeBackHint.swipeBackHintText}>
                  <Icon name="gesture-swipe-right" size={20} color={"#73EC70"} /> {showText ? "Swipe right to go back" : ""} 
              </Text>
          </View>
            <NeuButton onPress={() => handlePress()} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}>
              <Text style={Neumorphism.buttonText}>
                Next
              </Text> 
            </NeuButton>
        </View>
      </Container>


      // <View style={signUp.container}>
      //   <View style={signUp.contentsContainer}>
      //       <View style={signUp.heroContainer} >
      //           <Animatable.Text style={signUp.hero}  animation={fadeIn} iterationDelay={250}>
      //             SET YOUR <Text style={signUp.lightGreen}>AGE</Text>
      //           </Animatable.Text>
      //       </View>
            
        
            // <View style={signUp.inputContainer}>
            // <View style={{flexDirection: 'row'}}>
            //   <DropDownPicker
            //       placeholder={"Day"}
            //       items={days}
            //       containerStyle={{height: 40,width: 80}}
            //       style={{backgroundColor: '#fafafa'}}
            //       itemStyle={{
            //           justifyContent: 'flex-start'
            //       }}
            //       dropDownStyle={{backgroundColor: '#fafafa'}}
            //       onChangeItem={item =>{
            //           console.log(item)
            //           setDateDay(item.value)
            //       }}
            //   />
            //   <DropDownPicker
            //       placeholder={"Month"}
            //       items={months}
            //       containerStyle={{height: 40,width: 110}}
            //       style={{backgroundColor: '#fafafa'}}
            //       itemStyle={{
            //           justifyContent: 'flex-start'
            //       }}
            //       dropDownStyle={{backgroundColor: '#fafafa'}}
            //       onChangeItem={item =>{
            //           console.log(item)
            //           setDateMonth(item.value)
            //       }}
            //   />
            //   <DropDownPicker
            //       placeholder={"Year"}
            //       items={years}
            //       containerStyle={{height: 40,width: 90}}
            //       style={{backgroundColor: '#fafafa'}}
            //       itemStyle={{
            //           justifyContent: 'flex-start'
            //       }}
            //       dropDownStyle={{backgroundColor: '#fafafa'}}
            //       onChangeItem={item =>{
            //           console.log(item)
            //           setDateYear(item.value)
            //       }}
            //   />
            // </View>

                
                
            // </View>
            
      //   </View>
      //   <View style={styles.swipeContnet}>
      //       <Text style={styles.swipeText}>
      //           <Icon name="gesture-swipe-right" size={20} color="#000" /> Swipe right to go back
      //       </Text>
      //   </View>
      //   <View  style={signUp.actionContainer}>
      //         <TouchableOpacity 
      //             style={[signUp.action, buttonStateStyle, {marginTop:40}]}
      //             onPress={() => handlePress1()}
      //         >
      //             <Text style={signUp.actionText}>
      //               CONTINUE
      //             </Text>
      //         </TouchableOpacity> 
      //       </View>
      // </View>
    );
  }

const styles = StyleSheet.create({
  
  actionContainer: {
      marginTop: '40%',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 100,
      backgroundColor: '#fff',
      shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
      shadowOpacity: .1,
      shadowRadius: 5,
  },
  action: {
    paddingHorizontal: 25,
    paddingVertical: 2,
    color: 'darkgreen',
    fontSize: 20,
    fontWeight: "700",
  },
  inputContainer: {
    marginTop: '10%',
    width: '100%',
  },
  inputTitle: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%'
  },
  inputTitleText: {
    color: '#000',
    fontSize: 18,  
  },
  
  
});