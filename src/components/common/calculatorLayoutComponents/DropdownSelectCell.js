import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DropdownSelectCell = ({ children, style }) => (
  <View style={[styles.dropdownSelectCell, style]}>
        {children}
  </View>
);

export default DropdownSelectCell;

const styles = StyleSheet.create({
    dropdownSelectCell: {
      width: '50%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'gray'
    },

  })