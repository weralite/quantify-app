import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import SubmitButton from '../../buttons/SubmitButton'
import InputField from '../../inputs/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePicker from '../../inputs/UsePicker';
import PickerComponent from '../../inputs/PickerComponent';
import PickerComponentTwo from '../../inputs/PickerComponentTwo';
import PickerComponentThree from '../../inputs/PickerComponentThree';

const Experimental = () => {
  const [area, setArea] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [increasedResult, setIncreasedResult] = React.useState(0);

  const thicknessOptions = ['45'];
  const widthOptions = ['45', '70', '95', '120', '145'];
  const lengthOptions = [
    { label: '3000mm', value: '3000' },
    { label: '3300mm', value: '3300' },
    { label: '3600mm', value: '3600' },
    { label: '3900mm', value: '3900' },
    { label: '4200mm', value: '4200' },
    { label: '4500mm', value: '4500' },
    { label: '4800mm', value: '4800' },
    { label: '5100mm', value: '5100' },
    { label: '5400mm', value: '5400' },
  ];
  const distanceOptions = [
    { label: 'cc 200', value: '200' },
    { label: 'cc 400 ', value: '400' },
    { label: 'cc 450 ', value: '450' },
    { label: 'cc 600 ', value: '600' },
    { label: 'cc 900 ', value: '900' },
  ];

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

      <View style={[styles.headerWrapper]}>
        <Text style={[styles.headerLine]}>Regel</Text>
        <Text style={[styles.headerContent]}>Ange yta och regelavstånd. Till summan löpmeter (LPM) ska
          längden av vald regel eller läkt
          adderas.</Text>
      </View>

      <View style={[styles.inputRowOne]}>
      <View style={[styles.pickerBox]}>
          <Text  style={{ width: '45%', padding: 5, fontSize: 18, }}>
            Avstånd:
          </Text>
        <PickerComponentThree
          selectedValue={selectedDistance}
          onValueChange={handleSelectedDistanceChange}
          items={distanceOptions}
          style={{ width: '55%' }}
        />
      </View>

        <View style={[styles.pickerBox]}>
          <Text  style={{ width: '45%', padding: 5, fontSize: 18, }}>
            Längd:
          </Text>
          <PickerComponentThree
            selectedValue={selectedLength}
            onValueChange={handleSelectedLengthChange}
            items={lengthOptions}
            style={{ width: '55%' }}
          />
        </View>


      </View>

      <View style={[styles.inputRowTwo]}>

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

export default Experimental

const styles = StyleSheet.create({
  componentBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  headerWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  headerLine: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  headerContent: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  inputRowOne: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5,
  },
  inputRowTwo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  pickerBox: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1, borderColor: 'gray'
  },

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
})