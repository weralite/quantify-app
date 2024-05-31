import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import AppButton from './AppButton';

const Menu = () => {
  return (
    <View style={styles.menuContainer}>
      <AppButton title="Tak" onPress={() => console.log('Home Pressed')} />
      <AppButton title="EMPTY" onPress={() => console.log('Profile Pressed')} />
      <AppButton title="EMPTY" onPress={() => console.log('Settings Pressed')} />
      <AppButton title="EMPTY" onPress={() => console.log('Settings Pressed')} />
      <AppButton title="EMPTY" onPress={() => console.log('Settings Pressed')} />
      <AppButton title="EMPTY" onPress={() => console.log('Settings Pressed')} />
    </View>
  );
}

export default Menu;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    gap: 10,
    padding: 10,
  },
});