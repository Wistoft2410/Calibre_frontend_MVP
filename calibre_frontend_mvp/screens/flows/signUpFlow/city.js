import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard, Button, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PlacesInput from '../../../components/places-input';
import Icon from 'react-native-vector-icons/FontAwesome';

import DropDownPicker from '../../../components/dropdown-picker';

// import GoconInput from '../../../components/GoconInput';
import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, Neumorphism, NeumorphismInput, Container, ActionContainer, HeroContainer, ProgressBar, DropDown} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ route, navigation }) => {
   

    const GOOGLE_API_KEY = 'AIzaSyC1DL8gnppq5oNaBExpRynw-VI2_zGKkQM';


    const [buttonState, setButtonState] = React.useState(true);
    const [countryState, setCountryState] = useState(false);
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState(''); //ex: dk or USA
    const [countryLanguage, setCountryLanguage] = useState(''); // ex: dk or en-US
   

    

const handlePress = (city, cityLat, cityLng) => {
    // Keyboard.dismiss();
    console.log("\nBday: "+route.params.bday)
    console.log("Gender: "+ route.params.gender)
    console.log("Name: "+ route.params.firstname + " " + route.params.lastname)
    console.log("Language: "+ countryLanguage)
    console.log("Country: "+ country)
    console.log("City: "+ city)
    console.log("City lat: "+ cityLat)
    console.log("City lng: "+ cityLng)

    if(city == "" || cityLat == "" || cityLng == ""){
        alert("Something went wrong! Please try again")
    }else{
        navigation.navigate('Phone', {
        bday: route.params.bday,
        gender: route.params.gender,
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
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  const progress = {
    from: {
      width: '27%',
    },
    to:{
      width: '36%',
    }
  };

  const buttonStateStyle = buttonState ? signUp.lowOpacity : "";

    return(
        <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
        </TouchableWithoutFeedback>
        
        <NeuView style={ProgressBar.progressBar} color={BACKGROUND} borderRadius={RADIUS} width={windowWidth-80} height={15}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </NeuView>

        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>city</Text>?</Text>
        </Animatable.View>

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
        
    //     <View style={{marginTop: 300, marginLeft: '10%', width: '80%'}}>
             
             
            //  <DropDownPicker
            //     placeholder={"Select country"}
            //     items={[
            //         {label: 'Danmark', value: 'dk', language: 'dk', icon: () => <Icon name="globe" size={18} color="green" />},
            //         // {label: 'UK', value: 'uk', language: 'en', icon: () => <Icon name="globe" size={18} color="green" />},
            //         {label: 'Don\'t see your country? We corently only support these countries', value: '', untouchable: true},
                    
            //     ]}
            //     containerStyle={{height: 40}}
            //     style={{backgroundColor: '#fafafa'}}
            //     itemStyle={{
            //         justifyContent: 'flex-start'
            //     }}
            //     dropDownStyle={{backgroundColor: '#fafafa'}}
            //     onChangeItem={item =>{
            //         console.log(item)
            //         setCountry(item.label);
            //         setCountryCode(item.value);
            //         setCountryLanguage(item.language);
            //         setCountryState(true);
            //     }}
            // />
    //          <View style={ (countryState ? "" : {display: 'none'} )}>
    //           <PlacesInput
    //                 googleApiKey={GOOGLE_API_KEY}
    //                 placeHolder={"City"}
    //                 language={countryLanguage}
    //                 queryCountries={[countryCode]}
    //                 requiredCharactersBeforeSearch={1}
    //                 requiredTimeBeforeSearch={200}
    //                 onSelect={place => {
                    
    //                     console.log("\nFormatted address: "+place.result.formatted_address)
    //                     console.log("Name: "+place.result.name)
    //                     console.log("Location: lat: "+place.result.geometry.location.lat+" lng: "+place.result.geometry.location.lng) 
                        
    //                     handlePress(place.result.name, place.result.geometry.location.lat, place.result.geometry.location.lng)
                        
                        
    //                 }}
    //                 queryTypes="(cities)"
    //             />
                
    //             </View>
                
    //    </View>     
    );
  }

