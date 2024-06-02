import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerComponent = ({ selectedValue, onValueChange, items, style }) => (
  <View style={[{ height: 40, justifyContent: 'center', borderWidth: 1, borderColor: 'gray' }, style]}>
    <Picker
      selectedValue={selectedValue}
      style={{ width: '100%' }}
      onValueChange={onValueChange}>
      {items.map((item, index) => <Picker.Item key={index} label={item} value={item} />)}
    </Picker>
  </View>
);

export default PickerComponent;