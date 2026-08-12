import React, {useEffect, useState} from 'react';
import { ActivityIndicator,StyleSheet, View, Text, StatusBar, Button, TouchableOpacity, Image} from 'react-native';
import {AuthContext} from '../utils/authContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // https://oblador.github.io/react-native-vector-icons/
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

import { NeuView, NeuInput, NeuButton } from '../components/neu-element';


import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth-windowWidth/8;
const neuHeight = windowHeight-windowHeight/2.3;

const UserCard = props => {
  const {
      open,
      BACKGROUND,
      profileImage,
      id,
      firstName,
      lastName,
      age,
      city,
      email,
      gender,
      phone,
      interests,
      currentCity,
      ...rest
    } = props;

    const serverName = require('../appSettings/db.json'); 

    const  getAge = (dateString)=>{
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    
     

      useEffect(() => {
       
      }, []);


    const GetCity = () => {
        return (
          <Text style={styles.quickinfoText}>
          {currentCity ? 
             currentCity
          : (<ActivityIndicator  style={{marginRight: 20}}/>) }
          </Text>
        );
    }
        
    
    return(
        <View style={styles.feed}>
          <TouchableOpacity onPress={open} style={{width: '100%', height: '100%',position: 'absolute', justifyContent: 'center', alignItems: 'center'}} >
            <NeuView height={neuHeight} width={neuWidth} color={BACKGROUND} borderRadius={25} style={{top:-15}}>
              <View style={styles.profile}>
                  <View style={styles.profileNameTagContainer}>
                    <Text style={styles.profileNameTag}>{firstName}, {getAge(age)}</Text>
                  </View>
                  <View style={styles.profilePhotoContainer}>
                    {profileImage ? (
                        <Image
                          style={styles.profilePhoto}
                          source={{uri : serverName.app.db+"images/"+ profileImage}}
                        />
                      ):(
                        <Image
                          style={[styles.profilePhoto, {backgroundColor: "#fff",}]}
                          source={require('../assets/calibre.png')}
                        />
                    )}
                  </View>
                  <View style={styles.userInterests}>
                    {interests == "No interests found" ? (
                            null
                        ) : (  
                        interests == undefined ? (
                                null
                            ):(
                            interests.map((item) => {
                                    return (
                                    <View key={item.emoji} style={[styles.interest,{backgroundColor: item.bgColor}]}>
                                        <Emoji name={item.emoji} style={{fontSize: 25}} />  
                                    </View>
                                    )
                                })
                            )
                        )}
                  </View>
              </View>
              <View style={styles.quickinfo}>
                <NeuView height={neuHeight/2.6} width={neuWidth-25} color={BACKGROUND} borderRadius={10}>
                  <View style={styles.quickinfoView}>
                    <View style={styles.quickinfoHeaderView}>
                      <Text style={styles.quickinfoHeaderText}>- Quick info -</Text>
                    </View>
                    <View style={styles.quickinfoTextView}>
                      <MaterialIcon name="work" size={windowWidth/6/3} color={"gray"}/>
                        <Text style={styles.quickinfoText}> Cooming in later version</Text>
                    </View>
                    <View style={styles.quickinfoTextView}>
                      <MaterialIcon name="school" size={windowWidth/6/3} color={"gray"}/>
                        <Text style={styles.quickinfoText}> Cooming in later version</Text>
                    </View>
                    <View style={styles.quickinfoTextView}>
                      <MaterialIcon name="location-on" size={windowWidth/6/3} color={"gray"}/>
                        
                           {currentCity == null ? (
                              <Text style={styles.quickinfoText}> Location turned off</Text>
                            ) : (
                              <GetCity/>
                           )}
                        
                    </View>
                  </View>
                </NeuView>
              </View>
            </NeuView>
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
   
    feed:{
      position: 'absolute',
      top: '12%',
      width: '100%',
      height: '70%',
      justifyContent:'flex-start',
      alignItems: 'center',
      
    },
    profile:{
      width: neuWidth-25,
      height: '48%',
      top:14,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "rgb(158,215,204)",
      borderRadius: 30,
      shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 1,
    },
    profilePhotoContainer: {
      position: 'absolute',
      left: 20,
      height: windowWidth/2.3, width: windowWidth/2.3,
      borderRadius: 100,
      backgroundColor: '#000',
      overflow: 'hidden',
      borderWidth: 10,
      borderColor: "rgb(87,182,159)",
    },
    profilePhoto: {
      width: '100%',
      height: '100%'
    },
    profileNameTagContainer:{
      position: 'absolute',
      backgroundColor: '#000',
      borderRadius: 20,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 3,
      paddingTop: 3,
      top:-10,
    },
    profileNameTag: {
      color: '#FFF',
      letterSpacing: 0,
      fontWeight: '700',
      fontSize: 16,
      textTransform: "uppercase",
    },
    userInterests: {
      position: 'absolute',
      right: 25,
      top: "10%",
      borderColor: '#FFF',
      borderWidth: 2,
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 30,
      paddingBottom: 2, paddingTop: 2,
      paddingLeft: 5, paddingRight: 5,
      height: "80%",

    },
    interest: {
      width: 45, height: 45,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quickinfo: {
      width: '100%',
      height: '45%',
      bottom:2,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    quickinfoView: {
      width: '100%', height: '90%', 
      justifyContent: 'space-around',
      top:-5,
    },
    quickinfoHeaderView: {
      width: '100%',
      alignItems: 'center',
    },
    quickinfoHeaderText: {
      fontWeight: 'bold',
      fontSize: 12,

    },
    quickinfoTextView: {
      width: '100%',
      paddingLeft: 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    },
    quickinfoText: {
      fontSize: 18,
      color: 'gray',
      fontWeight: '400',
      paddingLeft: 10,
    },
    text:{
      color:'#00E864',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      backgroundColor: '#000',
      width: '100%',
      alignItems: 'center',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logo: {
      width: '60%',
      resizeMode: 'contain',
    },
    tagline: {
      marginTop: -20,
      color: '#fff',
      fontWeight: '700',
      fontSize: 22
    },
   
  });
  UserCard.propTypes = {
    open: PropTypes.func,
    BACKGROUND: PropTypes.string,
    profileImage: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    green: PropTypes.string,
    phone: PropTypes.number,
    interest: PropTypes.any,
    currentCity: PropTypes.any,
...UserCard.propTypes
};
export default UserCard;