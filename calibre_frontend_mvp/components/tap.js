import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  PanResponder
} from 'react-native';

const Tap = function() {
   
  
    //panResponder initialization
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture:
        (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => false,
      onMoveShouldSetPanResponderCapture:
        (event, gestureState) => false,
      onPanResponderGrant: (event, gestureState) => false,
      onPanResponderMove: (event, gestureState) => false,
      onPanResponderRelease: (event, gestureState) => {
        //After the change in the location
        var locationX = event.nativeEvent.locationX.toFixed(2);
        var locationY = event.nativeEvent.locationY.toFixed(2);
        console.log(locationX, locationY);
      },
    });
    return (
            <View style={styles.container}>
              {/* Marking touched position */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent'
                }}
                {...panResponder.panHandlers}
              />
            </View>
      );
    };
export default Tap;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden',
      zIndex:10,
    },
   
  });