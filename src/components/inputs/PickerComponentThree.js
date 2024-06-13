import { text } from 'express';
import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';


const PickerComponent = ({ selectedValue, onValueChange, items, style }) => (
  <View style={[{ height: 40, justifyContent: 'center', }, style]}>
    <RNPickerSelect
      style={{
        inputIOS: { padding: 0, fontSize: 18, color: 'black' },
        inputAndroid: { padding: 0, fontSize: 18, color: 'black' },
        placeholder: { color: 'transparent' },
      }}
      useNativeAndroidPickerStyle={false}
      onValueChange={onValueChange}
      items={items}
      value={selectedValue}
      Icon={() => <Icon name="caret-down" size={18} color="black" style={{ marginTop: 5 }} />}
    />
  </View>
);

export default PickerComponent;