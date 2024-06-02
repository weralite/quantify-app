import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React from 'react'
import SubmitButton from '../../buttons/SubmitButton'
import ExitButton from '../../buttons/ExitButton';
import InputField from '../../inputs/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeckBoards = () => {
  const [selectedThickness, setSelectedThickness] = React.useState('28');
  const [selectedWidth, setSelectedWidth] = React.useState('120');
  const [selectedLength, setSelectedLength] = React.useState('4200');
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
  const handleSelectedThicknessChange = (newSelectedThickness) => {
    setSelectedThickness(newSelectedThickness);
  };
  const handleSelectedLengthChange = (newSelectedLength) => {
    setSelectedLength(newSelectedLength);
  };

  const handleSubmit = () => {
    if (area !== '') {
      calculateResult();
    }
  };

  const handleReset = () => {
    setResult(0);
  };

  const saveResultsToNotes = async () => {
    const notes = await AsyncStorage.getItem('notes');
    const newNotes = notes
      ? `${notes}\n\nTrall, ${area}m2\n${increasedResult} LPM (inkl 10%), ${selectedThickness}x${selectedWidth}x${selectedLength}mm`
      : `Trall, ${area}m2\n${increasedResult} LPM (inkl 10%), ${selectedThickness}x${selectedWidth}x${selectedLength}mm`;
    await AsyncStorage.setItem('notes', newNotes);
  };

  return (
    <View style={[styles.sectionContainer]}>

      <View>
        <Text style={[styles.sectionHeader]}>Trall</Text>
        <Text style={[styles.sectionContent]}>Ange ytan som ska täckas och virkets dimension.</Text>
      </View>

      <View style={[styles.inputRowOne]}>

        <View style={{ height: 40, justifyContent: 'center', borderWidth: 1, borderColor: 'gray' }}>
          <Picker
            selectedValue={selectedThickness}
            style={{ width: screenWidth * 0.30 }}
            onValueChange={handleSelectedThicknessChange}>

            <Picker.Item label="22" value="22" />
            <Picker.Item label="28" value="28" />
            <Picker.Item label="34" value="34" />

          </Picker>
        </View>

        <View style={{ height: 40, justifyContent: 'center', borderWidth: 1, borderColor: 'gray' }}>
          <Picker
            selectedValue={selectedWidth}
            style={{ width: screenWidth * 0.36 }}
            onValueChange={handleSelectedWidthChange}>

            <Picker.Item label="95" value="95" />
            <Picker.Item label="120" value="120" />
            <Picker.Item label="145" value="145" />

          </Picker>
        </View>

      </View>

      <View style={[styles.inputRowTwo]}>

        <InputField
          style={{ width: screenWidth * 0.20 }}
          placeholder="M2"
          onChangeText={handleAreaChange}
          value={area}
          keyboardType="numeric" />



        <View style={{ height: 40, justifyContent: 'center', borderWidth: 1, borderColor: 'gray' }}>
          <Picker
            selectedValue={selectedLength}
            style={{ width: screenWidth * 0.45 }}
            onValueChange={handleSelectedLengthChange}>

            <Picker.Item label="3000" value="3000" />
            <Picker.Item label="3300" value="3300" />
            <Picker.Item label="3600" value="3600" />
            <Picker.Item label="3900" value="3900" />
            <Picker.Item label="4200" value="4200" />
            <Picker.Item label="4500" value="4500" />
            <Picker.Item label="4800" value="4800" />
            <Picker.Item label="5100" value="5100" />
            <Picker.Item label="5400" value="5400" />
  

          </Picker>
        </View>

        <SubmitButton buttonWidth={screenWidth * 0.20} title="Beräkna" onPress={handleSubmit} />

      </View>

      {result !== 0 && (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text>Du behöver {increasedResult} LPM inkl 10% marginal, ({result} LPM exkl marginal)</Text>
          <View style={[styles.buttonContainer]}>
            <Button title="Spara" onPress={saveResultsToNotes} />
            <Button title="Avbryt" onPress={handleReset} />
          </View>
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
  inputRowOne: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    gap: 9,
  },
  inputRowTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    margin: 10,
  },
})