import React from 'react';
import { StyleSheet, View, Text, StatusBar, Button, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native';
import {AuthContext} from '../utils/authContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // https://oblador.github.io/react-native-vector-icons/
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

import { QR } from '../components/QRcode';

import { NeuView, NeuInput, NeuButton } from '../components/neu-element';
import {COLOR, darkGreen, lightGreen, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown, LogoContainer} from "../components/Style";

import { Dimensions } from 'react-native';
import {updateData} from './flows/editProfile/update'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth-windowWidth/12;
const neuHeight = windowHeight-windowHeight/2.6;

const UserCardSet = props => {
    const {
        BACKGROUND,
        settings,
        profileImage,
        id,
        firstName,
        lastName,
        age,
        city,
        email,
        gender,
        phone,
        interests,
        currentCity,
        editProfile,
        description,
        job,
        education,
        ...rest
      } = props;
      const serverName = require('../appSettings/db.json');

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
    const [editDescription, setEditDescription] = React.useState(false);
    const [text, onChangeText] = React.useState(description);
    // <Text  onPress={() => editProfile("editName")} style={styles.profileNameTag}> {getAge(age)} </Text> 
    

    return(
      <Container style={{backgroundColor: BACKGROUND}}>
        <ScrollView style={{paddingBottom: 250}}>
            <View style={styles.profile}>
                <View style={styles.profileNameTagContainer}>
                  {settings ? (
                    < TouchableOpacity  onPress={() => editProfile("editName")}>
                        <Text style={styles.profileNameTag}>{firstName},</Text>
                    </TouchableOpacity>
                  ): (
                    <Text style={styles.profileNameTag}>{firstName},</Text>
                  )}
                   {settings ? (
                    < TouchableOpacity  onPress={() => editProfile("editAge")}>
                      <Text style={styles.profileNameTag}> {getAge(age)} </Text> 
                    </TouchableOpacity>
                  ): (
                    <Text style={styles.profileNameTag}> {getAge(age)} </Text> 
                  )}
                   
                </View>  
                    <View style={styles.profilePhotoContainer}>
                      {settings ? (
                        < TouchableOpacity  onPress={() => editProfile("editProfileImage")}>
                         {profileImage ? (
                            <Image
                                style={styles.profilePhoto}
                                source={{uri : serverName.app.db+"images/"+ profileImage}}
                              />
                            ):(
                              <Image
                                style={[styles.profilePhoto, {backgroundColor: "#fff",}]}
                                source={require('../assets/calibre.png')}
                              />
                          )}
                        </TouchableOpacity>
                      ): (
                          profileImage ? (
                          <Image
                              style={styles.profilePhoto}
                              source={{uri : serverName.app.db+"images/"+ profileImage}}
                            />
                          ):(
                            <Image
                              style={[styles.profilePhoto, {backgroundColor: "#fff",}]}
                              source={require('../assets/calibre.png')}
                            />
                          )
                      )}
                      
                    </View>
                <View style={styles.userInterests}>
                {interests == "No interests found" ? (
                            null
                        ) : (  
                        interests == undefined ? (
                                null
                            ):(
                            interests.map((item) => {
                                    return (
                                    <View key={item.emoji} style={[styles.interest,{backgroundColor: item.bgColor}]}>
                                        <Text style={[styles.interestText]} >{item.title}</Text>
                                        <Emoji name={item.emoji} style={{fontSize: 14}} />  
                                    </View>
                                    )
                                })
                            )
                        )}
                </View>
            </View>
            <View style={styles.description}>
                <NeuView height={neuHeight/2.5} width={neuWidth-10} color={BACKGROUND} borderRadius={10} >
                    <View style={styles.descriptionTitle}>
                        <Text style={[styles.descriptionTitleText]} >Description </Text>
                        
                    </View>
                    {settings ? (
                      editDescription ? (
                        <View style={{width: '100%', height: '100%'}}>
                          <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Add description"
                            autoCorrect={true}
                            autoFocus={true}
                            maxLength={500}
                            multiline={true}
                            onEndEditing={() => {updateData("description", text, id);setEditDescription(false)}}
                          />
                        </View>
                      ) : (
                      <ScrollView style={[styles.descriptionScroll]} >
                          <TouchableOpacity onPress={() => setEditDescription(true)}>
                            <Text style={styles.descriptionText}> {text ? text + " - (Click to edit)" : "No description, click to add a description"}</Text>  
                          </TouchableOpacity>
                      </ScrollView>
                      )
                  ): (
                    <ScrollView style={[styles.descriptionScroll]}>
                      <Text style={styles.descriptionText}> {description ? description : "No description"}</Text>  
                    </ScrollView>
                  )}
                   
                </NeuView>
            </View>
            <View style={styles.quickinfo}>
                <NeuView height={neuHeight/2.2} width={neuWidth-25} color={BACKGROUND} borderRadius={10}>
                  <View style={styles.quickinfoView}>
                    <View style={styles.quickinfoHeaderView}>
                      <Text style={styles.quickinfoHeaderText}>- Quick info -</Text>
                    </View>
                    <View style={styles.quickinfoTextView}>
                      <MaterialIcon name="work" size={windowWidth/6/2.5} color={"gray"}/>
                        {settings ? (
                          < TouchableOpacity >
                            <Text style={styles.quickinfoText}> {job ? job : "Cooming in later version"} </Text>
                          </TouchableOpacity>
                        ): (
                          <Text style={styles.quickinfoText}> {job ? job : "Cooming in later version"} </Text>
                        )}
                    </View>
                    <View style={styles.quickinfoTextView}>
                      <MaterialIcon name="school" size={windowWidth/6/2.5} color={"gray"}/>
                          {settings ? (
                            < TouchableOpacity >
                              <Text style={styles.quickinfoText}> {education ? education : "Cooming in later version"} </Text>
                            </TouchableOpacity>
                          ): (
                            <Text style={styles.quickinfoText}> {education ? education : "Cooming in later version"} </Text>
                          )}
                    </View>
                    <View style={styles.quickinfoTextView}>
                      <MaterialIcon name="location-on" size={windowWidth/6/2.5} color={"gray"}/>
                        {settings ? (
                            <Text style={styles.quickinfoText}> {currentCity ? currentCity : "Location turned off"} </Text>
                        ): (
                          <Text style={styles.quickinfoText}> {currentCity ? currentCity : "Location turned off"} </Text>
                        )}
                    </View>
                  </View>
                </NeuView>
              </View>

              <View style={[styles.quickinfo, {marginBottom: 150}]}>
                <NeuView height={neuHeight/2.2} width={neuWidth-25} color={BACKGROUND} borderRadius={10}>
                  <View style={styles.quickinfoView}>
                    <View style={styles.quickinfoHeaderView}>
                      <Text style={styles.quickinfoHeaderText}>- Personal info -</Text>
                    </View>
                    <View style={styles.quickinfoTextView}>
                      <MaterialIcon name="home" size={windowWidth/6/2.5} color={"gray"}/>
                        {settings ? (
                          < TouchableOpacity  onPress={() => editProfile("editCity")}>
                            <Text style={styles.quickinfoText}> {city ? city : "Click to add city"} </Text>
                          </TouchableOpacity>
                        ): (
                          <Text style={styles.quickinfoText}> {city ? city : "No info"} </Text>
                        )}
                    </View>
                    <View style={styles.quickinfoTextView}>
                      <FontAwesome5Icon name="transgender" size={windowWidth/6/2.5} color={"gray"}/>
                        {settings ? (
                          < TouchableOpacity  onPress={() => editProfile("editGender")}>
                            <Text style={[styles.quickinfoText, {textTransform: "capitalize"}]}> {gender ? gender : "Click to add gender"} </Text>
                          </TouchableOpacity>
                        ): (
                          <Text style={[styles.quickinfoText, {textTransform: "capitalize"}]}> {gender ? gender : "No info"} </Text>
                        )}
                    </View>
                    <View style={styles.quickinfoTextView}>
                      <FontAwesome5Icon name="birthday-cake" size={windowWidth/6/2.5} color={"gray"}/>
                        {settings ? (
                          < TouchableOpacity  onPress={() => editProfile("editAge")}>
                            <Text style={styles.quickinfoText}> {age ? age : "Click to add birthday"}</Text>
                          </TouchableOpacity>
                        ): (
                          <Text style={styles.quickinfoText}> {age ? age : "No info"}</Text>
                        )}
                    </View>
                  </View>
                </NeuView>
              </View>
              
        </ScrollView>
      </Container>
     
    );
}

const styles = StyleSheet.create({
    profile:{
        backgroundColor: "rgb(158,215,204)",
        width: '100%', height: 250,
        borderTopLeftRadius: 40, borderTopRightRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: .15,
        shadowRadius: 5,
        shadowColor: "#000000", 
    },
    edit:{
      width: 20, height: 20,
      backgroundColor: COLOR,
      borderRadius: 100,
      top:-10,
      margin: 0, padding: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profilePhotoContainer: {
        position: 'absolute',
        left:25,
        height: windowWidth/2.1, width: windowWidth/2.1,
        borderRadius: 100,
        backgroundColor: '#000',
        overflow: 'hidden',
        borderWidth: 10,
        borderColor: "rgb(87,182,159)",

    },
    profilePhoto: {
        width: '100%',
        height: '100%'
    },
    profileNameTagContainer:{
        position: 'absolute',
        top: 40,
        right: 25,
        backgroundColor: '#000',
        borderRadius: 100,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'row',
    },
    profileNameTag: {
        color: '#FFF',
        letterSpacing: 0,
        fontWeight: '700',
        fontSize: 16,
        textTransform: "uppercase",
    },
    userInterests: {
        position: 'absolute',
        right: 25,
        top: 60,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: 100,
        paddingBottom: 2, paddingTop: 2,
        paddingLeft: 5, paddingRight: 5,
        height: '60%',

    },
    interest: {
        height: 25,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10, paddingRight: 10,
        marginTop: 10,
    },
    interestText: {
        fontSize: 14,
        paddingRight: 5,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white',
    },
    quickinfo: {
        width: '100%', height: neuHeight/2.2,
        top:60,
        marginBottom:40,
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      quickinfoView: {
        width: '100%', height: '100%', 
        justifyContent: 'space-around',
      },
      quickinfoHeaderView: {
        width: '100%',
        alignItems: 'center',
      },
      quickinfoHeaderText: {
        fontWeight: 'bold',
      },
      quickinfoTextView: {
        width: '100%',
        paddingLeft: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
      },
      quickinfoText: {
        fontSize: 17,
        color: 'gray',
        fontWeight: '600',
        paddingLeft: 10,
      },
      description: {
        width: '100%', height: neuHeight/2.5,
        top:25,
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      descriptionTitle: {
        position: 'absolute',
        top: '10%', left: '5%',
        flexDirection: 'row',
      },
      descriptionTitleText: {
        fontWeight: 'bold'
      },
      descriptionScroll:{
        position: 'absolute', 
        top: '25%', 
        width: '85%', height: '70%',
      },
      descriptionText: {

      },
      input: {
        width: '80%', height: neuHeight/3.8,
        top:30,
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 12,
        padding: 10,
      },
      
  });

  UserCardSet.propTypes = {
    BACKGROUND: PropTypes.string,
    settings: PropTypes.bool,
    profileImage: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    green: PropTypes.string,
    phone: PropTypes.number,
    interest: PropTypes.any,
    currentCity: PropTypes.any,
    editProfile: PropTypes.func,
    description: PropTypes.string,
    job: PropTypes.string,
    education: PropTypes.string,
    ...UserCardSet.propTypes
  };
  export default UserCardSet; // clean code