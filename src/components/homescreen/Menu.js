import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MenuButton from '../common/buttons/MenuButton';
import Animated, { BounceIn } from 'react-native-reanimated';
import WoodIcon from '../../assets/images/woody.svg';
import Nail from '../../assets/images/nail.svg';
import Cement from '../../assets/images/cement.svg';
import Gravel from '../../assets/images/gravel.svg';
import Board from '../../assets/images/board.svg';

const Menu = ({ navigation }) => {
  const handlePress = (event, routeName) => {
    const { locationX, locationY } = event.nativeEvent;

    navigation.navigate(routeName, {
      originX: locationX,
      originY: locationY,
    });
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.MenuContainer}>
        <Animated.View entering={BounceIn}>
          <MenuButton
            icon={Nail}
            title="Fästelement"
            description="Skruv, spik"
            onPress={(event) => handlePress(event, 'Details')}
          />
        </Animated.View>
        <Animated.View entering={BounceIn}>
          <MenuButton
            icon={Board}
            title="Skivmaterial"
            description="Plywood, MDF, gipsskivor"
            onPress={(event) => handlePress(event, 'Details')}
          />
        </Animated.View>
        <Animated.View entering={BounceIn}>
          <MenuButton
            icon={Gravel}
            title="Fyllnadsmaterial"
            description="Makadam, stenmjöl"
            onPress={(event) => handlePress(event, 'Grusåtgång')}
          />
        </Animated.View>
        <Animated.View entering={BounceIn}>
          <MenuButton
            icon={Cement}
            title="Cementbaserat"
            description="Betong, flytspackel"
            onPress={(event) => handlePress(event, 'Details')}
          />
        </Animated.View>
        <Animated.View entering={BounceIn}>
          <MenuButton
            icon={WoodIcon}
            title="Virke"
            description="Täckbrädor, reglar"
            onPress={(event) => handlePress(event, 'Virkesåtgång')}
          />
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    gap: 15,
  }
});

export default Menu;
