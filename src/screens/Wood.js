import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import DeckBoards from '../components/calculators/construction/DeckBoards'
import ConstructionElements from '../components/calculators/construction/ConstructionElements'

const Wood = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request that takes 2 seconds to complete
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
      <View style={[styles.screenContainer]}>
        <DeckBoards />
        <ConstructionElements />
      </View>
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
    padding: 10,
    gap: 20,
  },

  ActivityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})