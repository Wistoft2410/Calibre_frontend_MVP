import React from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import { lightGreen, darkGreen, Container, LogoContainer} from "../components/Style";



export default () => {
  

  const fadeIn = {
    from: {
        opacity: 0,
    },
    to: {
        opacity: 1,
    },
  };
  return(
    <LinearGradient
        // Background Linear Gradients
        colors={[lightGreen, darkGreen]}
        style={{width: '100%', height: '100%',}}
      >

        
        <Animatable.View style={LogoContainer.logoContainerBigSplash} >
          <View style={LogoContainer.logoContainer}>
            <Image
              style={LogoContainer.logoBig}
              source={require('../assets/calibre.png')}
            />
          </View>
          <Animatable.Text animation={fadeIn} duration={500} delay={1100} style={[LogoContainer.tagline, LogoContainer.taglineI]}> Seize the Moments</Animatable.Text>
        </Animatable.View>
        <View style={LogoContainer.header}>
          <Text style={[LogoContainer.tagline, {color: '#fff'}]}>Calibre</Text>
        </View>
    </LinearGradient>
  );
}

