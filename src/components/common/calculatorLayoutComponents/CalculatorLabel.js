import React from 'react';
import { Text } from 'react-native';

const CalculatorLabel = ({ text }) => (
  <Text style={{ marginLeft: 10, fontSize: 20, color: 'grey' }}>
    {text}
  </Text>
);

export default CalculatorLabel;