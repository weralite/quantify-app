import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import Arrow from '../../../assets/images/arrowalt.svg';

const MenuButton = ({ description, title, onPress, icon: Icon }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
      <View style={[styles.containerLeft]}>
      {Icon ? <Icon /> : null}
      <View>
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonDescription}>{description}</Text>
      </View>
      </View>
      <Arrow />
    </TouchableOpacity>
  );
}

export default MenuButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    margin: 5,
    backgroundColor: "#FFD700",
    height: 80,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,

  },

  containerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
  },

  buttonTitle: {
    fontSize: 28,
    fontFamily: 'PTSansNarrow-Bold',
    // fontWeight: "500", 
    // fontStyle: "normal",
    color: '#454545',
  },
  buttonDescription: {
    fontSize: 18,
    fontFamily: 'PTSansNarrow-Regular',
    color: '#454545',
  },
});