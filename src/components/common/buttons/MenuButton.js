import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import Arrow from '../../../assets/images/arrowalt.svg';

const MenuButton = ({ description, title, onPress, icon: Icon }) => {
  return (

    <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
      <View style={[styles.iconContainer]}>
      {Icon ? <Icon /> : null}
       </View>
       <View style={styles.boxbox}>
      <View style={styles.textContainer}>
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonDescription}>{description}</Text>
      </View>
      <Arrow />
      </View>
    </TouchableOpacity>
  );
}

export default MenuButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: "#FFF",
    height: 80,
    width: '100%',
    
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFD700",
    height: '100%',
    width: '25%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  // textContainer: {
  //   justifyContent: 'flex-start',
  // },

  boxbox: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  buttonTitle: {
    fontSize: 28,
    fontFamily: 'PTSansNarrow-Bold',
    color: '#454545',
  },
  buttonDescription: {
    fontSize: 18,
    fontFamily: 'PTSansNarrow-Regular',
    color: '#454545',
  },
});