import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { runOnJS } from 'react-native-reanimated';



const ResultCard = ({ onSave, onClose, label, showResultCard }) => {
  const anim = useSharedValue(0);
  const [hasMeasured, setHasMeasured] = useState(false);
  const targetHeight = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => {
    return {
      height: targetHeight.value ? interpolate(anim.value, [0, 1], [0, targetHeight.value]) : 'auto',
          opacity: targetHeight.value ? anim.value : 0,
    };
  });
  useEffect(() => {
    if (hasMeasured) {
      if (showResultCard) {
        anim.value = withSpring(1, {
          damping: 10, // adjust for desired springiness
          stiffness: 250, // adjust for desired stiffness
        });
    }
    }
  }, [anim, hasMeasured, showResultCard]);
  
  const handleClose = () => {
    anim.value = withTiming(0, {}, () => {
      runOnJS(onClose)();
    });
  };

const handleSave = () => {
  anim.value = withTiming(0, {}, () => {
    runOnJS(onSave)();
  });
};

  return (
    <Animated.View
      key={label}
      style={[styles.resultCard, animStyle]}
      onLayout={({ nativeEvent }) => {
        if (!hasMeasured) {
          const height = nativeEvent.layout.height;
          targetHeight.value = height;
          setHasMeasured(true);
        }
      }}
    >
      <View style={styles.innerCard}>
          <Text style={styles.cardText}>{label}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Spara" onPress={handleSave} />
            <Button title="Stäng" onPress={handleClose} />
          </View>
          </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  resultCard: {
    width: '100%',
    display: 'flex',
    opacity: 0,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: 150,
  },

  innerCard: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    gap: 10,
    minHeight: 120,
  },

  cardText: {
    fontSize: 18,
    fontFamily: 'Arial',
    color: '#000',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ResultCard;