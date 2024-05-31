import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

const AppButton = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: "#FFD700"}]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 5,
    padding: 15,
    // borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Black color for the text
  },
});