import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, Text, StatusBar, Button, TouchableOpacity, Image} from 'react-native';
import {AuthContext} from '../utils/authContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // https://oblador.github.io/react-native-vector-icons/
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NeuView, NeuInput, NeuButton } from '../components/neu-element';
import {Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown, LogoContainer} from "../components/Style";
import UserCard from "../components/userCard";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth-windowWidth/12;
const neuHeight = windowHeight-windowWidth/1.6;

const Profile = props => {
  const {
      open,
      BACKGROUND,
      id,
      profileImage,
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
     

    return(
      firstName == null ? (
          <ActivityIndicator size="large" style={{height: '100%', width: "100%", position: 'absolute'}}/>
      ): (
          <UserCard open={open} BACKGROUND={BACKGROUND} profileImage={profileImage} interests={interests} firstName={firstName} lastName={lastName} age={age} city={city} email={email} gender={gender} phone={phone} currentCity={currentCity}/>
      )
      
    );
}

  Profile.propTypes = {
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
...Profile.propTypes
};
export default Profile;