import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Notes from '../../screens/Notes';
import { version } from '../../../package.json';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.HeaderLeft}>
        <Text>v {version}</Text>
      </View>
      <View style={styles.HeaderRight}>
        <Text style={styles.headerText}>Mängdberäknare</Text>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: "#FFD700",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // // Elevation for Android
    // elevation: 5,
  },

  HeaderLeft: {
    height: 50,
    width: '25%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  HeaderRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    width: '75%',
    height: 50,
    borderBottomLeftRadius: 200,

  },

  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'left',
  },
});