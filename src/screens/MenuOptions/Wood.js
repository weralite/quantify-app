import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import DeckBoardCalculator from '../../components/calculators/construction/DeckBoards'
import ConstructionWood from '../../components/calculators/construction/ConstructionWood'
import Animated, { FadeInUp, ZoomIn, SlideInDown, BounceIn } from 'react-native-reanimated';

const Wood = () => {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <View style={styles.ActivityIndicator}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }
  return (
    <ScrollView>
      <Animated.View style={[styles.screenContainer]}>

        <ConstructionWood />
        <DeckBoardCalculator />
        <DeckBoardCalculator />
        <DeckBoardCalculator />

      </Animated.View>
    </ScrollView>
  )
}

export default Wood

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