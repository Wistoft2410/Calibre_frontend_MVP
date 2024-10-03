import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, Text, StatusBar, Button, TouchableOpacity, Image, FlatList, ScrollView, TextInput} from 'react-native';
import {AuthContext} from '../utils/authContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // https://oblador.github.io/react-native-vector-icons/
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';



import { QR } from '../components/QRcode';

import { NeuView, NeuInput, NeuButton } from '../components/neu-element';
import {darkGreen, lightGreen, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown, LogoContainer} from "../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth-windowWidth/12;
const neuHeight = windowHeight-windowWidth/1.5;





  
  const Messages = props => {
    const {
        openMessage,
        BACKGROUND,
        ...rest
      } = props;

    

    const Item = ({ name, last, email, lastMessage, photoUri, lastMessageFrom, lastMessageSeen, lastActive}) => (
    
        <NeuView style={styles.messages} color={BACKGROUND} width={windowWidth-80} height={80} borderRadius={30}>
        
            <View style={styles.profilePhotoContainer}>
                    {photoUri ? (
                            <Image
                                style={styles.profilePhoto}
                                source={{uri : serverName.app.db+"images/"+ photoUri}}
                              />
                            ):(
                              <Image
                                style={[styles.profilePhoto, {backgroundColor: "#fff", width: '100%', height: '100%'}]}
                                source={require('../assets/calibre.png')}
                              />
                          )}
            </View>
            <Text style={styles.profileName}>{name + " " + last}</Text>  
            <Text style={styles.profileEmail}>{email}</Text>  

            {/* <Text style={[styles.lastMessage, (lastMessageFrom ? {opacity: .4} : "")]} >{lastMessage}</Text>    
            {lastMessageSeen ?
            (null):
                (
                    <View style={styles.notSeen}></View> 
                )
            }
            {lastActive == "short" ? (
                <View style={[styles.lastActive, styles.lastActiveShort]}></View>)
            : (lastActive == "medium" ? (
                <View style={[styles.lastActive, styles.lastActiveMedium]}></View>
            ) : (
                <View style={[styles.lastActive, styles.lastActiveLong]}></View>
            ))
            } */}
        </NeuView>
  );
  
  
  
   
      


    
    const [userID, setUserID] = React.useState();
    const [keyword, setKeyword] = React.useState();
    const [countryList, setCountryList] = useState();
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [dataDefault, setDataDefault] = useState([]);
    const [allDataDefault, setAllDataDefault] = useState([]);
    const [mesType, setMesType] = useState("u");
    const [website, setWebsite] = useState("latestMes");
    


   
    const access_key = "TEST123";

    const serverName = require('../appSettings/db.json');

const fetchData = (user) => {

    fetch(serverName.app.db + 'latestMes.php', { 
        method: 'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
          "access_token": access_key,
           "user": user,
        })
    })
    .then((response) => response.json())
        .then((responseJson) =>{
          setData(responseJson); 
          setDataDefault(responseJson); 
            console.log(responseJson)
        })
        .catch((error)=>{
            console.error(error);
        });
    }
const fetchAllData = (user) => {

    fetch(serverName.app.db +'allmes.php', { 
        method: 'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            "access_token": access_key,
            "user": user,
        })
    })
    .then((response) => response.json())
        .then((responseJson) =>{
            setAllData(responseJson); 
            setAllDataDefault(responseJson); 
            // console.log(responseJson)
        })
        .catch((error)=>{
            console.error(error);
        });
    }
 
    const retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('@user_Token');
          if (value !== null) {
           return value;
           
          }
        } catch (error) {
          // Error retrieving data
        }
      };
      
      
      const getUser = async() =>{
        const user = await retrieveData();
        setUserID(user)
        return user;
    }

