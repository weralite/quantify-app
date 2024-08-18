import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import CrushedRock from '../../components/calculators/gravel/CrushedRock'
import RockFlour from '../../components/calculators/gravel/RockFlour'
import Animated, { SlideInRight, SlideInLeft, ZoomIn, FadeIn } from 'react-native-reanimated';

const Gravel = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.ActivityIndicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <ScrollView>
     <Animated.View entering={FadeIn} style={[styles.screenContainer]}>

        <CrushedRock />
        <RockFlour />
        
      </Animated.View>
    </ScrollView>
  )
}

export default Gravel

const styles = StyleSheet.create({

  screenContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  ActivityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})