import React, { useEffect, useState, useRef}from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
import {darkGreen } from "../../../components/Style";
import Emoji from 'react-native-emoji'; // https://unicodey.com/emoji-data/table.htm
import * as Linking from 'expo-linking';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation, route }) => {

    const mapRef = useRef(null);


    const [lat, setLat] = React.useState(route.params.latitude);
    const [lng, setLng] = React.useState(route.params.longitude);
    const [errorMsg, setErrorMsg] = useState(null);

    const [bigState, setBigState] = useState(false);


    
    const openBig = () => setBigState(true);
    const closeBig = () => setBigState(false);

    const INITIAL_REGION = {
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: .050,
        longitudeDelta: .030,
      };

      const [region, setRegion] = useState(INITIAL_REGION);

     
      const getLocation = async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setLocation(null);
            setLocationAllowed(false);
            setCurrentCity(null); // Delete saved location information, when location it turned off
            console.log(errorMsg);
            return;
          }


        let location = await Location.getCurrentPositionAsync({});
        // console.log('Location: ')
        // console.log(location.coords);
        setErrorMsg(null);
        setLat(location.coords.latitude); 
        setLng(location.coords.longitude); 
        
      }

      useEffect(() => {
        getLocation(); // get location on load
        const shortInterval = setInterval(() => {
            getLocation(); // get data on interval if there is a change, then it will update the info
          }, 2000);
        return () => { clearInterval(shortInterval)} // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      

    },[0])

  return (
    <View style={styles.container}>
      {bigState? (
        <View style={styles.bigBusiness}>
          <View style={styles.bigBusinessName}>
            <Text style={styles.bigBusinessNameText}>
              businessName
            </Text>
          </View>
          <View style={styles.bigBusinessImg}>
          </View>
          <View style={styles.bigBusinessInfo}>
            <Text style={styles.bigBusinessInfoTitle}>Information</Text>

            <View style={styles.bigBusinessInfoShort}>
              <View style={styles.bigBusinessPrice}>
                <FontAwesome5Icon name="dollar" size={10} color={"#92E80F"} />
                <FontAwesome5Icon style={styles.businessPriceIcon} name="dollar" size={10} color={"#92E80F"} />
                <FontAwesome5Icon style={styles.businessPriceIcon} name="dollar" size={10} color={"#92E80F"} />
              </View>
              <View style={styles.bigBusinessRating}>
                <Text style={{fontSize: 12, color: "white", fontWeight: "bold"}}>1·2·3·4·5</Text>
              </View>
              <View style={styles.verticleLine}></View>
              <View style={[styles.bigBusinessinterest,{backgroundColor: "#92E80F"}]}>
                <Text style={[styles.bigBusinessinterestText]}>Football</Text>
                <Emoji name={":soccer:"} style={{fontSize: 12}} />  
              </View> 
              <View style={[styles.bigBusinessinterest,{backgroundColor: "#92E80F"}]}>
                <Text style={[styles.bigBusinessinterestText]}>Football</Text>
                <Emoji name={":soccer:"} style={{fontSize: 12}} />  
              </View>
            </View>

            <View style={styles.bigBusinessResume}>
              <Text style={styles.bigBusinessResumeText}>
                Text
              </Text>
            </View>

            <View style={styles.bigBusinessKontakt}>
              <View style={styles.bigBusinessKontaktLine}>
                <MaterialCommunityIcon name="image-multiple-outline" size={12} />
                <Text style={styles.bigBusinessKontaktText}>
                  Text
                </Text>
              </View>
              <View style={styles.bigBusinessKontaktLine}>
                <MaterialIcon name="location-on" size={12}/>
                <Text style={[styles.bigBusinessKontaktText, styles.bigBusinessKontaktTextBlue]}>
                  Address
                </Text>
              </View>
              <View style={styles.bigBusinessKontaktLine}>
                <MaterialIcon name="phone-enabled" size={12}/>
                <Text style={[styles.bigBusinessKontaktText, styles.bigBusinessKontaktTextBlue]}>
                  Phone number
                </Text>
              </View>
            </View>

          </View>

          <TouchableOpacity style={styles.bigBusinessWebsite}  onPress={() => Linking.openURL('https://expo.dev')}>
              <Text style={styles.bigBusinessWebsiteText}>Website</Text>
              <MaterialCommunityIcon name="web" size={16} color={"white"}/>
          </TouchableOpacity>

          <View style={styles.mapNavLeft}>
            <TouchableOpacity style={styles.mapNavBox} onPress={() => closeBig()}>
              <MaterialCommunityIcon name="magnify-close" size={28} color={"white"}/>
            </TouchableOpacity>
          </View>

          <View style={styles.mapNavRight}>
            <TouchableOpacity style={styles.mapNavBox}>
              <MaterialCommunityIcon name="bookmark" size={28} color={"white"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapNavBox}>
              <MaterialIcon name="person-add" size={28} color={"white"}/>
            </TouchableOpacity>
          </View>

        </View>
       
      ):(
        <View style={styles.header}>

        </View>
      )}
        
        
        <MapView 
            ref={mapRef}
            style={styles.map} 
            initialRegion={{coordinate: Location}}
            onRegionChangeComplete={(region) => setRegion(region)}
            mapType={"standard"}
            userInterfaceStyle={'light'}
            showsUserLocation={true}
            showsCompass={false}
            loadingEnabled={true}
            loadingBackgroundColor={'#35363A'}
        >
            
             <MapView.Marker
                    coordinate={{"latitude":route.params.latitude+.005,"longitude":route.params.longitude}}
                    onPress={() => openBig()}
                >
                    {region.latitudeDelta < .05?

                          <View style={styles.businessMarker}>
                            <View style={styles.businessName}>
                              <Text>businessName</Text>
                            </View>
                            <View style={styles.businessPrice}>
                              <FontAwesome5Icon name="dollar" size={10} color={"#92E80F"} />
                              <FontAwesome5Icon style={styles.businessPriceIcon} name="dollar" size={10} color={"#92E80F"} />
                              <FontAwesome5Icon style={styles.businessPriceIcon} name="dollar" size={10} color={"#92E80F"} />
                            </View>
                            <View style={styles.businessOpen}>
                              <Text style={styles.businessOpenText}>Open</Text>
                            </View>
                            <View style={styles.businessInterests}>
                              <View style={[styles.interest,{backgroundColor: "#92E80F"}]}>
                                <Emoji name={":soccer:"} style={{fontSize: 12}} />  
                              </View>
                              <View style={[styles.interest,{backgroundColor: "#92E80F"}]}>
                                  <Emoji name={":soccer:"} style={{fontSize: 12}} />  
                              </View>
                            </View>
                          </View>
                    : 
                        <View style={[styles.smallBusinessMarker,{backgroundColor: "#92E80F"}]}>
                            <Emoji name={":soccer:"} style={{fontSize: 16}} />  
                        </View>
                        }
                   
            </MapView.Marker> 
            
        </MapView>
            
            
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight/7,
    backgroundColor: "#35363A",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  userMarker: {
    width:20,height: 20,
    backgroundColor: "#73EC70",
    borderRadius: 100,
    borderWidth:1,
    borderColor: "#35363A",
    justifyContent: "center",
    alignItems: 'center',
  },
  businessMarker:{
    width:140,height: 60,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  businessName:{
    position: 'absolute',
    top:5,  left:5,
  },
  businessPrice:{
    position: 'absolute',
    top:5, right:5,
    width:30,height: 20,
    borderRadius: 10,
    backgroundColor: "#35363A",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  businessPriceIcon:{
    marginLeft: 2,
  },
  businessOpen:{
    position: 'absolute',
    bottom:5, left:5,
    borderRadius: 10,
    backgroundColor: "#35363A",
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessOpenText:{
    fontSize: 12,
    fontWeight: 'bold',
    color: "#FFFFFF",
    textTransform: 'uppercase',
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
  },
  businessInterests:{
    position: 'absolute',
    width:50,height: 20,
    bottom:5, right:5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  interest: {
    width:20,height: '100%',
    borderRadius: 100,
    justifyContent: "center",
    alignItems: 'center',
  },
  smallBusinessMarker:{
    width:30,height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: 'center',
    borderWidth:1,
    borderColor: "#35363A",
  },
  bigBusiness:{
    position: 'absolute',

    zIndex: 99,
    width: '85%', height: '60%',
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bigBusinessName:{
    position: 'absolute',
    top: -20,
    height: 40,
    backgroundColor: "#35363A",
    borderRadius: 30,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigBusinessNameText:{
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bigBusinessImg:{
    width: '95%', height: '40%',
    backgroundColor: 'black',
    position: 'absolute',
    top: 30,
    borderRadius: 30,
  },
  bigBusinessInfo:{
    width: '95%', height: '45%',
    position: 'absolute',
    top: '50%',
    // borderWidth:1,
  },
  bigBusinessInfoTitle:{

  },
  bigBusinessInfoShort:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bigBusinessPrice:{
    width:30,height: 20,
    borderRadius: 10,
    backgroundColor: "#35363A",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBusinessRating:{
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFCC00",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  verticleLine:{
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
  
  bigBusinessinterest:{
    height: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  bigBusinessinterestText:{
    color: "white", 
    fontWeight: 'bold',
    fontSize: 12,

  },
  bigBusinessResume:{
    width:'100%', 
    height: '40%',
    marginTop:5,
    // borderWidth: 1,
  },
  bigBusinessResumeText:{

  },
  bigBusinessKontakt:{
    flex: 1,
    justifyContent: 'space-around',
    // borderWidth:1,
  },
  bigBusinessKontaktLine:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  bigBusinessKontaktText:{
    color: 'gray',
    marginLeft:4,
    fontSize: 12,
  },
  bigBusinessKontaktTextBlue:{
    color: '#4169E1',
  },
  bigBusinessWebsite:{
    position: 'absolute',
    height: 20,
    bottom: -10, left: 40,
    backgroundColor: '#4169E1',
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  bigBusinessWebsiteText:{
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 2,
  },
  mapNavLeft:{
    position: 'absolute',
    bottom: -80, left: 0,
    flexDirection: 'row',
  },
  mapNavRight:{
    position: 'absolute',
    bottom: -80, right: 0,
    flexDirection: 'row',
  },
  mapNavBox:{
    width: 50, height: 50,
    backgroundColor: '#35363A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 10,
  },
  map: {
    width: windowWidth,
    height: windowHeight,
    zIndex:-1,
  },
});