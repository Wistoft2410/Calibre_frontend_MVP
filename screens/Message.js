import React, { useState, useCallback, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View, Text, StatusBar, Button, TouchableOpacity, Image, FlatList, SafeAreaView, KeyboardAvoidingView, Pressable} from 'react-native';
import { GiftedChat, InputToolbar, Bubble, Send } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {darkGreen, lightGreen, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown, LogoContainer} from "../components/Style";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Emoji from 'react-native-emoji';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';



import Footer from '../components/footer';
import UserCard from './userCard';
export default ({ navigation, route }) => {

// UserCard

    const [secondUserID, setSecondUserID] = React.useState();
    const [secondUserFirstName, setSecondUserFirstName] = React.useState();
    const [secondUserLastName, setSecondUserLastName] = React.useState();
    const [age, setAge] = React.useState();
    const [city, setCity] = React.useState();
    const [email, setEmail] = React.useState();
    const [gender, setGender] = React.useState();
    const [phone, setPhone] = React.useState();
    const [countryID, setCountryID] = React.useState();
    const [profileImage, setProfileImage] = React.useState();
    const [description, setDescription] = React.useState();
    const [iceBreaker, setIceBreaker] = React.useState(["hej", "med"]);


// get information about user
const fetchSecondUser = (user) => {
  console.log(user)
  fetch(serverName.app.db + 'getUserInfo.php', { 
      method: 'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
      body:JSON.stringify({
        "access_token": access_key,
         "user": user,
         "type": "ID"

      })
  })
  .then((response) => response.json())
      .then((responseJson) =>{
        console.log("Response from web:")
            console.log(responseJson)
            setSecondUserID(responseJson.ID)
            setSecondUserFirstName(responseJson.firstName)
            setSecondUserLastName(responseJson.lastName)
            setAge(responseJson.age)
            setCity(responseJson.city)
            setEmail(responseJson.email)
            setGender(responseJson.gender)
            setPhone(responseJson.phone)
            setCountryID(responseJson.countryID)
            setProfileImage(responseJson.profileImage)
            setDescription(responseJson.description)
      })
      .catch((error)=>{
          console.error(error);
      });
  }

  // async function to make sure that the data is retrieved
  const getSeconUser = async() => {
    console.log(route.params.userTo)
    await fetchSecondUser(route.params.userTo);
  }

  

  // Footer
  const open = () =>{
    setUserCard(false)
  }
  //  Message
    const [messages, setMessages] = useState([]);
    const [interests, setInterests] = useState([]);
    const [count, setCount] = useState(0);
    const [userCard, setUserCard] = useState(false);

    const serverName = require('../appSettings/db.json');

    const access_key = "TEST123";

    const fetchData = () => {
          fetch(serverName.app.db + 'message.php', { 
              method: 'post',
              header:{
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
              },
              body:JSON.stringify({
                "access_token": access_key,
                 "userFromID": route.params.user,
                 "userToID" : route.params.userTo
              })
          })
          .then((response) => response.json())
              .then((responseJson) =>{
                const result = responseJson
                
                if(responseJson != "No messages found"){
                  setMessages([])
                  result.map((response) => {
                    if(response.from_user_id == route.params.user){
                      setMessages(old => [...old, {
                        _id : response.id, 
                        text : response.message,
                        createdAt: response.date_sent,
                        user: {
                          _id : route.params.user,
                          name: "User"
                        }
                      }])
                    }else{
                      setMessages(old => [...old, {
                        _id : response.id,
                        text : response.message,
                        createdAt: response.date_sent,
                        user: {
                          _id : response.from_user_id,
                          name: route.params.userToName,
                          avatar: serverName.app.db+"images/"+route.params.photoUri+"?"+Date()
                        }
                      }])
                    }

                  })
                }else{
                  setMessages([])
                  console.log(result); 
                }
              })
              .catch((error)=>{
                  console.error(error);
              });
          }
    const sendData = (user, userTo, mes, message) => {
          fetch(serverName.app.db + 'sendMes.php', { 
              method: 'post',
              header:{
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
              },
              body:JSON.stringify({
                "access_token": access_key,
                 "userFromID": user,
                 "userToID" : userTo,
                 "mes" : mes,
              })
          })
          .then((response) => response.json())
              .then((responseJson) =>{

              })
              .catch((error)=>{
                  console.error(error);
              });
          }
      const getData = async() => {
        await fetchData();
        
       }

      
       const fetchInfo = (user) => {
        fetch(serverName.app.db + 'getUserInterests.php', { 
            method: 'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
              "access_token": access_key,
               "user" : user,
            })
        })
        .then((response) => response.json())
            .then((responseJson) =>{
              console.log(responseJson);
              setInterests(responseJson)
            })
            .catch((error)=>{
                console.error(error);
            });
        }
      const getInfo = async() => {
        await fetchInfo(route.params.userTo);
        
       }
      

  

  useEffect(() => {
      getInfo()
      getData();
      getSeconUser();
      const interval = setInterval(() => {
        getData();
      }, 2000);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.

  }, [count])
 
    const onSend = useCallback((messages = []) => {
        sendData(route.params.user, route.params.userTo, messages[0].text, messages);
        // getData();
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        
    }, [])

    function renderBubble(props) {
        return (
          // Step 3: return the component
          
          <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: lightGreen, 
                    marginRight: 10,
                },
                left: {
                    backgroundColor: '#FFF',
                    marginLeft:10,
                }
            }}
            textStyle={{
              right: {
                color: '#fff'
              },
              left: {
                  color: '#000'
              }
            }}
          >
          </Bubble>
        );
      }

    const customtInputToolbar = props => {
        return (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: "white",
              borderTopColor: darkGreen,
              borderTopWidth: 0,
            }}
          />
        );
      };

      function renderSend(props) {
        return (
          <Send {...props}>
            <View style={styles.sendingContainer}>
              <MaterialCommunityIcons name='send-circle' size={45} color={lightGreen} />
            </View>
          </Send>
        );
      };
