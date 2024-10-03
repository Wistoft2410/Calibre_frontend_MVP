import React, { useState, useEffect } from 'react';
import {AppRegistry, ActivityIndicator, Button, Image, View, Platform, StyleSheet, TouchableOpacity, Text , Keyboard, TouchableWithoutFeedback} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {AuthContext} from '../../../utils/authContext';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default ({ navigation, route }) => {
    
  const [buttonState, setButtonState] = React.useState(true);
    
  const handlePress = () => {
     
   }


   
  let Image_Https_URL = { uri: 'https://www.stm.dk/media/7975/mfr_download.jpg'};
    return(
      <Container>
        <View style={styles.cardView}>
          <NeuView height={windowHeight-windowHeight/3} width={windowWidth-windowWidth/6} color={BACKGROUND} borderRadius={RADIUS} style={styles.card}>

            <NeuView height={120} width={120} color={BACKGROUND} borderRadius={100} style={styles.imageView}>
              <Image source={Image_Https_URL} defaultSource={require("../../../assets/stick.png")} style={styles.image}/>
            </NeuView>

            <View style={styles.shortInfo}>
              <Text style={styles.shortInfoText}>firstname</Text>
              <Text style={styles.shortInfoText}> ?? år</Text>
            </View>

            <View style={styles.things}>
              <View style={[styles.thingItem, {backgroundColor: "red"}]} >         
                <Text style={[styles.thingText, {color: "rgba(255, 255, 255, 0.8)"}]}>
                  First Item
                  <Emoji name={":soccer:"} style={{fontSize: 12}} />  
                </Text>             
              </View>
              <View style={[styles.thingItem, {backgroundColor: "red"}]} >         
                <Text style={[styles.thingText, {color: "rgba(255, 255, 255, 0.8)"}]}>
                  First Item
                  <Emoji name={":soccer:"} style={{fontSize: 12}} />  
                </Text>             
              </View>
              <View style={[styles.thingItem, {backgroundColor: "red"}]} >         
                <Text style={[styles.thingText, {color: "rgba(255, 255, 255, 0.8)"}]}>
                  First Item
                  <Emoji name={":soccer:"} style={{fontSize: 12}} />  
                </Text>             
              </View>
            </View>

            <View style={styles.cityView}>
              <FontAwesome5Icon name="city" size={20} color={COLOR} style={styles.cityIcon}/>
              <Text style={styles.cityText}>
                City name, Country
              </Text>
            </View>
            
          </NeuView>
        </View>
      </Container>
    );
  }

  const styles = StyleSheet.create({
    cardView : {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    card:{

    },
    imageView:{
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 30,
      left: 30,
    },
    image: {
      width: '92%',
      height: '92%',
      borderRadius: 100,
    },
    things:{
      
      position: 'absolute',
      top: 30,
      right: 30,
      height: 180,
      justifyContent: 'space-evenly'
    },
    thingItem: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 20,
      backgroundColor: 'red',
      borderWidth : 2,
      borderColor: BACKGROUND,
      
    },
    thingText:{
      fontSize: 10,
      fontWeight: 'bold',
      // textTransform: 'uppercase',
      letterSpacing: 1,
    },
    shortInfo: {
      position: 'absolute',
      top: 150,
      left: 10,
      width: 150,
      alignItems: 'center',
     
    },
    shortInfoText: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      letterSpacing: 1,
      marginTop: 10,
    },
    cityView: {
      position: 'absolute',
      left:10,
      top: 220,
      width: 150,
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    cityIcon: {
      marginRight: 5,
    },
    cityText: {
      letterSpacing: 1,
      fontSize: 12,
      
    }
  })