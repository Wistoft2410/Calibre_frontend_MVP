// tilføj top tre picks til display. De første tre der vælges vil komme op på skærmen som top picks. Senere vil man kunne ændre dem under ens profil
// Der kan tilføjes så mange intereser som man ønsker, men man kan kun vælge op til syv som bliver vist når andre ser ens profil. Alle intereser vil stadig tælle med i matching algortimen
import React, { useRef, useState, useEffect } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Keyboard, TouchableWithoutFeedback, ScrollView} from "react-native";
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { set } from "react-native-reanimated";
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import Icon from 'react-native-vector-icons/FontAwesome';

import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {
  

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
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
        pan.flattenOffset();
      }
    })
  ).current;


const access_key = "TEST123";

const nextPage = (chosenThings) => {
    console.log("\nBday: "+route.params.bday)
    console.log("Gender: "+ route.params.gender)
    console.log("Name: "+ route.params.firstname + " " + route.params.lastname)
    console.log("Language: "+ route.params.language)
    console.log("Country: "+ route.params.country)
    console.log("City: "+ route.params.city)
    console.log("City lat: "+ route.params.cityLat)
    console.log("City lng :"+ route.params.cityLng)
    console.log("Email: "+ route.params.email)
    console.log("Pass: "+ route.params.password)
    console.log("Under education: "+ route.params.underEducation)
    console.log("Education level: "+ route.params.educationLevel)
    console.log("School: "+ route.params.school)
    console.log("School ID: "+ route.params.schoolID)
    console.log("Job status: " + route.params.jobStatus)
    console.log("Job: "+ route.params.job)
    console.log("Job ID: "+ route.params.jobID)
    console.log("Employer: " + route.params.employer)
    console.log("Things: "+ chosenThings)

  navigation.navigate('Photo', {
    bday: route.params.bday,
    gender: route.params.gender,
    firstname: route.params.firstname,
    lastname: route.params.lastname,
    language: route.params.language,
    country: route.params.country,
    city: route.params.city,
    cityLat: route.params.cityLat,
    cityLng: route.params.cityLng,
    email: route.params.email,
    password: route.params.password,
    underEducation: route.params.underEducation,
    educationLevel: route.params.educationLevel,
    school: route.params.school,
    schoolID: route.params.schoolID,
    jobStatus: route.params.jobStatus,
    job: route.params.job,
    jobID: route.params.jobID,
    employer: route.params.employer,
    things: chosenThings,
  });
}


const handlePress = (items) => {
  if(items.length < 3){
    alert("Please select a minimum of 3 interests, you have only selected "+ items.length +" interests")
  }else{
    nextPage(items);
  }
}


// const DATA = [
//   {
//       key: '0',
//       id: "1",
//       title: "First Item",
//       color: "rgba(255, 255, 255, 0.8)",
//       backgroundColor: "red",
//       emoji: ":soccer:",
//   },
//   {
//       key: '1',
//       id: "2",
//       title: "Second Item",
//       color : "rgba(0, 0, 0, 0.8)",
//       backgroundColor: "green",
//       emoji: ":basketball:",
//   },
//   {
//       key: '2',
//       id: "3",
//       title: "Third Item",
//       color : "rgba(255, 255, 255, 0.8)",
//       backgroundColor: "blue",
//       emoji: ":t-rex:",
//   },
//   {
//       key: '3',
//       id: "4",
//       title: "Fourth Item",
//       color : "rgba(0, 0, 0, 0.8)",
//       backgroundColor: "green",
//       emoji: ":walking:",
//   },
  
  
// ];



const [selectedId, setSelectedId] = useState([]);

const [DATA, setDATA] = useState([]);
const [showSelected, setShowSelected] = useState(false);

 