const getData = async() => {
     const user = await getUser();
     fetchData(user);
     fetchAllData(user);
}
    useEffect(() => {
        getData()
        const interval = setInterval(() => {
            getData();
          }, 5000);
    
          return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    
    },[])
      
    const updateInput = async (input) => {

        const filtered = dataDefault.filter(user => {
         return user.userToFirstName.toLowerCase().includes(input.toLowerCase())
        })
        setKeyword(input);
        setData(filtered);
    }
    const updateAllInput = async (input) => {

        const filtered = allDataDefault.filter(user => {
         return user.userToFirstName.toLowerCase().includes(input.toLowerCase())

        })
        setKeyword(input);
        setAllData(filtered);
    }
      const MessagesList = () => (

        <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
            {data == "No links found" ? (
                    <View style={{flex:1, alignItems: 'center', marginTop: 40,}}>
                        <Text style={{fontSize: 18, fontWeight: '300'}} >You have no links</Text>
                    </View>
            ) : (  
                data == "" ? (
                    <View style={{flex:1, alignItems: 'center', marginTop: 40,}}>
                        <Text style={{fontSize: 18, fontWeight: '300'}} >There are no useres with this name</Text>
                    </View>
                ): (
                    data == undefined ? (
                        <View style={{flex:1, alignItems: 'center', marginTop: 40,}}>
                            <Text style={{fontSize: 18, fontWeight: '300'}} >Connecting to the server...</Text>
                        </View>
                    ):( 
                        data.map((item) => {
                            return (
                                <TouchableOpacity key={item.userTo} onPress={() => openMessage(item.user, item.userToFirstName, item.userTo, item.profileImage)}>
                                    <Item   name={item.userToFirstName} last={item.userToLastName}  email={item.userToEmail} photoUri={item.profileImage}  />
                                </TouchableOpacity>
                            )
                        })
                    )
                )
            )}
        </View>
      );
      const AllMessagesList = () => (

        <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
            {data == "No links found" ? (
                    <View style={{flex:1, alignItems: 'center', marginTop: 40,}}>
                        <Text style={{fontSize: 18, fontWeight: '300'}} >You have no links</Text>
                    </View>
            ) : (  
                data == "" ? (
                    <View style={{flex:1, alignItems: 'center', marginTop: 40,}}>
                        <Text style={{fontSize: 18, fontWeight: '300'}} >There are no useres with this name</Text>
                    </View>
                ): (
                    data == undefined ? (
                        <View style={{flex:1, alignItems: 'center', marginTop: 40,}}>
                            <Text style={{fontSize: 18, fontWeight: '300'}} >Connecting to the server...</Text>
                        </View>
                    ):( 
                        allData.map((item) => {
                            return (
                                <TouchableOpacity key={item.userTo} onPress={() => openMessage(item.user, item.userToFirstName, item.userTo, item.profileImage)}>
                                    <Item   name={item.userToFirstName} last={item.userToLastName} email={item.userToEmail} photoUri={item.profileImage}  />
                                </TouchableOpacity>
                            )
                        })
                    )
                )
            )}
        </View>
      );
    //   lastMessage={item.lastMessage}  lastMessageFrom={item.lastMessageFrom} lastMessageSeen={item.lastMessageSeen} lastActive={item.lastActive}

      

    

    return(
            
        <View style={styles.container}>
            {website == "latestMes" ? (
                        <NeuInput
                            color={BACKGROUND}
                            width={windowWidth-80} height={50} borderRadius={30} 
                            value={keyword}
                            placeholder={"Search users"}
                            onChangeText={(value) => {updateInput(value);}}
                        />
                    ): (
                        <NeuInput
                            color={BACKGROUND}
                            width={windowWidth-80} height={50} borderRadius={30} 
                            value={keyword}
                            placeholder={"Search users"}
                            onChangeText={(value) => {updateInput(value);}}
                        />
                    )
                    }
                <View style={{top: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button 
                        onPress={() =>{setKeyword(""); mesType == "u" ? setMesType("g") : setMesType("u")}} 
                        title={mesType == "u" ? "Users" : "Groups"}>
                    </Button>
                    {
                        mesType == "g" ? null : 
                        (
                            <Button 
                                onPress={() =>{setKeyword("");website == "latestMes" ? setWebsite("allmes") : setWebsite("latestMes")}} 
                                title={website == "latestMes" ? "Latest messages" : "All users"}> 
                            </Button>
                        )
                    }
                </View>
                <ScrollView style={styles.messagesList}>
                    {
                        mesType == "g" ? null : 
                        (
                            website == "latestMes" ? (
                                <MessagesList/>
                            ): (
                                <AllMessagesList/>
                            )
                        )
                    }
                </ScrollView>
               
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:15,
        alignItems: 'center',
    },
    messagesList: {
        marginTop: 5,
        width: '100%',
        height: '70%',
    },
    messages: {
        marginTop: 20,
    },
    profilePhotoContainer: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        height: 60, width: 60,
        borderRadius: 100,
        backgroundColor: '#000',
        overflow: 'hidden',
    },
    profilePhoto: {
        height: 60,
        resizeMode: 'contain',
    },
    profileName:{
        position: 'absolute',
        top: 20,
        left: 80,
        fontSize: 18,
        fontWeight: 'bold',

    },
    profileEmail:{
        position: 'absolute',
        top: 45,
        left: 80,
        fontSize: 8,
        fontWeight: 'bold',
    },
    lastMessage: {
        position: 'absolute',
        top: 45,
        left: 80,
    },
    notSeen: {
        width: 15, height: 15,
        backgroundColor: '#094527',
        borderRadius: 15,
        position: 'absolute',
        right: 15,
        top: 80/2-15/2,
    },
    lastActive: {
        width: 15, height: 15,
        borderRadius: 15,
        position: 'absolute',
        left: 10,
        top: 10,
    },
    lastActiveShort: {
        backgroundColor: lightGreen,
    },
    lastActiveMedium: {
        backgroundColor: 'yellow',
    },
    lastActiveLong: {
        backgroundColor: 'red',
    },

  });

  Messages.propTypes = {
    openMessage: PropTypes.func,
    BACKGROUND: PropTypes.string,
    ...Messages.propTypes
};
export default Messages;