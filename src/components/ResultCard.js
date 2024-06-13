import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultCard = ({ result, onSave, onClose, label }) => {
  return (
    result !== 0 && (
      <View style={styles.resultCard}>
        <Text>{label}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Spara" onPress={onSave} />
          <Button title="Stäng" onPress={onClose} />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
    resultCard: {
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginTop: 20,
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