const serverName = require('./appSettings/db.json');

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
          
        })
        .catch((error)=>{
            console.error(error);
        });
    }
 
    useEffect(() => {fetchData()},[])
    
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
  
  const checkItem =  (id) => {
    let valid = false;
    selectedId.map(sID => {
        if(sID === id){
            valid = true;
        }
    })
    return valid
  };

  const deSelectItem = (id) => {
    let selected = []
    selectedId.map(sID => {
        selected.push(sID)
    })
    let index = selected.indexOf(id)
    selected.splice(index, 1)
    setSelectedId(selected)
 }

 
  const Things = () => { 

      return(
            <View style={styles.row}>
              {DATA.map(item => {
                  // return <Thing id={index} name={value} key={index} emoji={elementsEmoji[index]}></Thing>
                    return <Thing id={item.ID} name={item.interest} key={item.ID} color={item.color} backgroundColor={item.bgColor} emoji={item.interestsEmoji}></Thing>
                keyNum++;
              })}
            </View>
        );   
  }

  const ThingsSelected = () => {  
  return(
    <View style={styles.row}>
      {DATA.map(item => {
          // return <Thing id={index} name={value} key={index} emoji={elementsEmoji[index]}></Thing>
            return <ThingSelected id={item.ID} name={item.interest} key={item.ID} color={item.color} backgroundColor={item.bgColor} emoji={item.interestsEmoji}></ThingSelected>
      })}
    </View>
  );   
}

  
  const Thing = (props) => {

    const ref = React.useRef();

    const [bgColor, setbgColor] = React.useState(false);
    
    return(
        <View>
          <TouchableOpacity onPress={() => { checkItem(props.id) ? deSelectItem(props.id) : selectItem(props.id)}}  >
            <View style={[styles.thingItem, {backgroundColor: props.backgroundColor}, (checkItem(props.id) ? {borderWidth: 2, borderColor: "#73EC70"} : "")]}  ref={ref} >         
              <Text style={[styles.thingText, {color: props.color}, checkItem(props.id) ? {color :"#73EC70"} : ""]}>
                {props.name} 
                <Emoji name={props.emoji} style={{fontSize: 12}} />  
              </Text>             
            </View>
          </TouchableOpacity>
        </View>
      
      );
  }
  
  const ThingSelected = (props) => {

    const ref = React.useRef();

    const [bgColor, setbgColor] = React.useState(false);
    
    return(
        <View style={(checkItem(props.id) ? "" : {display: 'none'})}>
          <TouchableOpacity onPress={() => {deSelectItem(props.id)}}  >
            <View style={[styles.thingItem, {backgroundColor: props.backgroundColor, borderWidth: 2, borderColor: "#73EC70"}]}  ref={ref} >         
              <Text style={[styles.thingText, {color: "#73EC70"}]}>
                {props.name} 
                <Emoji name={props.emoji} style={{fontSize: 12}} /> 
              </Text>             
            </View>
          </TouchableOpacity>
        </View>
      
      );
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
      width: '81%',
    },
    to:{
      width: '90%',
    }
  };
  return (
    <Container >
        <NeuView style={ProgressBar.progressBar} color={BACKGROUND} borderRadius={RADIUS} width={windowWidth-80} height={15}>
          <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
        </NeuView>

        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>thing</Text>?</Text>
        </Animatable.View>

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

              <ScrollView style={styles.scroll}>
                <View style={[(showSelected ? {display: 'none'} : "")]}>
                  <Things/>
                </View>
                <View style={[(showSelected ? "" : {display: 'none'})]}>
                  <ThingsSelected/>
                </View>    
              </ScrollView>
              {/* </View>
              
          </Animated.View> */}
        </View>

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
        <View  style={{position: 'absolute', right: 20, bottom: '10%'}}>
          <View style={ActionContainer.actionContainerSignUpAvoiding}>
            {/* <NeuButton width={50} height={50} color={BACKGROUND} borderRadius={RADIUS} >
                <Icon name="search" size={20} color={COLOR} />
            </NeuButton> */}
          </View>  
        </View>
    </Container>

    // <View style={signUp.container}>
    //     <View style={signUp.heroContainer}>
    //           <Animatable.Text style={[signUp.hero,{marginTop: '10%',}]} animation={fadeIn} iterationDelay={250}>
    //             WHAT'S YOUR <Text style={signUp.lightGreen}>THING?</Text>
    //           </Animatable.Text>
    //     </View>
        
         
    //       <View style={[signUp.contentsContainer, {height:"55%",overflow:'hidden'}]}>
     
          // <Animated.View
          //   style={{
          //     transform: [{ translateX: pan.x }, { translateY: pan.y }]
          //   }}
          //   {...panResponder.panHandlers}
          // >
          //   <View style={styles.box}>              
          //       <Things/>
          //   </View>
          // </Animated.View>
        
    //   </View>
    //   <View style={signUp.actionContainer}>
    //     <TouchableOpacity 
    //       style={signUp.action}
    //       onPress={() => handlePress()}
    //         >
    //       <Text style={signUp.actionText}>
    //         CONTINUE 
    //       </Text>
    //     </TouchableOpacity> 
    //   </View>
      
    // </View>
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
  box: {
    backgroundColor: "transparent",
    borderRadius: 5,
    zIndex: 99,
    padding:40,
  },
  thingItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: 'red',
    borderWidth : 2,
    borderColor: BACKGROUND,
    
  },
  thingText:{
    fontSize: 10,
    fontWeight: 'bold',
    // textTransform: 'uppercase',
    letterSpacing: 1,
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
    fontSize: 10,
    color: COLOR,
},
});
