import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../utils/authContext';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { NeuView, NeuInput, NeuButton } from '../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown} from "../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth-windowWidth/6;
const neuHeight = windowHeight-windowHeight/2.5;

export default ({ navigation, route }) => {
  const ref = React.useRef();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [buttonState, setButtonState] = React.useState(true);
    const [inputState, setInputState] = React.useState(false);

    const { signIn } = React.useContext(AuthContext);

    const handlePress = () => {
        signIn({username: email, password: password})
    }

    const fadeIn = {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    };

    const buttonStateStyle = buttonState ? styles.lowOpacity : "";
    const inputStateStyle = !inputState ? styles.lowOpacity : "";
    return(
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputView}>
            <View style={styles.hero}>
              <View style={styles.divider}/>
                <View style={styles.heroContaner}>
                  <Text style={styles.heroText}>SIGN UP</Text>
                  <MaterialIcon name="keyboard-arrow-down" size={20}/>
                </View>
              <View style={styles.divider}/>
            </View>
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                  <NeuInput color={BACKGROUND} width={neuWidth-30} height={50} borderRadius={RADIUS} 
                      style={styles.nameInput}
                      onChangeText={(value) => {
                        if (value === "") {
                            setEmail(value);
                            setButtonState(true);
                            setInputState(false);
                          } else {
                            setEmail(value);
                            setInputState(true);
                          }
                        }
                      }
                      value={email}
                      autoFocus={true}
                      placeholder="john@does.com"
                      keyboardType="email-address"
                      autoCorrect={false}
                      autoCapitalize='none'
                      returnKeyType={'next'}
                      enablesReturnKeyAutomatically={true}
                      onSubmitEditing={() => ref.current.focus()}
                      autoFocus={false}
                      blurOnSubmit={false}
                      textContentType={'username'}
                  />            
                </View>
                <View style={styles.inputContainer}>
                  <NeuView color={BACKGROUND} width={neuWidth-30} height={50} borderRadius={RADIUS} inset>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 12,
                        height: '100%',
                      }}
                    >
                      <TextInput
                          style={{
                            borderBottomWidth: 0,
                            width: '100%',
                            height: '100%',
                            paddingVertical:0,
                            letterSpacing: 1,
                          }}
                          onChangeText={(value) => {
                            if (value === "") {
                                setPassword(value);
                                setButtonState(true);
                              } else {
                                setPassword(value)
                                setButtonState(false);
                              }
                            }
                          }
                          value={password}
                          placeholder="Password"
                          secureTextEntry={true}
                          autoCorrect={false}
                          placeholderTextColor={PLACEHOLDER}
                          returnKeyType={'go'}
                          onSubmitEditing={()=> handlePress()}
                          enablesReturnKeyAutomatically={true}
                          textContentType={'password'}
                          ref={ref}
                      />
                    </View>
                  </NeuView>            
                </View>
                <View style={styles.actionContainer}>   
                    <NeuButton color={BACKGROUND} width={neuWidth-30} height={50} borderRadius={RADIUS}
                      disabled={buttonState}
                      style={[styles.action, buttonStateStyle]}
                      onPress={() => handlePress()}
                    >
                      <Text style={styles.actionText}>
                          LOG IN
                      </Text>
                    </NeuButton> 
                  </View> 
              </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Container>

      
    );
  }

const styles = StyleSheet.create({
  inputView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
   },
  hero: {
    top:20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
   },
  divider: {
    height: 2,
    backgroundColor: COLOR,
    width: 80,
    marginHorizontal: 10,
   },
   heroContaner: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText:{
     fontSize: 16
   },
  inputsContainer: {
    position: 'absolute',
    top: '30%',
  },
  inputContainer: {
    marginTop: '10%',
    width: '100%',
    alignItems: 'center'
  },
  actionContainer: {
    marginTop: '20%',
    width: '100%',
    alignItems: 'center'
  },


});