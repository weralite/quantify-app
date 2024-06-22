import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

const InputField = ({ placeholder, onChangeText, value, keyboardType, style }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={isFocused ? '' : placeholder} 
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType}
      placeholderTextColor="gray"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
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