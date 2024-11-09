import React, { useRef, useState, useEffect } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Keyboard, TouchableWithoutFeedback, ScrollView, Vibration } from "react-native";
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Emoji from 'react-native-emoji';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Haptics from 'expo-haptics';

import { signUp } from "./style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import { BACKGROUND, RADIUS, COLOR, Neumorphism, NeumorphismInput, Container, ActionContainer, HeroContainer, ProgressBar } from "../../../components/Style";

import { Dimensions } from 'react-native';

// Set window dimensions for responsive styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {
  
  // Hardcoded interests data
  const DATA = [
    { ID: 1, interest: "Sports", color: "#FFFFFF", bgColor: "#FF5733", interestsEmoji: "🏀" },
    { ID: 2, interest: "Music", color: "#FFFFFF", bgColor: "#33FF57", interestsEmoji: "🎵" },
    { ID: 3, interest: "Travel", color: "#FFFFFF", bgColor: "#3357FF", interestsEmoji: "✈️" },
    { ID: 4, interest: "Cooking", color: "#FFFFFF", bgColor: "#FF33A1", interestsEmoji: "🍳" },
    { ID: 5, interest: "Reading", color: "#FFFFFF", bgColor: "#FF33D4", interestsEmoji: "📚" },
    { ID: 6, interest: "Gaming", color: "#FFFFFF", bgColor: "#33FFD4", interestsEmoji: "🎮" },
    { ID: 7, interest: "Photography", color: "#FFFFFF", bgColor: "#FFD433", interestsEmoji: "📷" },
    { ID: 8, interest: "Art", color: "#FFFFFF", bgColor: "#FF33B5", interestsEmoji: "🎨" },
  ];

  // States to manage selected interests and toggle between views
  const [selectedId, setSelectedId] = useState([]);
  const [showSelected, setShowSelected] = useState(false);

  // Navigate to the next page with selected interests and user info
  const nextPage = (chosenInterests) => {
    console.log("\nBday: " + route.params.bday);
    console.log("Email: " + route.params.email);
    console.log("Name: " + route.params.firstname + " " + route.params.lastname);
    console.log("Language: " + route.params.countryLanguage);
    console.log("Country: " + route.params.country);
    console.log("City: " + route.params.city);
    console.log("City lat: " + route.params.cityLat);
    console.log("City lng: " + route.params.cityLng);
    console.log("interests:" + chosenInterests);

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
    if (items.length < 3) {
      alert("Please select a minimum of 3 interests, you have only selected " + items.length + " interests");
    } else {
      nextPage(items);
    }
  }

  // Select an interest if not already selected, up to a max of 7
  const selectItem = (id) => {
    if (!checkItem(id)) {
      if (selectedId.length < 7) {
        setSelectedId([...selectedId, id]);
      } else {
        alert("You have already selected seven interests");
      }
    }
  }

  // Check if an item is already selected
  const checkItem = (id) => {
    return selectedId.includes(id);
  };

  // Deselect an item by removing it from the selected array
  const deSelectItem = (id) => {
    setSelectedId(selectedId.filter(sID => sID !== id));
  }

  // Render list of selectable interests
  const Interests = () => {
    return (
      <View style={styles.row}>
        {DATA.map(item => (
          <Interest id={item.ID} name={item.interest} key={item.ID} color={item.color} backgroundColor={item.bgColor} emoji={item.interestsEmoji} />
        ))}
      </View>
    );
  }

  // Individual Interest component for each selectable interest
  const Interest = (props) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() => { Haptics.selectionAsync(); checkItem(props.id) ? deSelectItem(props.id) : selectItem(props.id) }}>
          <View style={[styles.interestItem, { backgroundColor: props.backgroundColor }, (checkItem(props.id) ? { paddingVertical: 12 } : { shadowOpacity: 0 })]}>
            <Text style={[styles.interestText, { color: props.color }, (checkItem(props.id) ? { fontSize: 16 } : "")]}>
              {props.name}
              <Emoji name={props.emoji} style={{ fontSize: 12 }} />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // Animation settings
  const fadeIn = { from: { opacity: 0 }, to: { opacity: 1 } };
  const progress = { from: { width: '63%' }, to: { width: '79%' } };

  // Main component return
  return (
    <Container>
      {/* Progress bar animation */}
      <View style={ProgressBar.progressBar}>
        <Animatable.View animation={progress} style={ProgressBar.progress}></Animatable.View>
      </View>

      {/* Title and animated heading */}
      <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>
        <Text style={HeroContainer.text}>What is your <Text style={HeroContainer.greenText}>interest</Text>?</Text>
      </Animatable.View>

      {/* Interests selection container */}
      <View style={[NeumorphismInput.container, { height: '55%' }]}>
        <View style={styles.titleView}>
          <Text style={styles.title}> {showSelected ? "Selected items, click to deselect" : "Select between 3 and 7 interests"} </Text>
        </View>

        {/* Scrollable area to view and select/deselect interests */}
        <ScrollView style={styles.scroll}>
          {/* Display interests to select */}
          <Interests />
        </ScrollView>
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
      <View style={{ position: 'absolute', left: 20, bottom: '10%' }}>
        <View style={ActionContainer.actionContainerSignUpAvoiding}>
          <NeuButton onPress={() => setShowSelected(!showSelected)} width={50} height={50} color={BACKGROUND} borderRadius={RADIUS}>
            <Icon name="bookmark" size={20} color={COLOR} />
            <View style={styles.count}>
              <Text style={styles.countText}>{selectedId.length}</Text>
            </View>
          </NeuButton>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleView: {},
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
  interestText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    shadowColor: "#000",
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
