import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, lightGreen, Neumorphism, Container, ActionContainer, LogoContainer, TheDeal, HeroContainer, ProgressBar, Swipe as SwipeBackHint} from "../../../components/Style";
import { theDeal } from "./style";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useEffect } from 'react/cjs/react.development';
import { useContext } from 'react';



export default ({navigation}) => {
    const [shouldShow, setshouldShow] = React.useState(false);
    
    const showMore = () => {
        shouldShow ? setshouldShow(false) : setshouldShow(true)
    }
    const handlePress = () => {
        navigation.navigate('Age');
    }

    const moveUpContent = {
        from: {
            opacity: 0,
            height:'0%',
        },
        to: {
            opacity: 1,
            height:'100%'
        },
    };

    
   

    return(
        <Container>
            <View style={{position: 'absolute', top: 50, left:10, flexDirection: 'row',alignItems: 'center',}}>
                <Icon name="gesture-swipe-right" size={20} color={lightGreen} /> 
                <Text style={{color: lightGreen, fontSize:12, marginLeft: 10 ,}}>Go back </Text>
            </View>
            <Animatable.View animation={moveUpContent} duration={1000}>
                
                <View style={{position:'absolute', top:35, alignSelf: 'center', height: 65, width:65 ,alignItems: 'center', justifyContent: 'center', backgroundColor: "#FFFFFF", borderRadius: '100%'}}>
                        <Image source={require('../../../assets/calibre.png')} style={{width:50, resizeMode: "contain",}}/>       
                </View>
                <View style={HeroContainer.container}>      
                     
                    <Text style={HeroContainer.text}>What is <Text style={HeroContainer.greenText}>Calibre</Text> all about?</Text>
                </View>
                <ScrollView style={TheDeal.container} scrollEnabled={shouldShow ? true : false}>
                
                    <Text style={TheDeal.text}>
                        There is currently no awesome social digital tool. Calibre is created for ourselves and the youth at large; who shouldn’t be drawn into platforms that profits are based on an illusion of connection that is mentally draining. 
                        {"\n"}{"\n"}
                        We believe that the moments and connections that people hold dearest happens out there IRL
                        {"\n"}{"\n"}
                        {shouldShow ? (
                            <Text>
                                Our purpose is to decrease global loneliness by improving the way we connect online. We believe that friendships are an essential part of human well-being and that todays online social networking environments are eroding how people meaningfully connect. 
                                {"\n"}{"\n"}
                                In order to secure the future generations mental health a fundamental difference in how we connect in the world is needed. We intend to push the needle in this direction.
                                {"\n"}{"\n"}
                            </Text>) : null }

                        <TouchableOpacity onPress={() => showMore()}>
                            <Text style={TheDeal.textSmall}>
                                {shouldShow ? "Show less" : "Read more"}
                            </Text>
                        </TouchableOpacity>              
                    </Text>
                </ScrollView>
                <View style={[ActionContainer.actionContainerSignUp, ActionContainer.actionContainerSignUpAvoiding]}>
                        <NeuButton onPress={() => handlePress()} width={140} height={50} color={BACKGROUND} borderRadius={RADIUS}>
                            <Text style={Neumorphism.buttonText}>
                                Agreed!
                            </Text>
                        </NeuButton>
                </View>
            
            </Animatable.View>
        </Container>
    );
}
