import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notes = () => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const loadNotes = async () => {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) {
        setNotes(savedNotes);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      await AsyncStorage.setItem('notes', notes);
    };

    saveNotes();
  }, [notes]);

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textInput}
        multiline={true}
        placeholder="För dina anteckningar här..."
        value={notes}
        onChangeText={setNotes}
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