import React, {useState, useRef, useEffect} from 'react';
import { Dimensions, Platform,Button, View, TextInput, StyleSheet, Image, Text, TouchableOpacity, PanResponder, ScrollView} from 'react-native';
import {AuthContext} from '../utils/authContext';
import * as Animatable from 'react-native-animatable';
import { NeuView, NeuInput, NeuButton } from '../components/neu-element';


import {RADIUS, COLOR, Container, Neumorphism, ActionContainer, LogoContainer, NeumorphismInput, lightGreen, darkGreen} from "../components/Style";

import Tap from '../components/tap'

export default ({ navigation, route}) => {
    const [country, setCountry] = useState(null);
    const [dialCode, setDialCode] = useState(null);

    const access_key = "TEST123";
    const serverName = require('../appSettings/db.json');

    const editProfile = (edit) => {
       console.log(route)
        navigation.navigate(edit, {
            BACKGROUND: route.params.BACKGROUND,
            user:route.params.user,
            age: route.params.age,
            city: route.params.city,
            country: route.params.country,
            dialCode: dialCode,
            email: route.params.email,
            firstName: route.params.firstName,
            gender: route.params.gender,
            lastName: route.params.lastName,
            phone: route.params.phone,
        })
    }
    const getCountry = (country) => {
        fetch(serverName.app.db + 'getCountry.php', { 
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
              "access_token": access_key,
              "ID" : country,
            })
        })
        .then((response) => response.json())
            .then((responseJson) =>{
              console.log(responseJson);
              setCountry(responseJson.country)
              setDialCode(responseJson.dialCode)
            })
            .catch((error)=>{
                console.error(error);
            });
        }

        useEffect(() => {
            getCountry(route.params.countryID)
        },[0])

        const  getAge = (dateString)=>{
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
    return(

        <Container style={{backgroundColor: route.params.BACKGROUND}}>
            <ScrollView contentContainerStyle={styles.scroll}>

                <View style={styles.row}>
                    <View  style={styles.column}>
                        <Text>Name</Text>
                    </View>
                    <View style={[styles.column, styles.columnEdit]}>
                        <Text onPress={() => editProfile("editName")} style={styles.columnEditText}>{route.params.firstName || route.params.phone ?  route.params.firstName+ " " + route.params.lastName : "Add name"}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View  style={styles.column}>
                        <Text>E-mail</Text>
                    </View>
                    <View style={[styles.column, styles.columnEdit]}>
                        <Text onPress={() => editProfile("editEmail")} style={styles.columnEditText}>{route.params.email ? route.params.email : "Add e-mail"}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View  style={styles.column}>
                        <Text>Phone</Text>
                    </View>
                    <View style={[styles.column, styles.columnEdit]}>
                        <Text onPress={() => editProfile("editPhone")} style={styles.columnEditText}>{route.params.phone ? "+"+ dialCode+ " " + route.params.phone : "Add phone number"}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View  style={styles.column}>
                        <Text>Password</Text>
                    </View>
                    <View style={[styles.column, styles.columnEdit]}>
                        <Text onPress={() => editProfile("editPassword")} style={styles.columnEditText}>Change password</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View  style={styles.column}>
                        <Text>City, Country</Text>
                    </View>
                    <View style={[styles.column, styles.columnEdit]}>
                        <Text onPress={() => editProfile("editCity")} style={styles.columnEditText}>{route.params.city ? (route.params.city+ ", ")  : "Add your city"} {country && route.params.city ? country : null}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View  style={styles.column}>
                        <Text>Gender</Text>
                    </View>
                    <View style={[styles.column, styles.columnEdit]}>
                        <Text onPress={() => editProfile("editGender")} style={[styles.columnEditText, {textTransform: 'capitalize'}]}>{route.params.gender ? route.params.gender : "Add your gender"}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View  style={styles.column}>
                        <Text>b-day, age</Text>
                    </View>
                    <View style={[styles.column, styles.columnEdit]}>
                        <Text onPress={() => editProfile("editAge")} style={styles.columnEditText}>{route.params.age? route.params.age + ", " + getAge(route.params.age) + " years" : "Add your age"}</Text>
                    </View>
                </View>
               
            </ScrollView>
        </Container>

    );
}

const styles = StyleSheet.create({
    scroll: {
        position: 'absolute',
        top: 10,left:0,
        width: '100%',
        alignItems: 'center',
    },
    row: {
        width: '80%',height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    column: {
        padding: 10,
        borderBottomWidth: 1,
    },
    columnEdit: {
        borderLeftWidth: 1,
        flexGrow: 1,
    },
    columnEditText: {
        color: darkGreen,
        textDecorationLine: 'underline',
    }
})
