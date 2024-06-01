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
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 5,
    textAlign: 'center',
  },
});

export default InputField;