import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Body = () => {
  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.bodyText}>Body</Text>
    </View>
  )
}

export default Body

const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: 'green',
        padding: 10,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
    },
    bodyText: {
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
    },
})