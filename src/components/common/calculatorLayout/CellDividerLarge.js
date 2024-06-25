import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CellDividerLarge = ({ children }) => (
  <View style={[styles.cellDivider]}>
        {children}
  </View>
);

export default CellDividerLarge;

const styles = StyleSheet.create({
    cellDivider: {
        width: '50%',
      },

  })