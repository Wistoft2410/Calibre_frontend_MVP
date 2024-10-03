import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Neumorphism } from "./Style";
export default ({ radius, style, revert, borderless, children }) => {

// Neumorphism button
const BACKGROUND = '#EDECEC';
const RADIUS = 10;

    const topStyles = StyleSheet.flatten([
      Neumorphism.morphTop,
      revert && {
        shadowColor: color(BACKGROUND)
          .darken(0.3)
          .alpha(0.5),
      },
      { borderRadius: radius || RADIUS },
      style,
    ]);
  
    const bottomStyles = StyleSheet.flatten([
      Neumorphism.morphBottom,
      revert && {
        shadowColor: color(BACKGROUND)
        .lighten(0.5)
        .alpha(0.5),
      },
      { borderRadius: radius || RADIUS },
    ]);
  
    const morphStyles = StyleSheet.flatten([
      Neumorphism.morph,
      borderless && { borderWidth: 0 },
      { borderRadius: radius || RADIUS },
    ]);
  
    return (
      <View style={topStyles}>
        <View style={bottomStyles}>
          <View style={morphStyles}>{children}</View>
        </View>
      </View>
    );
}