import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DeckBoards from '../components/calculators/timber.wood/DeckBoards'
import ConstructionElements from '../components/calculators/timber.wood/ConstructionElements'

const Wood = () => {
  return (
    <View>
      <DeckBoards />
      <ConstructionElements />
    </View>
  )
}

export default Wood

const styles = StyleSheet.create({
})