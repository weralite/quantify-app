import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CellDivider = ({ children }) => (
  <View style={[styles.cellDivider]}>
        {children}
  </View>
);

export default CellDivider;

const styles = StyleSheet.create({
    cellDivider: {
        width: '50%',
      },

  })