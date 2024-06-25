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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 15,
  },

})