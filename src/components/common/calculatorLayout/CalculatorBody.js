import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalculatorBody = ({ children }) => (
  <View style={[styles.component]}>
    {children}
  </View>
);

export default CalculatorBody;

const styles = StyleSheet.create({
  component: {
    width: '95%',
    display: 'flex',
backgroundColor: '#f8f8f8',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 5,
  },

})