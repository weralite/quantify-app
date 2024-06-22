import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CellDividerLabel = ({ children }) => (
  <View style={[styles.cellDivider]}>
        {children}
  </View>
);

export default CellDividerLabel;

const styles = StyleSheet.create({
    cellDivider: {
        width: '33%',
      },

  })