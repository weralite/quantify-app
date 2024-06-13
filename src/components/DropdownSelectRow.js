import React from 'react';
import { View, StyleSheet } from 'react-native';

const DropdownSelectRow = ({ children }) => (
  <View style={[styles.dropdownSelectRow]}>
    {children}
  </View>
);

export default DropdownSelectRow;

const styles = StyleSheet.create({
    dropdownSelectRow: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      gap: 10,
    },

  })