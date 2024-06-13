import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

const SubmitButton = ({ title, onPress, buttonWidth }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, { width: buttonWidth }]} onPress={onPress}>
      <Text style={styles.buttonText}>Beräkna</Text>
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
    borderWidth: 1.5,
    borderColor: '#FFD700'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});