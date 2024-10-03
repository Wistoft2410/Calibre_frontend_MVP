import React, { useEffect, useState } from 'react';
import { Button, View, TextInput, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CommonActions } from '@react-navigation/native';

import { Container, LogoContainer, BACKGROUND} from "../../../components/Style";


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
      }, 1000);
    });

    
  
  const big = {
    from: {
        width: 1000,
        height: 1000,
        transform:[{rotate: '30 deg'}]
    },
    to: {
        width: 40,
        height: 100,
        transform:[{rotate: '0 deg'}],
    },
  };
 
  const up = {
    from: {
        top: '40%'
    },
    to: {
        top: '0%'
    },
  };


    return( 
      <Container>
          <Animatable.View animation={up} delay={500} duration={500} style={LogoContainer.logoContainerBigSplash} >
            <Animatable.View style={[LogoContainer.logoContainer, {backgroundColor: BACKGROUND}]}>
              <Animatable.Image
              animation={big}
              duration={500}
              style={LogoContainer.logoBig}
              source={require('../../../assets/calibre.png')}
              />
            </Animatable.View>
          </Animatable.View>
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