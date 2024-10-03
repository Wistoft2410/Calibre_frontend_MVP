import React, { useState, useEffect, useRef } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, View, Text, TextInput, StatusBar, Button, TouchableOpacity,TouchableWithoutFeedback, Keyboard, Image, LinearGradient} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // https://oblador.github.io/react-native-vector-icons/
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {darkGreen, lightGreen, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown, LogoContainer} from "../../../components/Style";

import { signUp } from "../newSignUpFlow/style";

import { Dimensions } from 'react-native';

import DropDownPicker from '../../../components/dropdown-picker';
import PlacesInput from '../../../components/places-input';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth-windowWidth/8;
const neuHeight = windowHeight-windowHeight/2.3;

const City = props => {
  const {
        BACKGROUND,
        handlePress,
        ...rest
    } = props;
    
    const GOOGLE_API_KEY = 'AIzaSyC1DL8gnppq5oNaBExpRynw-VI2_zGKkQM';


    const [buttonState, setButtonState] = React.useState(true);
    const [countryState, setCountryState] = useState(false);
    const [country, setCountry] = useState();
    const [countryCode, setCountryCode] = useState(); //ex: dk or USA
    const [countryLanguage, setCountryLanguage] = useState(''); // ex: dk or en-US
    
    const buttonStateStyle = buttonState ? signUp.lowOpacity : "";
    return(
        <View style={[NeumorphismInput.container, {top: '25%',height: '20%'}]}>     
      
            
            <NeuView color={BACKGROUND} width={windowWidth-80} height={50} borderRadius={RADIUS} >
                <DropDownPicker
                    onOpen={() => { setCountryState(false)}}
                    onClose={() => {if(country != ''){setCountryState(true)}}}
                    placeholder={"Select country"}
                    showArrow={false}
                    items={[
                        {label: 'Danmark', country: '133', value: 'dk', language: 'dansk' },
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
                            
                            handlePress(place.result.name, country)
                            
                            
                        }}
                        queryTypes="(cities)"
                        
                    />
                </NeuView>
            </View>
        </View>
            );
}
const styles = StyleSheet.create({
 
    
   
});

City.propTypes = {
  BACKGROUND: PropTypes.string,
  first: PropTypes.string,
  last: PropTypes.string,
  handlePress: PropTypes.func,
  ...City.propTypes
};
export default City;