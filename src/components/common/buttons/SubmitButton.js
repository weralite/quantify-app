import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CellDividerLarge } from '../calculatorLayout';
import React from 'react';

const SubmitButton = ({ title, onPress, buttonWidth }) => {
  return (
    <CellDividerLarge>
    <TouchableOpacity style={[styles.buttonContainer, { width: buttonWidth }]} onPress={onPress}>
      <Text style={styles.buttonText}>Beräkna</Text>
    </TouchableOpacity>
    </CellDividerLarge>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({

  buttonContainer: {
    height: 41,
    backgroundColor: "#FFD700",
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'grey',
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 1,
    //     height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    
    // elevation: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});