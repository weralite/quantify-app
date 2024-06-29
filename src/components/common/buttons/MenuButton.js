import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React from 'react';

const MenuButton = ({ description, title, onPress, icon: Icon }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
      {Icon ? <Icon /> : null}
      <View>
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default MenuButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
    margin: 2,
    paddingLeft: 15,
    backgroundColor: "#FFD700",
    height: 80,

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