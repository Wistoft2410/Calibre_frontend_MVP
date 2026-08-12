import React from 'react';
import { StyleSheet, SafeAreaView} from "react-native";
import styled from 'styled-components';



// UI background color 
const BACKGROUND = "#F2F2F2"; // dark mode: #35363A light mode: #F2F2F2

// User card borders and more
const RADIUS = 10;

const COLOR = "rgba(0, 0, 0, 0.8)" // dark mode: rgba(255, 255, 255, 0.8) light mode: rgba(0, 0, 0, 0.8)

// text colors 
const PLACEHOLDER = "rgba(0, 0, 0, 0.4)" // dark mode: rgba(255, 255, 255, 0.4) light mode: rgba(0, 0, 0, 0.4)
const SHADOW = "rgba(209, 205, 199, 0.72)" // dark mode rgba(28, 29, 33, 0.5) light mode rgba(209, 205, 199, 0.72)

// UI colors 
const lightGreen = '#00f800';
const darkGreen = '#279566';
const menuIconLight = '#269B5C';
const menuIconDark = '#22EC17';


const Container=styled.SafeAreaView`
position: relative;
width: 100%;
height: 100%;

background: ${BACKGROUND};
    `


const Neumorphism = StyleSheet.create({
    buttonText: {
        marginVertical: 14,
        fontSize: 18,
        textAlign:'center',
        color: COLOR,
    },
      
})
const NeumorphismInput = StyleSheet.create({
    container: {
        position:'absolute',
        top: '25%',
        height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        
      },
      text: {
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 1,
        color: COLOR
      },
      

})

const ActionContainer = StyleSheet.create({
    actionContainerStart:{
        position:'absolute',
        top: "65%",
        width:200,
        alignSelf:'center',
        zIndex:99,
    },
    secondaryActionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        bottom: '6%',
        zIndex:99,
    },
    secondaryActionText: {
        color: COLOR,
        fontSize: 14
    },
    divider: {
        height: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        width: 60,
        marginHorizontal: 10,
    },
    actionContainerSignUp:{
        position:'absolute',
        bottom: "10%",
        width:140,
        alignItems:'center',
        width: '100%',
    },
    actionContainerSignUpAvoiding:{
        marginBottom: 10,
    },
})

const LogoContainer = StyleSheet.create({
    logoContainerBig: {
        top: '20%',
        position:'absolute', 
        width: '100%',
        alignItems: 'center',
    },
    logoContainerBigSplash: {
        top: '30%',
        position:'absolute', 
        width: '100%',
        alignItems: 'center',
    },
    logoContainer: {
        width: 140,
        height: 140,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    logoBig: {
        width: 110,
        resizeMode: 'contain',
    },
    tagline: {
      marginTop: 20,
      color: lightGreen,
      fontWeight: '700',
      fontSize: 22
    },
    taglineI: {
        marginTop: 10,
        fontStyle: 'italic',
        color: '#2CA675',
      },
    header: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
    },
})
const TheDeal = StyleSheet.create({
    container:{
        position:'absolute',
        top: '30%',
        height: '50%',
        paddingHorizontal: 25,
        overflow: 'hidden'
    },
    text:{
        fontSize: 17,
        lineHeight: 24,
        letterSpacing: 1,
        color: COLOR
    },
    textSmall:{
        fontSize: 12,
        color: lightGreen,
    }
})

const HeroContainer = StyleSheet.create({
    container:{
        position: 'absolute',
        top: '15%',
        width: '100%',
        alignItems: 'center',
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        lineHeight: 24,
        color: COLOR,
    },
    greenText:{
        color: lightGreen
    },
    
})
const ProgressBar = StyleSheet.create({
    progressBar:{
        position:'absolute',
        alignSelf: 'center',
        top: '8%',
        borderRadius : 50,
        width: '60%',
        height: 20,
        backgroundColor: "#FFFFFF",
        shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: .2,
          shadowRadius: 5,
          shadowColor: "#000000", 

        
    },
    progress:{
        position:'absolute',
        alignSelf: 'center',
        backgroundColor: lightGreen,
        height: 15,
        borderRadius : 50,
        marginLeft:5,
        top: 2.5,
        alignSelf: 'flex-start'
    },
})
const DropDown = StyleSheet.create({
    container:{
        position:'absolute',
        flexDirection: 'row',
        top:'40%',
        width:'100%',
        justifyContent: 'center',
        
    },
    dropDownButton:{
        backgroundColor: BACKGROUND,
        borderWidth: 0,  
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: COLOR,
    },
    margin:{
        marginHorizontal:20,
    },
    items:{
        justifyContent: 'center',
        borderTopWidth:1,
        borderColor: SHADOW,
     
    },
    dropDownStyle:{
        backgroundColor: BACKGROUND,
        borderWidth:0,
        borderRadius: RADIUS,
        // box-shadow is equivalent to shadow style in React Native
        shadowOffset: {
          width: 4,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowColor: SHADOW, 
    },
})
const Gender = StyleSheet.create({
    container:{
        position:'absolute',
        height: '60%',
        top: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gender:{
        alignItems:'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderRadius: 10,
        
    },
    maleGender: {
        backgroundColor: '#00D8FF',
      },
      femaleGender: {
        backgroundColor: '#FF009D',
      },
      genderText: {
        color: BACKGROUND,
        fontSize: 24,
        fontWeight: "400",
        letterSpacing: 1
      },
})

const PasswordInfo = StyleSheet.create({
    passwordInfoHeroContainer:{
        width:'100%',
        flexDirection: 'row',
      },
      passwordInfoHero:{
        paddingVertical: 15,
        color: COLOR,
        fontSize: 14,
      },
      passwordInfoBall:{
        width:30,
        height:30,
        borderRadius: 100,
        marginHorizontal: 10,
        marginVertical: 15,
      },
      passwordInfoP:{
        marginVertical: 5,
        marginHorizontal:10,
        fontSize: 12,
        color: COLOR
      },
})

const SwipeBackHint = StyleSheet.create({
swipeBackHintContent:{
    width:'100%',
    paddingLeft: 10,
    top: -210,
    justifyContent:'flex-end',
    position: 'absolute',
    zIndex: -99,
  },
  swipeBackHintText:{
    alignItems: 'flex-start',
    fontSize:15,
    color: '#73EC70'
  },
})

export {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Container, Neumorphism, NeumorphismInput,ActionContainer,LogoContainer, TheDeal, HeroContainer, ProgressBar, DropDown, Gender, PasswordInfo, SwipeBackHint as Swipe, lightGreen, darkGreen, menuIconLight, menuIconDark}