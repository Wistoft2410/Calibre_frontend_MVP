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
import Moment from 'moment';
import DropDownPicker from '../../../components/dropdown-picker';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, Neumorphism, Container, ActionContainer, HeroContainer, ProgressBar, DropDown, Swipe as SwipeBackHint} from "../../../components/Style";
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
        age = "",
        ...rest
    } = props;

    const [date, setDate] = React.useState('');
    const [buttonState, setButtonState] = React.useState(true);
    const [dateDay, setDateDay] = React.useState('');
    const [dateMonth, setDateMonth] = React.useState('');
    const [dateYear, setDateYear] = React.useState('');
    const [showText, setShowText] = React.useState(true);


   
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
    const buttonStateStyle = buttonState ? signUp.lowOpacity : "";
    return(
        <View style={{position: 'absolute', width: '100%', height: '100%'}}>


        
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
                  <MaterialCommunityIcon name="gesture-swipe-right" size={20} color={"#73EC70"} /> {showText ? "Swipe right to go back" : ""} 
              </Text>
          </View>
            <NeuButton onPress={() => handlePress(dateYear, dateMonth, dateDay)} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}>
              <Text style={Neumorphism.buttonText}>
                Next
              </Text> 
            </NeuButton>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
 
    
   
  });

  Name.propTypes = {
    BACKGROUND: PropTypes.string,
    age: PropTypes.string,
    handlePress: PropTypes.func,
    ...Name.propTypes
  };
  export default Name;