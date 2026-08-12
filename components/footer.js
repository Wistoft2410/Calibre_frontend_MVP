import React, {useEffect, useState} from 'react';
import { ActivityIndicator,StyleSheet, View, Text, StatusBar, Button, TouchableOpacity, Image} from 'react-native';
import { NeuView, NeuInput, NeuButton } from '../components/neu-element';
import PropTypes from 'prop-types';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const neuWidth = windowWidth-windowWidth/8;
const neuHeight = windowHeight-windowHeight/2.3;

const Footer = props => {
  const {
      open,
      ...rest
    } = props;

        
    
    return(
        <View style={styles.navCard}>
            <View style={[styles.navContainerCard, {height: 70}]} right={10}>
                <View style={styles.navContentCard}>
                    <TouchableOpacity onPress={() => {open("people-set");}} style={styles.navCircles} >
                        <MaterialIcon name="vibration" size={35} color={"rgb(55,133,223)"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
 );
}

const styles = StyleSheet.create({
   
    navCard:{
        width: '100%',
        height: 70,
        position: 'absolute',
        bottom: 35,
        alignItems: 'center',
        justifyContent: 'center',
      },
      navContent: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5, paddingRight: 5,
      },
      navCircles: {
        backgroundColor: "rgb(25,25,25)",
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.55,
        shadowRadius: 10,
        elevation: 1,

        height: 60, width: 60,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      navContainerCard:{
        position: 'absolute',
        bottom: 20,
        height: 150,
        width: 70,
        backgroundColor: "rgb(46,46,46)",
        borderRadius: 100, 
        position: 'absolute',
      },

      navContentCard: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 5, paddingBottom: 5,
      },
   
  });
  Footer.propTypes = {
    open: PropTypes.func,
...Footer.propTypes
};
export default Footer;