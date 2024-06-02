import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const Notes = () => {
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textInput}
        multiline={true}
        placeholder="För dina anteckningar här..."
      />
    </View>
  )
}

export default Notes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    textAlignVertical: 'top',
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 16,
    padding: 10,
  },
})