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
              { name: 'animation2' },
            ],
          })
        );
      }, 1000);
    });

    
  
  const big = {
    from: {
        width: 110,
        height: 110,
        transform:[{rotate: '0 deg'}]
    },
    to: {
        width: 1000,
        height: 1000,
        transform:[{rotate: '30 deg'}]
    },
  };

  const remove = {
    from: {
        backgroundColor: "#FFFFFF",
    },
    to: {
       backgroundColor: BACKGROUND,
    },
  };
 

    return( 
      <Container>
        <Animatable.View style={LogoContainer.logoContainerBigSplash} >
          <Animatable.View  animation={remove} duration={800} delay={100} style={LogoContainer.logoContainer}>
            <Animatable.Image
                animation={big}
                duration={800}
                delay={100}
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