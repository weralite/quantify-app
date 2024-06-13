import React from 'react';
import { ScrollView } from 'react-native';
import MenuButton from './buttons/MenuButton';

const Menu = ({ navigation }) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <MenuButton title="Infästning" onPress={() => navigation.navigate('Details')} />
      <MenuButton title="Skivmaterial" onPress={() => navigation.navigate('Details')} />
      <MenuButton title="Sten" onPress={() => navigation.navigate('Details')} />
      <MenuButton title="Torrbruk" onPress={() => navigation.navigate('Details')} />
      <MenuButton title="Virke" onPress={() => navigation.navigate('Virkesåtgång')} />

    </ScrollView>
  );
};

export default Menu;