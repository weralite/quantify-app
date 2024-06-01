import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, onChangeText, value, keyboardType }) => {
  return (
    <TextInput
      style={styles.input}
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
    width: '33%',
    marginRight: 5,
  },
});

export default InputField;