const emoji1 = ":basketball:";
const emoji2 = ":basketball:";
const emoji3 = ":basketball:";


const insets = useSafeAreaInsets();
  return (
    userCard ? (
      <Container>
        <UserCard BACKGROUND={route.params.BACKGROUND} settings={false} description={description} profileImage={route.params.photoUri} interests={interests} firstName={secondUserFirstName} lastName={secondUserLastName} age={age} city={city} email={email} gender={gender} phone={phone} currentCity={null} editProfile={(edit) => editProfile(edit)}/>
        <Footer open={()=>{open()}} BACKGROUND={route.params.BACKGROUND}/>
      </Container>
      ) : (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: route.params.BACKGROUND,}]}>
       

        <View style={styles.header}>
            <LinearGradient
                colors={[lightGreen, darkGreen]}
                style={{width: '100%', height: '100%', }}
                end={ {x: 1, y: 0 }}
                start={ {x: 0, y: 1 }}
            >
              <TouchableOpacity style={styles.headerProfile}  onPress={() => setUserCard(true)}>

                    <View style={styles.profilePhotoContainer} >
                      {route.params.photoUri ? (
                        <Image
                            style={styles.profilePhoto}
                            source={{uri : serverName.app.db+"images/"+ route.params.photoUri}}
                          />
                        ):(
                          <Image
                            style={[styles.profilePhoto, {backgroundColor: "#fff", width: '100%', height: '100%'}]}
                            source={require('../assets/calibre.png')}
                          />
                      )}
                       
                    </View>
                    <Text style={styles.headerText} >
                        {route.params.userToName}
                    </Text>

                </TouchableOpacity>
                <View style={styles.userToInterests}>
                    {interests == "No interests found" ? (
                        null
                    ) : (  
                      interests == undefined ? (
                            null
                        ):(
                          interests.map((item) => {
                                return (
                                  <View key={item.emoji} style={[styles.interest,{backgroundColor: item.bgColor}]}>
                                    <Emoji name={item.emoji} style={{fontSize: 18}} />  
                                  </View>
                                )
                            })
                        )
                    )}
                </View>
            </LinearGradient>
        </View>
        { messages == "" ? (
          <View style={styles.buttonView}>
           {iceBreaker.map((item) => {
              return(
                <Pressable style={styles.button} key={item}  onPress={() => sendData(route.params.user, route.params.userTo, item, item)}>
                  <Text style={styles.text}>{item}</Text>
                </Pressable>
              )
            })}
          </View>
        ): null}
          {/* <Pressable style={styles.button} >
            <Text style={styles.text}>hej</Text>
          </Pressable> */}

           <GiftedChat
          messages={messages}
          showUserAvatar={false}
          renderAvatar={null}
          // showAvatarForEveryMessage={false}
          // isTyping={true}
          onSend={messages => onSend(messages)}
          user={{
              _id: route.params.user,
          }}
          renderBubble={renderBubble}
          renderSend={renderSend}
          alwaysShowSend
          isKeyboardInternallyHandled={true}
          />
        

    </SafeAreaView>
    )
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      header:{
          position: 'absolute',
          top: '5%',
          left:0,
          width: '100%', height: '12%',
          borderTopLeftRadius: 40, borderTopRightRadius: 40,
          overflow: 'hidden',
          zIndex: 99999,
          justifyContent: 'center',
          alignItems: 'flex-start',
      },
      headerProfile:{
        width: '30%', height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 10,
      },
      profilePhotoContainer: {
        height: 50, width: 50,
        borderRadius: 100,
        backgroundColor: '#000',
        overflow: 'hidden',
    },
    profilePhoto: {
        height: '100%',
        resizeMode: 'contain',
    },
    userToInterests: {
        position: 'absolute',
        width: '20%', height: '100%',
        left: '30%', 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    interest: {
        width: 30, height: 30,
        backgroundColor: 'yellow',
        marginRight: 5,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView: {
      position: 'absolute',
      width: '100%', height: '50%',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      flexDirection: 'row',
      zIndex:9999,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: lightGreen,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });


