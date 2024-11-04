// tilføj top tre picks til display. De første tre der vælges vil komme op på skærmen som top picks. Senere vil man kunne ændre dem under ens profil
// Der kan tilføjes så mange intereser som man ønsker, men man kan kun vælge op til syv som bliver vist når andre ser ens profil. Alle intereser vil stadig tælle med i matching algortimen
import React, { useRef, useState, useEffect } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Keyboard, TouchableWithoutFeedback, ScrollView, Vibration} from "react-native";
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { set } from "react-native-reanimated";
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Haptics from 'expo-haptics';

import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown} from "../../../components/Style";

import { Dimensions } from 'react-native';

// Set window dimensions for responsive styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {
  
  // Reference for pan animation
  const pan = useRef(new Animated.ValueXY()).current;
  
  // Create pan responder for drag-and-drop gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Set initial position when dragging starts
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: () => {
        // Flatten offset to reset position after release
        pan.flattenOffset();
      }
    })
  ).current;

// Test access key and server name for API calls
const access_key = "TEST123";
const serverName = require('../../../appSettings/db.json');

// Navigate to the next page with selected interests and user info
const nextPage = (chosenInterests) => {
  console.log("\nBday: "+route.params.bday)
  console.log("Email: "+route.params.email)
  console.log("Name: "+ route.params.firstname + " " + route.params.lastname)
  console.log("Language: "+ route.params.countryLanguage)
  console.log("Country: "+ route.params.country)
  console.log("City: "+ route.params.city)
  console.log("City lat: "+ route.params.cityLat)
  console.log("City lng: "+ route.params.cityLng)
  console.log("interests:" +chosenInterests)

  navigation.navigate('Password', {
    bday: route.params.bday,
    email: route.params.email,
    firstname: route.params.firstname,
    lastname: route.params.lastname,
    language: route.params.countryLanguage,
    country: route.params.country,
    city: route.params.city,
    cityLat: route.params.cityLat,
    cityLng: route.params.cityLng,
    interests: chosenInterests
  });
}

// Handle press and validate minimum selection of 3 interests
const handlePress = (items) => {
  if(items.length < 3){
    alert("Please select a minimum of 3 interests, you have only selected "+ items.length +" interests")
  }else{
    nextPage(items);
  }
}

// States to manage selected interests, fetched data, and toggle between views
const [selectedId, setSelectedId] = useState([]);
const [DATA, setDATA] = useState([]);
const [showSelected, setShowSelected] = useState(false);

