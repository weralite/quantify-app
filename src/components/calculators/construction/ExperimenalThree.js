import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import SubmitButton from '../../buttons/SubmitButton'
import InputField from '../../inputs/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePicker from '../../inputs/UsePicker';
import PickerComponentFour from '../../inputs/PickerComponentFour';
import ResultCard from '../../ResultCard';
import HeaderComponent from '../../HeaderComponent';
import DropdownSelectRow from '../../DropdownSelectRow';
import DropdownSelectCell from '../../DropdownSelectCell';
import CellDivider from '../../CellDivider';
import Label from '../../DropdownSelectLabel';

const Experimental = () => {
  const [area, setArea] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [increasedResult, setIncreasedResult] = React.useState(0);

  const lengthOptions = [
    '2500', '2700', '3000', '3300', '3600', '3900', '4200', '4500', '4800', '5100', '5400'
  ];

  const distanceOptions = [
    '200', '400', '450', '600', '900'
  ];

  const selectedThickness = '45';

  const {
    selectedValue: selectedLength,
    handleValueChange: handleSelectedLengthChange
  } = usePicker(lengthOptions[4]);

  const {
    selectedValue: selectedDistance,
    handleValueChange: handleSelectedDistanceChange
  } = usePicker(distanceOptions[3]);

  const calculateResult = () => {
    const UsageInMeters = 1000 / parseInt(selectedThickness);
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
      ? `${notes}\n\nKonstruktion, ${area}m² (${increasedResult} LPM, inkl 10%),\n${pieces} ST, x${selectedLength}mm`
      : `Trall, ${area}m² (${increasedResult} LPM, inkl 10%)\n${pieces} ST, ${selectedLength}mm`;

    await AsyncStorage.setItem('notes', newNotes);
    handleReset();
  };

  return (
    <View style={[styles.component]}>

      <HeaderComponent
        title="Regel / Läkt"
        description="Ange yta och regelavstånd. Till summan löpmeter (LPM) ska längden av vald regel eller läkt adderas."
      />

      <DropdownSelectRow>
        <DropdownSelectCell>
          <CellDivider>
            <Label text="Avstånd:" />
          </CellDivider>
          <CellDivider>
            <PickerComponentFour
              selectedValue={selectedDistance}
              onValueChange={handleSelectedDistanceChange}
              items={distanceOptions}
              label="Ange cc-avstånd"
            />
          </CellDivider>
        </DropdownSelectCell>


        <DropdownSelectCell>
          <CellDivider>
            <Label text="Längd:" />
          </CellDivider>
          <CellDivider>
            <PickerComponentFour
              selectedValue={selectedLength}
              onValueChange={handleSelectedLengthChange}
              items={lengthOptions}
              label="Ange virkets längd"
            />
          </CellDivider>
        </DropdownSelectCell>
      </DropdownSelectRow>

      <DropdownSelectRow>

        <InputField
          style={{ width: '50%' }}
          placeholder="M2"
          onChangeText={handleAreaChange}
          value={area}
          keyboardType="numeric" />

        <SubmitButton
          buttonWidth='50%'
          title="Beräkna"
          onPress={handleSubmit} />

      </DropdownSelectRow>


      <ResultCard
        result={result}
        increasedResult={increasedResult}
        onSave={saveResultsToNotes}
        onClose={handleReset}
        label={`Du behöver ${increasedResult} LPM inkl 10% marginal, (${result} LPM exkl marginal)`}
      />
    </View>
  )
}

export default Experimental

const styles = StyleSheet.create({
  component: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  inputSubmitRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

})