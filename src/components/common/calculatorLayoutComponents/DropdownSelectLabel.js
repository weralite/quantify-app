import React from 'react';
import { Text } from 'react-native';

const Label = ({ text }) => (
  <Text style={{ marginLeft: 10, fontSize: 20, color: 'grey' }}>
    {text}
  </Text>
);

export default Label;