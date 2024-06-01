import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

const SubmitButton = ({ title, onPress, }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 5,
    padding: 10,
    width: '33%',
    backgroundColor: "#FFD700", 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', 
  },
});