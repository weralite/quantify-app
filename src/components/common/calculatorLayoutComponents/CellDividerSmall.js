import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CellDividerSmall = ({ children }) => (
  <View style={[styles.cellDivider]}>
        {children}
  </View>
);

export default CellDividerSmall;

const styles = StyleSheet.create({
    cellDivider: {
        width: '20%',
      },

  })