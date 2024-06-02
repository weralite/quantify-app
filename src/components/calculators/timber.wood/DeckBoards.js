import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React from 'react'
import SubmitButton from '../../buttons/SubmitButton'
import ExitButton from '../../buttons/ExitButton';
import InputField from '../../inputs/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePicker from '../../UsePicker';
import PickerComponent from '../../PickerComponent';

const DeckBoards = () => {
  const [area, setArea] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [increasedResult, setIncreasedResult] = React.useState(0);
  const screenWidth = Dimensions.get('window').width;

  const thicknessOptions = ['22', '28', '34'];
  const widthOptions = ['95', '120', '145'];
  const lengthOptions = ['3000', '3300', '3600', '3900', '4200', '4500', '4800', '5100', '5400'];

  const {
    selectedValue: selectedThickness,
    handleValueChange: handleSelectedThicknessChange
  } = usePicker(thicknessOptions[1]);

  const {
    selectedValue: selectedWidth,
    handleValueChange: handleSelectedWidthChange
  } = usePicker(widthOptions[1]);

  const {
    selectedValue: selectedLength,
    handleValueChange: handleSelectedLengthChange
  } = usePicker(lengthOptions[4]);

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

    const convertIncreasedResult = (increasedResult, selectedLength) => {
      const increasedResultInMeters = parseFloat(increasedResult);
      const selectedLengthInMeters = parseInt(selectedLength) / 1000;
      let pieces = increasedResultInMeters / selectedLengthInMeters;
      pieces = Math.ceil(pieces);
      if (pieces % 2 !== 0) {
        pieces++;
      }
      return pieces;
    };

    const pieces = convertIncreasedResult(increasedResult, selectedLength);

    const newNotes = notes
      ? `${notes}\n\nTrall, ${area}m² (${increasedResult} LPM, inkl 10%),\n${pieces} ST, ${selectedThickness}x${selectedWidth}x${selectedLength}mm`
      : `Trall, ${area}m² (${increasedResult} LPM, inkl 10%)\n${pieces} ST, ${selectedThickness}x${selectedWidth}x${selectedLength}mm`;

    await AsyncStorage.setItem('notes', newNotes);
    handleReset();
  };

  return (
    <View style={[styles.sectionContainer]}>

      <View>
        <Text style={[styles.sectionHeader]}>Trall</Text>
        <Text style={[styles.sectionContent]}>Ange virkets dimensioner och ytan som ska täckas.</Text>
      </View>

      <View style={[styles.inputRowOne]}>

        <PickerComponent
          selectedValue={selectedThickness}
          onValueChange={handleSelectedThicknessChange}
          items={thicknessOptions}
          style={{ width: '35%' }}
        />
        <PickerComponent
          selectedValue={selectedWidth}
          onValueChange={handleSelectedWidthChange}
          items={widthOptions}
          style={{ width: '35%' }}
        />

      </View>

      <View style={[styles.inputRowTwo]}>

        <PickerComponent
          selectedValue={selectedLength}
          onValueChange={handleSelectedLengthChange}
          items={lengthOptions}
          style={{ width: '35%' }}
        />

        <InputField
          style={{ width: '35%' }}
          placeholder="M2"
          onChangeText={handleAreaChange}
          value={area}
          keyboardType="numeric" />

        <SubmitButton buttonWidth={95} title="Beräkna" onPress={handleSubmit} />

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
    gap: 10,
  },
  inputRowTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    margin: 10,
  },
})