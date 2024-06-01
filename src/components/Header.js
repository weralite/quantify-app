import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>QUANTIFY</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'left',
  },
});