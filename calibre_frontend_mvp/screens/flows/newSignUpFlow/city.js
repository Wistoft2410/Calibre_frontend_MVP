import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, Button, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PlacesInput from '../../../components/places-input';
import Icon from 'react-native-vector-icons/FontAwesome';

import DropDownPicker from '../../../components/dropdown-picker';

// Importing styles and UI components
import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, Neumorphism, NeumorphismInput, Container, ActionContainer, HeroContainer, ProgressBar, DropDown} from "../../../components/Style";

import { Dimensions } from 'react-native';

// Get screen dimensions for responsive UI adjustments
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ route, navigation }) => {

    // Google API key for PlacesInput component
    const GOOGLE_API_KEY = 'AIzaSyBth6_0sv06bYvW29eowv4lcdI6wdbGtbQ';

    // State variables
    const [buttonState, setButtonState] = React.useState(true);
    const [countryState, setCountryState] = useState(false);
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState(''); //ex: dk or USA
    const [countryLanguage, setCountryLanguage] = useState(''); // ex: dk or en-US
   

    
// Function to handle city selection
const handlePress = (city, cityLat, cityLng) => {
    // Keyboard.dismiss();
    console.log("\nBday: "+route.params.bday)
    console.log("Email: "+route.params.email)
    console.log("Name: "+ route.params.firstname + " " + route.params.lastname)
    console.log("Language: "+ countryLanguage)
    console.log("Country: "+ country)
    console.log("City: "+ city)
    console.log("City lat: "+ cityLat)
    console.log("City lng: "+ cityLng)
    
    // Check if any city-related information is missing
    if(city == "" || cityLat == "" || cityLng == ""){
        alert("Something went wrong! Please try again")
    }else{
        // Navigate to the next screen with user details
        navigation.navigate('Interest', {
        bday: route.params.bday,
        email: route.params.email,
        firstname: route.params.firstname,
        lastname: route.params.lastname,
        language: countryLanguage,
        country: country,
        city: city,
        cityLat: cityLat,
        cityLng: cityLng,
    });
    }
  }
  // Animation configurations for fade-in effect
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  
  // Animation configurations for progress bar
  const progress = {
    from: {
      width: '47%',
    },
    to:{
      width: '63%',
    }
  };
   
  // Conditionally apply opacity style to button based on buttonState
  const buttonStateStyle = buttonState ? signUp.lowOpacity : "";

    return(
        <Container>
        {/* Dismiss keyboard when clicking outside input fields */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
        </TouchableWithoutFeedback>
        
        {/* Animated progress bar */}
        <View style={ProgressBar.progressBar}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </View>
        
        {/* Animated header text */}
        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>city</Text>?</Text>
        </Animatable.View>
        
        {/* Neumorphism container for country and city selection */}
        <View style={[NeumorphismInput.container, {top: '25%',height: '20%'}]}>          
            <NeuView color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS} >
                <DropDownPicker
                    onOpen={() => { setCountryState(false)}}
                    onClose={() => {if(country != ''){setCountryState(true)}}}
                    placeholder={"Select country"}
                    showArrow={false}
                    items={[
                        {label: 'Danmark', country: 'Denmark', value: 'dk', language: 'dansk' },
                        // {label: 'UK', value: 'uk', language: 'en', icon: () => <Icon name="globe" size={18} color="green" />},
                        {label: 'Don\'t see your country? We curently only support these countries', value: '', untouchable: true},
                        
                    ]}
                    containerStyle={{height: 50,width: windowWidth-80}}
                    style={DropDown.dropDownButton}
                    itemStyle={[DropDown.items, {paddingVertical: 15}]}
                    dropDownStyle={DropDown.dropDownStyle}
                    onChangeItem={item =>{
                        console.log(item)
                        setCountry(item.country);
                        setCountryCode(item.value);
                        setCountryLanguage(item.language);
                        setCountryState(true);
                    }}
                />
            </NeuView>
            
            {/* City input field, visible only if country is selected */}
            <View style={ [(countryState ? "" : {display: 'none'} ), {width: windowWidth-80} ]}>
                <NeuView inset color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS} >
                    <PlacesInput
                        googleApiKey={GOOGLE_API_KEY}
                        placeHolder={"Enter city"}
                        language={countryLanguage}
                        queryCountries={[countryCode]}
                        requiredCharactersBeforeSearch={0}
                        requiredTimeBeforeSearch={200}
                        onSelect={place => {
                        
                            console.log("\nFormatted address: "+place.result.formatted_address)
                            console.log("Name: "+place.result.name)
                            console.log("Location: lat: "+place.result.geometry.location.lat+" lng: "+place.result.geometry.location.lng) 
                            
                            handlePress(place.result.name, place.result.geometry.location.lat, place.result.geometry.location.lng)
                            
                            
                        }}
                        queryTypes="(cities)"
                        
                    />
                </NeuView>
            </View>
        </View>
        
      </Container>
        
   
    );
  }

