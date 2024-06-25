import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalculatorHeader = ({ title, description }) => {
  return (
    <View style={styles.componentHeader}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerDescription}>{description}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  componentHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: -10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  headerDescription: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
});

export default CalculatorHeader;