import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

const SubmitButton = ({ title, onPress, buttonWidth }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, { width: buttonWidth }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    backgroundColor: "#FFD700",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});