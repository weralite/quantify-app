import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';

const MenuButton = ({ title, onPress, }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default MenuButton;

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 5,
    padding: 15,
    backgroundColor: "#FFD700", 
    // borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', 
  },
});