import React from 'react';
import { Text, View } from 'react-native';

const InfoLabel = ({ label }) => (
  <View style={{ height: 40, justifyContent: 'center' }}>
    <Text style={{  textAlign: 'center', fontSize: 20, color: 'black' }}>
      {label}
    </Text>
  </View>
);

export default InfoLabel;