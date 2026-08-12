import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, ScrollView, FlatList, SafeAreaView, } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown} from "../../../components/Style";

import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import Icon from 'react-native-vector-icons/FontAwesome';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DATA = [
    {
        key: '0',
        id: "1",
        title: "First Item",
        color: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "red",
    },
    {
        key: '1',
        id: "2",
        title: "Second Item",
        color : "rgba(0, 0, 0, 0.8)",
        backgroundColor: "green",
    },
    {
        key: '2',
        id: "3",
        title: "Third Item",
        color : "rgba(255, 255, 255, 0.8)",
        backgroundColor: "blue",
    },
    {
        key: '3',
        id: "4",
        title: "Fourth Item",
        color : "rgba(0, 0, 0, 0.8)",
        backgroundColor: "green",
    },
    
    
  ];

const Item = ({ item, onPress, display, textColor, backgroundColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, display, backgroundColor]}>
        <Text style={[styles.itemTitle, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);
  

export default ({ navigation, route }) => {
    const [selectedId, setSelectedId] = useState([]);
    const [itemCount, setItemCount] = useState(0);
    const [showSelected, setShowSelected] = useState(false);
    
    
    const selectItem = (id) => {
        console.log(selectedId.length)
        if(selectedId.length < 7){
            setSelectedId([
                ...selectedId,
                id
            ])
        }else{
            alert("No more")
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

    const renderItem = ({ item }) => {

      return (
        <Item
          item={item}
          onPress={() => selectItem(item.id)}
          display={( checkItem(item.id) ? {display: 'none'} : "")}
          textColor={{color: item.color}}
          backgroundColor={{backgroundColor: item.backgroundColor}}
        />
      );
    };

    const renderItemSelected = ({ item }) => {
       
      return (
        <Item
          item={item}
          onPress={() => deSelectItem(item.id)}
          display={(checkItem(item.id) ? "" : {display: 'none'})}
          textColor={{color: item.color}}
          backgroundColor={{backgroundColor: item.backgroundColor}}
        />
      );
    };

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
            <View style={[NeumorphismInput.container, {height: '55%', justifyContent: 'flex-start', overflow:'hidden'}]}>
                <View>
                    <Text style={styles.title}> {showSelected ? "Selected items, click to deselect" : "Select minimum 3 and up to 7 things"} </Text>
                </View>
                <View style={[(showSelected ? {display: 'none'} : "")]}>
                    <FlatList
                        columnWrapperStyle={{flexWrap: "wrap"}}
                        numColumns={3}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={[selectedId]}
                    />
                </View>
                <View style={[(showSelected ? "" : {display: 'none'})]}>
                    <FlatList
                        columnWrapperStyle={{flexWrap: "wrap"}}
                        numColumns={2}
                        data={DATA}
                        renderItem={renderItemSelected}
                        keyExtractor={(item) => item.id}
                        extraData={[selectedId]}
                    />
                </View>
            </View>

            <View style={ActionContainer.actionContainerSignUp}>
            <View style={ActionContainer.actionContainerSignUpAvoiding}>
                <NeuButton
                onPress={() => handlePress()} width={140} height={50} color={'#EDECEC'} borderRadius={10}
                >
                <Text style={Neumorphism.neumorphismButtonText}>
                    DONE
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
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        letterSpacing: 1,
        lineHeight: 24,
        color: COLOR,
    },
    
    item: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "gray",
        borderRadius: 10,
        alignItems: 'center'
    },
    itemTtitle: {
        fontSize: 12,
        letterSpacing: 1,
        lineHeight: 24,
        color: COLOR,
    },
    count: {
        width: 15,
        height: 15,
        backgroundColor: "#73EC70",
        borderRadius: 100,
        position: 'absolute',
        top: -5,
        right: -5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        fontSize: 10,
        color: COLOR,
    },
  });