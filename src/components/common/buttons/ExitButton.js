import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

const ExitButton = ({ title, onPress, }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default ExitButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 16,
    height: 16,
    marginLeft: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000', 
  },
});