import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, Image, View, Platform, StyleSheet, TouchableOpacity, Text , Keyboard, TouchableWithoutFeedback} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {updateData} from './update';
import { Camera } from 'expo-camera';

import {AuthContext} from '../../../utils/authContext';

import { signUp } from "../newSignUpFlow/style";
import { NeuView, NeuInput, NeuButton } from '../../../components/neu-element';
import {BACKGROUND, RADIUS, COLOR, PLACEHOLDER, Neumorphism, NeumorphismInput,Container, ActionContainer, HeroContainer, ProgressBar, DropDown} from "../../../components/Style";

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default ({ navigation, route }) => {
  const { signUP } = React.useContext(AuthContext);


    const [buttonState, setButtonState] = React.useState(true);
    const [imageState, setImageState] = React.useState(false);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [imageType, setImageType] = useState(null);
    


    const allowPickImage = async () => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        let newStatus = status;
        if (status !== 'granted') {
            if (Platform.OS !== 'web') {
                  const {status}  =  await Permissions.askAsync(Permissions.CAMERA_ROLL);
                  newStatus = status;
                }
        }
        console.log(newStatus)
        if (newStatus !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work! You might need to allow us permission in your phones setteings');
        }else{
            return newStatus;
        }
    }
    const allowTakeImage = async () => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA);
        let newStatus = status;
        if (status !== 'granted') {
            if (Platform.OS !== 'web') {
                  const {status}  =  await Permissions.askAsync(Permissions.CAMERA);
                  newStatus = status;
                }
        }
        console.log(newStatus)
        if (newStatus !== 'granted') {
            alert('Sorry, we need camera permissions to make this work! You might need to allow us permission in your phones setteings');
        }else{
            return newStatus;
        }
    }
    const takeImage = async () => {
        const status = await allowTakeImage();

        if (status == 'granted') {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            });
            console.log(result);

            if (!result.cancelled) {
            let localUri = result.uri;
            let filename = localUri.split('/').pop();
            
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
          

            setImageName(filename);
            setImageUri(localUri);
            setImageType(type);
            setImage(result.uri);
            setButtonState(false);

          }
            
        }
    }

    const pickImage = async () => {
        
        const status = await allowPickImage(); //Måske skal man også give adgang til camera roll på android

        if (status == 'granted') {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          console.log(result);

          if (!result.cancelled) {
            let localUri = result.uri;
            let filename = localUri.split('/').pop();
            
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
          

            setImageName(filename);
            setImageUri(localUri);
            setImageType(type);
            setImage(result.uri);
            setButtonState(false);
        }      
      }
    };

    const serverName = require('../../../appSettings/db.json');

    const handlePress = () => {
      setImageState(true); // show ActivityIndicator 
      let filename = imageName;
      let localUri = imageUri
      
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append('photo', { uri: localUri, name: filename, type: type, user: route.params.user  });
     
     fetch(serverName.app.db + 'uploadProfileImage.php', {
        method: 'POST',
        body: formData,
        header: {
          'content-type': 'multipart/form-data',
        },
      }).then((response) => response.json())
      .then((responseJson) =>{
         console.log(responseJson)
         if(responseJson == "SUC"){
             updateData("profileImage", filename, route.params.user)
             navigation.navigate("Menu", {
            })
         }else{
             alert(responseJson)
         }
          setImageState(false) // hide ActivityIndicator
        
      })
      .catch((error)=>{
          console.error(error);
      });
    }

    const fadeIn = {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      };

      
    const buttonStateStyle = buttonState ? signUp.lowOpacity : "";
    const ActivityIndicatorStyle = imageState ? "" : signUp.hidden;
  return (
    <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{height: '100%', width: '100%', zIndex:-99}}></View>
        </TouchableWithoutFeedback>
        
       
        <Animatable.View animation={fadeIn} duration={2000} style={HeroContainer.container}>              
          <Text style={HeroContainer.text}>Set a <Text style={HeroContainer.greenText}>profile picture</Text></Text>
        </Animatable.View>

        <View style={[NeumorphismInput.container, {height: '55%'}]}>
              
                <NeuButton height={50} width={windowWidth-80} color={BACKGROUND} borderRadius={RADIUS} onPress={takeImage} >
                  <Text style={Neumorphism.neumorphismButtonText}>Take an image from camera</Text>
                </NeuButton>
              
                <NeuButton height={50} width={windowWidth-80} color={BACKGROUND} borderRadius={RADIUS} onPress={pickImage} style={{marginTop: 10}}>
                  <Text style={Neumorphism.neumorphismButtonText}>Pick an image from camera roll</Text>
                </NeuButton>
                <NeuView height={200} width={200} color={BACKGROUND} borderRadius={100}>
                  
                  {image && <Image source={{ uri: image }} style={{ width: 190, height: 190, borderRadius: 100, }} /> || <Image source={require('../../../assets/calibre.png')} style={{ width: 190, height: 190, borderRadius: 100,}}/>}
                </NeuView>
            <ActivityIndicator size="large" style={ActivityIndicatorStyle} />
        </View>

        <View style={ActionContainer.actionContainerSignUp}>
              <View style={ActionContainer.actionContainerSignUpAvoiding}>
                <NeuButton
                  disabled={buttonState}
                  style={buttonStateStyle} 
                  onPress={() => handlePress()} width={140} height={50} color={'#EDECEC'} borderRadius={10}
                >
                  <Text style={Neumorphism.neumorphismButtonText}>
                    DONE
                  </Text>
                </NeuButton>  
              </View>
            </View>
    </Container>
  );
}
