import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React from 'react'
import SubmitButton from '../../buttons/SubmitButton'
import ExitButton from '../../buttons/ExitButton';
import InputField from '../../inputs/InputField'

const ConstructionElements = () => {
  const [selectedWidth, setSelectedWidth] = React.useState('200');
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
        <Text style={[styles.sectionHeader]}>Regel</Text>
        <Text style={[styles.sectionContent]}>Ange yta och regelavstånd. Till summan löpmeter (LPM) ska
          längden av vald regel eller läkt
          adderas.</Text>
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

            <Picker.Item label="cc 200mm" value="200" />
            <Picker.Item label="cc 400mm" value="400" />
            <Picker.Item label="cc 450mm" value="450" />
            <Picker.Item label="cc 500mm" value="500" />
            <Picker.Item label="cc 600mm" value="600" />
            <Picker.Item label="cc 900mm" value="900" />


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

export default ConstructionElements

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