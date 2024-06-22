import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, onChangeText, value, keyboardType, style }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType}
      placeholderTextColor="gray"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 20,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    padding: 0,
  },
});

export default InputField;