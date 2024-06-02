import React from 'react';
import { ScrollView } from 'react-native';
import MenuButton from './buttons/MenuButton';

const Menu = ({ navigation }) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <MenuButton title="Virkesåtgång" onPress={() => navigation.navigate('Virkesåtgång')} />
      <MenuButton title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </ScrollView>
  );
};

export default Menu;