import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import SubmitButton from '../../buttons/SubmitButton'
import InputField from '../../inputs/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePicker from '../../UsePicker';
import PickerComponent from '../../PickerComponent';

const DeckBoards = () => {
  const [area, setArea] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [increasedResult, setIncreasedResult] = React.useState(0);

  const thicknessOptions = ['45'];
  const widthOptions = ['45', '70', '95', '120', '145'];
  const lengthOptions = ['3000', '3300', '3600', '3900', '4200', '4500', '4800', '5100', '5400'];
  const distanceOptions = ['200', '400', '450', '600', '900'];

  const {
    selectedValue: selectedThickness,
    handleValueChange: handleSelectedThicknessChange
  } = usePicker(thicknessOptions[0]);

  const {
    selectedValue: selectedWidth,
    handleValueChange: handleSelectedWidthChange
  } = usePicker(widthOptions[1]);

  const {
    selectedValue: selectedLength,
    handleValueChange: handleSelectedLengthChange
  } = usePicker(lengthOptions[4]);

  const {
    selectedValue: selectedDistance,
    handleValueChange: handleSelectedDistanceChange
  } = usePicker(distanceOptions[4]);

  const calculateResult = () => {
    const UsageInMeters = 1000 / parseInt(selectedWidth);
    const calculatedResult = UsageInMeters * parseFloat(area);
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
    <View style={[styles.componentBox]}>

      <View style={[styles.sectionWrapper]}>
        <Text style={[styles.sectionHeader]}>Regel</Text>
        <Text style={[styles.sectionContent]}>Ange yta och regelavstånd. Till summan löpmeter (LPM) ska
          längden av vald regel eller läkt
          adderas.</Text>
      </View>

      <View style={[styles.inputRowOne]}>

        <PickerComponent
          selectedValue={selectedThickness}
          onValueChange={handleSelectedThicknessChange}
          items={thicknessOptions}
          style={{ width: '33%' }}
        />
        <PickerComponent
          selectedValue={selectedWidth}
          onValueChange={handleSelectedWidthChange}
          items={widthOptions}
          style={{ width: '33%' }}
        />

        <PickerComponent
          selectedValue={selectedLength}
          onValueChange={handleSelectedLengthChange}
          items={lengthOptions}
          style={{ width: '33%' }}
        />

      </View>

      <View style={[styles.inputRowTwo]}>

      <PickerComponent
          selectedValue={selectedDistance}
          onValueChange={handleSelectedDistanceChange}
          items={distanceOptions}
          style={{ width: '33%' }}
        />

        <InputField
          style={{ width: '33%' }}
          placeholder="M2"
          onChangeText={handleAreaChange}
          value={area}
          keyboardType="numeric" />

        <SubmitButton
          buttonWidth='33%'
          title="Beräkna"
          onPress={handleSubmit} />

      </View>

      {result !== 0 && (
        <View style={[styles.resultCard]}>
          <Text>Du behöver {increasedResult} LPM inkl 10% marginal, ({result} LPM exkl marginal)</Text>
          <View style={[styles.buttonContainer]}>
            <Button title="Spara" onPress={saveResultsToNotes} />
            <Button title="Stäng" onPress={handleReset} />
          </View>
        </View>
      )}
    </View>
  )
}

export default DeckBoards

const styles = StyleSheet.create({
  componentBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },

  sectionWrapper: {
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
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
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5,
  },
  inputRowTwo: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  resultCard: {
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginTop: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
  },
})