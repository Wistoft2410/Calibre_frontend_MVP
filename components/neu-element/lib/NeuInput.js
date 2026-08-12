import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import NeuView from './NeuView';
import PropTypes from 'prop-types';
import { COLOR, PLACEHOLDER } from '../../Style';





const NeuInput = props => {
  
  const {
    style = {},
    textStyle,
    placeholder = '',
    onChangeText = () => {},
    value = '',
    prefix: Prefix,
    autoFocus,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    returnKeyType,
    onSubmitEditing,
    enablesReturnKeyAutomatically,
    maxLength,
    editable,
    textContentType,
    ...rest
  } = props;

  const styles = StyleSheet.create({
    input: {
      borderBottomWidth: 0,
      width: '100%',
      height: '100%',
      paddingVertical:0,
      letterSpacing: 1,
    }
  });

  return (
    <NeuView {...rest} style={{ ...style, alignItems: 'stretch' }} inset>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 12,
          height: '100%',
        }}
      >
        {Prefix && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 6
            }}
          >
            {Prefix}
          </View>
        )}
        
        <TextInput
          style={{
            ...styles.input,
            ...textStyle
          }}
          color={COLOR}
          placeholderTextColor={PLACEHOLDER}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
          maxLength={maxLength}
          editable={editable}
          textContentType={textContentType}
        />
      </View>
    </NeuView>
  );
};

NeuInput.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  ...NeuView.propTypes
};
export default NeuInput;
