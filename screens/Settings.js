import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, View, Text, StatusBar, Button, TouchableOpacity, Image, LinearGradient} from 'react-native';
import {AuthContext} from '../utils/authContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // https://oblador.github.io/react-native-vector-icons/
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';


import { QR } from '../components/QRcode';

import { NeuView, NeuInput, NeuButton } from '../components/neu-element';
import {darkGreen, lightGreen, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown, LogoContainer} from "../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth-windowWidth/8;
const neuHeight = windowHeight-windowHeight/2.3;

const Setteings = props => {
  const {
      BACKGROUND,
      openEditProfile,
      user,
      ...rest
    } = props;

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])
    
    const { signOut } = React.useContext(AuthContext);

    
    return(
      // Settings       
        <View style={styles.Setteings}>
            <NeuButton onPress={openEditProfile} style={styles.button} height={neuHeight/7} width={neuWidth/2} color={BACKGROUND} borderRadius={10}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </NeuButton>
            <TouchableOpacity onPress={signOut} style={styles.logout}>
                <Text style={styles.text}>
                    - LOG OUT -
                </Text>
            </TouchableOpacity>
        </View>

    
    );
}

const styles = StyleSheet.create({
   Setteings: {
        width: '100%',
        alignItems: 'center'
    },
    button:{
        marginTop: '10%',
    },  
    buttonText: {
        fontSize: 20,
        fontWeight: '400'
    },
    logout:{
        width: '100%',
        alignItems: 'center',
        marginTop: '10%',
    },
    text :{
       fontSize: 16,
       color: '#000',
       fontWeight: '300'
    }
    
   
  });

  Setteings.propTypes = {
    BACKGROUND: PropTypes.string,
    openEditProfile: PropTypes.func,
    user: PropTypes.any,
    ...Setteings.propTypes
  };
  export default Setteings;