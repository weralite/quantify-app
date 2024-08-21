import React from 'react';
import { Text } from 'react-native';

const CalculatorLabel = ({ text }) => (
  <Text 
  style={{ marginLeft: 10, fontSize: 18, color: 'grey' }}
  numberOfLines={1}
  adjustsFontSizeToFit
  >
    {text}
  </Text>
);

export default CalculatorLabel;