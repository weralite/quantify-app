import React from 'react';
import { ScrollView, View } from 'react-native';
import MenuButton from './buttons/MenuButton';
import Animated, { SlideInRight, SlideInLeft, SlideInDown, BounceIn } from 'react-native-reanimated';

const Menu = ({ navigation }) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Animated.View entering={BounceIn}>
        <MenuButton title="Infästning" onPress={() => navigation.navigate('Details')} />
      </Animated.View>
      <Animated.View entering={BounceIn}>
        <MenuButton title="Skivmaterial" onPress={() => navigation.navigate('Details')} />
      </Animated.View>
      <Animated.View entering={BounceIn}>
        <MenuButton title="Sten" onPress={() => navigation.navigate('Details')} />
      </Animated.View>
      <Animated.View entering={BounceIn}>
        <MenuButton title="Torrbruk" onPress={() => navigation.navigate('Details')} />
      </Animated.View>
      <Animated.View entering={BounceIn}>
        <MenuButton title="Virke" onPress={() => navigation.navigate('Virkesåtgång')} />
      </Animated.View>
    </ScrollView>
  );
};

export default Menu;