import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const CalculatorCell = ({ children, style, error }) => {
  const borderColorAnim = useRef(new Animated.Value(0)).current; // Step 2

  useEffect(() => { // Step 3
    if (error) {
      Animated.loop( // Loop the animation
        Animated.sequence([ // Sequence of animations
          Animated.timing(borderColorAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(borderColorAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    }
  }, [error, borderColorAnim]);

  const animatedBorderStyle = {
    borderColor: borderColorAnim.interpolate({ // Step 4
      inputRange: [0, 1],
      outputRange: ['red', '#FFA07A'], // Change colors as needed
    }),
  };

  return (
    <Animated.View // Step 5
      style={[
        styles.dropdownSelectCell,
        error && animatedBorderStyle,
        style,
      ]}>
      {children}
    </Animated.View>
  );
};

export default CalculatorCell;

const styles = StyleSheet.create({
  dropdownSelectCell: {
    width: '50%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
});