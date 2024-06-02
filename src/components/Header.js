import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Notes from '../screens/Notes';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View>

      </View>
      <View style={styles.SubHeaderRight}>
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
  },

  SubHeaderRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    width: 300,
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