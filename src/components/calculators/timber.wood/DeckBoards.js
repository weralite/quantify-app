import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React from 'react'
import SubmitButton from '../../buttons/SubmitButton'
import ExitButton from '../../buttons/ExitButton';
import InputField from '../../inputs/InputField'

const DeckBoards = () => {
  const [selectedWidth, setSelectedWidth] = React.useState('120');
  const [area, setArea] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [increasedResult, setIncreasedResult] = React.useState(0);

  const screenWidth = Dimensions.get('window').width;

  const calculateResult = () => {
    const selectedWidthInMeters = 1000 / parseInt(selectedWidth);
    const calculatedResult = selectedWidthInMeters * parseFloat(area);
    const resultWithMargin = calculatedResult * 1.10;
    setResult(calculatedResult.toFixed(2));
    setIncreasedResult(resultWithMargin.toFixed(2));
  };

  const handleAreaChange = (newArea) => {
    setArea(newArea);
  };

  const handleSelectedWidthChange = (newSelectedWidth) => {
    setSelectedWidth(newSelectedWidth);
  };

  const handleSubmit = () => {
    if (area !== '') {
      calculateResult();
    }
  };

  const handleReset = () => {
    setResult(0);
  };

  return (
    <View style={[styles.sectionContainer]}>

      <View>
        <Text style={[styles.sectionHeader]}>Trall</Text>
        <Text style={[styles.sectionContent]}>Ange ytan som ska täckas och virkets bredd.</Text>
      </View>


      <View style={[styles.inputContainer]}>

        <InputField
          style={{ width: screenWidth * 0.20 }}
          placeholder="M2"
          onChangeText={handleAreaChange}
          value={area}
          keyboardType="numeric" />



        <View style={{ height: 40, justifyContent: 'center', borderWidth: 1, borderColor: 'gray' }}>
          <Picker
            selectedValue={selectedWidth}
            style={{ width: screenWidth * 0.45 }}
            onValueChange={handleSelectedWidthChange}>

            <Picker.Item label="95mm" value="95" />
            <Picker.Item label="120mm" value="120" />
            <Picker.Item label="145mm" value="145" />

          </Picker>
        </View>

        <SubmitButton buttonWidth={screenWidth * 0.20} title="Submit" onPress={handleSubmit} />

      </View>

      {result !== 0 && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Du behöver {increasedResult} LPM inkl 10% marginal, ({result} LPM exkl marginal)</Text>
          <ExitButton title="X" onPress={handleReset} />
        </View>
      )}
    </View>
  )
}

export default DeckBoards

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})