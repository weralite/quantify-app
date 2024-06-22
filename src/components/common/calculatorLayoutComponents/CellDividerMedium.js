import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CellDividerMedium = ({ children }) => (
  <View style={[styles.cellDivider]}>
        {children}
  </View>
);

export default CellDividerMedium;

const styles = StyleSheet.create({
    cellDivider: {
        width: '30%',
      },

  })