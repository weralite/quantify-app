import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ComponentWrapper = ({ children }) => (
  <View style={[styles.component]}>
    {children}
  </View>
);

export default ComponentWrapper;

const styles = StyleSheet.create({
  component: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    overflow: 'hidden',
  },

})