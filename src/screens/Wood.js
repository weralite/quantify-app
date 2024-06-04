import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import DeckBoards from '../components/calculators/timber.wood/DeckBoards'
import ConstructionElements from '../components/calculators/timber.wood/ConstructionElements'

const Wood = () => {
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
})