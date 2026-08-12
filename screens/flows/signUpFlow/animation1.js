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
              { name: 'animation2' },
            ],
          })
        );
      }, 800);
    });

    
  
  const big = {
    from: {
        marginTop: '45%',
        width: 130,
        height:160,
        transform:[{rotate: '0 deg'}]
    },
    to: {
        marginTop: '-15%',
        width: 1000,
        height: 1000,
        transform:[{rotate: '30 deg'}]
    },
  };
 

    return( 
      <Container>
            <Animatable.Image
            animation={big}
            duration={800}
            delay={100}
            style={LogoContainer.logoBig}
            source={require('../../../assets/calibre.png')}
            />
      </Container>

      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    
  });