import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CellDividerLarge } from '../calculatorLayout';
import React from 'react';

const SubmitButton = ({ title, onPress, buttonWidth }) => {
  return (
    <CellDividerLarge>
    <TouchableOpacity style={[styles.buttonContainer, { width: buttonWidth }]} onPress={onPress}>
      <Text style={styles.buttonText}>VISA</Text>
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
    borderRadius: 4,

  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'PTSansNarrow-Bold',
    // fontWeight: 'bold',
    color: '#000',
  },
});