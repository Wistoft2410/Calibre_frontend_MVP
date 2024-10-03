import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, Neumorphism, Container, ActionContainer, LogoContainer, TheDeal, HeroContainer, ProgressBar} from "../../../components/Style";
import { theDeal } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome'; 
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

    const moveUpLogo = {
        from: { 
            height:'100%',
            opacity: 1,
        },
        to: {
            height:'0%',
            opacity: 0,
        },
    };
    
   

    return(
        <Container>
            <Animatable.View animation={moveUpLogo}  style={theDeal.logoContainer} >
                <Image
                    style={theDeal.logo}
                    source={require('../../../assets/calibre.png')}
                />
            </Animatable.View>
            <Animatable.View animation={moveUpContent} duration={1000} delay={500}>
                
                <View style={HeroContainer.container}>              
                    <Text style={HeroContainer.text}>What is <Text style={HeroContainer.greenText}>Calibre</Text> all about?</Text>
                </View>
                <ScrollView style={TheDeal.container} scrollEnabled={shouldShow ? true : false}>
                
                    <Text style={TheDeal.text}>
                        For a long time now, being social on the internet literally ment having to sell yourself.
                        {"\n"}{"\n"}
                        We believe that personal data is a fundamental human right and that is why we’ve chosen to stay out of the indstry.
                        {"\n"}{"\n"}
                        It is time to responsibly rethink what it means to be social on the internet.
                        {"\n"}{"\n"}
                        {shouldShow ? (
                            <Text>
                                For a long time now, being social on the internet literally ment having to sell yourself.
                                {"\n"}{"\n"}
                                We believe that personal data is a fundamental human right and that is why we’ve chosen to stay out of the indstry.
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
                                I'm in!
                            </Text>
                        </NeuButton>
                </View>
            
            </Animatable.View>
            {/* <Animatable.View animation={moveUpContent} duration={1000} delay={500} style={theDeal.contentsContainer}>
                    <View style={theDeal.heroContainer}>
                        <Text style={theDeal.hero}>
                            § HERE'S THE DEAL
                        </Text>
                    </View>
                    <ScrollView style={theDeal.textContainer}>
                        <Text style={[theDeal.text, theDeal.black]}>
                            For a long time now, being social on the internet literally ment having to sell yourself.
                        </Text>
                        <Text style={[theDeal.text, theDeal.black]}>
                            We believe that personal data is a fundamental human right and that is why we've chosen to stay out of the industry. 
                        </Text>
                        <Text style={[theDeal.text, theDeal.green]}>
                            By doing social right. 
                        </Text>
                        <Text style={[theDeal.text, theDeal.black]}>
                            At <Text style={theDeal.green}>Bonjour</Text>, we believe that the feeling of having creative and meaningful relationships with another human and being a part of a greater community is incomparable with anything else in life. 
                        </Text>
                        <Text style={[theDeal.text, theDeal.black]}>
                            We believe that it is time to responsibly <Text style={theDeal.green}>rethink</Text>  what it means to use the internet to be social.
                        </Text>
                        
                        
                        
                        
                        <View style={theDeal.actionContainer}>
                        <TouchableOpacity 
                            style={theDeal.action}
                            onPress={() => handlePress()}
                        >
                           
                            <Text style={theDeal.actionText}>
                                <Icon name="heart" size={35} color="#00E864" />
                            </Text>
                        </TouchableOpacity> 
                    </View>
                    </ScrollView>
                    
            </Animatable.View> */}
        </Container>
    );
}
