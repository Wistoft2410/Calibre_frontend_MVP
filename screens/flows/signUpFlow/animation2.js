import React, { useEffect, useState } from 'react';
import { Button, View, TextInput, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CommonActions } from '@react-navigation/native';

import { Container, LogoContainer} from "../../../components/Style";


export default ({ navigation }) => {
    useEffect(() => {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'The Deal' },
            ],
          })
        );
      }, 800);
    });

    
  
  const big = {
    from: {
      marginTop: '-15%',
      width: 1000,
      height: 1000,
      transform:[{rotate: '30 deg'}]
    },
    to: {
        width: 40,
        height: 100,
        transform:[{rotate: '0 deg'}],
        marginTop:'90%'
    },
  };
 

    return( 
      <Container>
            <Animatable.Image
            animation={big}
            duration={800}
            style={LogoContainer.logoBig}
            source={require('../../../assets/calibre.png')}
            />
      </Container>

      
    );
  }

  const styles = StyleSheet.create({
    container: {
      height:'100%',
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    
  });