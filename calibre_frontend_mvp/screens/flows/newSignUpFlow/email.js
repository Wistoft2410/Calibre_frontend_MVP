import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

// Importing custom components and styles
import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import { BACKGROUND, RADIUS, COLOR, Neumorphism, NeumorphismInput, Container, ActionContainer, HeroContainer, ProgressBar } from "../../../components/Style";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  
  // Simple navigation function
  const nextPage = () => {
    navigation.navigate('Name', { 
      bday: route.params.bday,
      email: email
    });
  }
  
  // Animation styles
  const fadeIn = {
    from: { opacity: 0 },
    to: { opacity: 1 }
  };
  
  const progress = {
    from: { width: '16%' },
    to: { width: '32%' }
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ height: '100%', width: '100%', zIndex: -99 }}></View>
      </TouchableWithoutFeedback>
      
      <View style={ProgressBar.progressBar}>
        <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
      </View>
      
      <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>
        <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>e-mail</Text>?</Text>
      </Animatable.View>

      <View style={NeumorphismInput.container}>
        <NeuInput 
          color={BACKGROUND} 
          width={windowWidth - 80} 
          height={50} 
          borderRadius={RADIUS}
          onChangeText={setEmail}
          value={email}
          autoFocus={true}
          placeholder="john@doe.com"
          keyboardType="email-address"
          autoCapitalize='none'
          returnKeyType={'next'}
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={nextPage}
        />
      </View>
      
      <View style={ActionContainer.actionContainerSignUp}>
        <View style={ActionContainer.actionContainerSignUpAvoiding}>
          <NeuButton
            onPress={nextPage} 
            width={140} 
            height={50} 
            color={BACKGROUND} 
            borderRadius={RADIUS}
          >
            <Text style={Neumorphism.buttonText}>NEXT</Text>
          </NeuButton>
        </View>
      </View>
    </Container>
  );
}

