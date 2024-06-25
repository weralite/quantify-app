import React from 'react';
import { Text, View } from 'react-native';

const CalculatorUnitLabel = ({ label }) => (
  <View style={{ height: 40, justifyContent: 'center' }}>
    <Text style={{  textAlign: 'left', fontSize: 18, color: 'black', marginTop: 1 }}>
      {label}
    </Text>
  </View>
);

export default CalculatorUnitLabel;