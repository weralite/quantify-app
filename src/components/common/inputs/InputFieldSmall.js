import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

const InputFieldSmall = ({ placeholder, onChangeText, value, keyboardType, style }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleTextChange = (text) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, '');
    onChangeText(numericText);
  };
  
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={isFocused ? '' : placeholder}
      onChangeText={handleTextChange}
      value={value}
      keyboardType={keyboardType}
      placeholderTextColor="gray"
      onFocus={() => setIsFocused(true)} // Set isFocused to true when input is focused
      onBlur={() => setIsFocused(false)} 
      maxLength={4}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    padding: 0,

  },
});

export default InputFieldSmall;