// Fetch interests data from server on component load
const fetchData = () => {
    fetch(serverName.app.db + 'things.php', { 
        method: 'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
          "access_token": access_key,
        })
    })
    .then((response) => response.json())
        .then((responseJson) =>{
          setDATA(responseJson); 
          console.log(responseJson);
        })
        .catch((error)=>{
            console.error(error);
        });
    }
    
    // Call fetchData when component mounts
    useEffect(() => {fetchData()},[])
  
  // Select an interest if not already selected, up to a max of 7
  const selectItem = (id) => {
    let valid = checkItem(id);
    if(valid == false){
      if(selectedId.length < 7){
          setSelectedId([
              ...selectedId,
              id
          ])
      }else{
          alert("You have already selected seven interests")
      }
    }
  }
  
  // Check if an item is already selected
  const checkItem =  (id) => {
    let valid = false;
    selectedId.map(sID => {
        if(sID === id){
            valid = true;
        }
    })
    return valid
  };
  
  // Deselect an item by removing it from the selected array
  const deSelectItem = (id) => {
    let selected = []
    selectedId.map(sID => {
        selected.push(sID)
    })
    let index = selected.indexOf(id)
    selected.splice(index, 1)
    setSelectedId(selected)
 }
  
  // Render list of selectable interests
  const Interests = () => { 
      return(
            <View style={styles.row}>
              {DATA.map(item => {
                    return <Interest id={item.ID} name={item.interest} key={item.ID} color={item.color} backgroundColor={item.bgColor} emoji={item.interestsEmoji}></Interest>
                keyNum++;
              })}
            </View>
        );   
  }
  
  // Render list of selectable interests
  const InterestsSelected = () => {  
  return(
    <View style={styles.row}>
      {DATA.map(item => {
            return <InterestSelected id={item.ID} name={item.interest} key={item.ID} color={item.color} backgroundColor={item.bgColor} emoji={item.interestsEmoji}/>
      })}
    </View>
  );   
}

  // Individual Interest component for each selectable interest
  const Interest = (props) => {
    const ref = React.useRef();
    const [bgColor, setbgColor] = React.useState(false);
    
    return(
        <View>
          <TouchableOpacity activeOpacity={1} onPress={() => {Haptics.selectionAsync();  checkItem(props.id) ? deSelectItem(props.id) : selectItem(props.id)}}  >
            <View style={[styles.interestItem, {backgroundColor: props.backgroundColor}, (checkItem(props.id) ? {paddingVertical:12} : {shadowOpacity: 0})]}  ref={ref} >         
              <Text style={[styles.interestText, {color: props.color}, (checkItem(props.id) ? {fontSize: 16} : "")]}>
                {props.name} 
                <Emoji name={props.emoji} style={{fontSize: 12}} />  
              </Text>             
            </View>
          </TouchableOpacity>
        </View>
      
      );
  }
  
  // Component to display selected interest items for deselection
  const InterestSelected = (props) => {
    const ref = React.useRef();
    const [bgColor, setbgColor] = React.useState(false);
    
    return(
        <View style={(checkItem(props.id) ? "" : {display: 'none'})}>
          <TouchableOpacity onPress={() => {deSelectItem(props.id)}}  >
            <View style={[styles.interestItem, {backgroundColor: props.backgroundColor}]}  ref={ref} >         
              <Text style={[styles.interestText, {color: props.color}]}>
                {props.name} 
                <Emoji name={props.emoji} style={{fontSize: 12}} /> 
              </Text>             
            </View>
          </TouchableOpacity>
        </View>
      
      );
  }
  
  // Animation settings
  const fadeIn = { from: { opacity: 0 }, to: { opacity: 1} };
  const progress = { from: { width: '63%'}, to:{ width: '79%'} };
  
  // Main component return
  return (
    <Container >
      {/* Progress bar animation */}
        <View style={ProgressBar.progressBar}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </View>
         
         {/* Title and animated heading */}
        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>interest</Text>?</Text>
        </Animatable.View>
        
        {/* Interests selection container */}
        <View style={[NeumorphismInput.container, {height: '55%'}]}>
          <View style={styles.titleView}>
            <Text style={styles.title}> {showSelected ? "Selected items, click to deselect" : "Select between 3 and 7 interests"} </Text>
          </View>

          {/* <Animated.View
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={{
                transform: [{ translateX: pan.x }, { translateY: pan.y }]
              }}
              {...panResponder.panHandlers}
            >
              
              <View style={styles.box}>   */}
              
              {/* Scrollable area to view and select/deselect interests */}
              <ScrollView style={styles.scroll}>
                {/* Display interests to select if `showSelected` is false */}
                <View style={[(showSelected ? {display: 'none'} : "")]}>
                  <Interests/>
                </View>
                {/* Display selected interests if `showSelected` is true */}
                <View style={[(showSelected ? "" : {display: 'none'})]}>
                  <InterestsSelected/>
                </View>    
              </ScrollView>
              {/* </View>
              
          </Animated.View> */}
        </View>
        
        {/* Action container with 'Next' button */}
        <View style={ActionContainer.actionContainerSignUp}>
          <View style={ActionContainer.actionContainerSignUpAvoiding}>
            <NeuButton
              onPress={() => handlePress(selectedId)} width={140} height={50} color={'#EDECEC'} borderRadius={10}
            >
              <Text style={Neumorphism.neumorphismButtonText}>
                NEXT
              </Text>
            </NeuButton>  
          </View>
        </View>
        
        {/* Toggle button to show selected interests or interest selection list */}
        <View style={{position: 'absolute', left: 20, bottom: '10%'}}>
        <View style={ActionContainer.actionContainerSignUpAvoiding}>
          <NeuButton onPress={() => showSelected ? setShowSelected(false) : setShowSelected(true)} width={50} height={50} color={BACKGROUND} borderRadius={RADIUS} >
              <Icon name="bookmark" size={20} color={COLOR}/>
              <View style={styles.count}>
                  <Text style={styles.countText}>{selectedId.length}</Text>
              </View>
          </NeuButton>
        </View> 
        </View>
        
        {/* Placeholder for an additional button on the right (e.g., search button), currently commented out */}
        <View  style={{position: 'absolute', right: 20, bottom: '10%'}}>
          <View style={ActionContainer.actionContainerSignUpAvoiding}>
            {/* <NeuButton width={50} height={50} color={BACKGROUND} borderRadius={RADIUS} >
                <Icon name="search" size={20} color={COLOR} />
            </NeuButton> */}
          </View>  
        </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleView: {
    // position: 'absolute',
    // top: 0
  },
  title: {
    fontSize: 16,
    letterSpacing: 1,
    color: COLOR,
},
  scroll: {
    marginTop: 20,

  },

  interestItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginLeft: 10,
    marginTop: 15,
    backgroundColor: 'red',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,

    elevation: 1,
    
  },
  interestText:{
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    shadowColor: "#000",

  },
  row:{
    flexDirection: 'row',
    flexWrap:'wrap',
    alignItems: 'flex-start',
    width: windowWidth,
  },
  count: {
    width: 20,
    height: 20,
    backgroundColor: "#73EC70",
    borderRadius: 100,
    position: 'absolute',
    top: -10,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
},
countText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
},
});
