import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import SubmitButton from '../../buttons/SubmitButton'
import InputField from '../../inputs/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePicker from '../../inputs/UsePicker';
import PickerComponent from '../../inputs/PickerComponent';
import ComponentWrapper from '../../ComponentWrapper';
import HeaderComponent from '../../HeaderComponent';
import DropdownSelectRow from '../../DropdownSelectRow';
import DropdownSelectCell from '../../DropdownSelectCell';
import PickerComponentFour from '../../inputs/PickerComponentFour';
import ResultCard from '../../ResultCard';
import CellDivider from '../../CellDivider';
import Label from '../../DropdownSelectLabel';

const DeckBoards = () => {
  const [area, setArea] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [increasedResult, setIncreasedResult] = React.useState(0);

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
    const metersPerSquare = 1000 / parseInt(selectedWidth);
    const calculatedResult = metersPerSquare * parseFloat(area);
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
    <ComponentWrapper>

      <HeaderComponent
        title="Trall"
        description="Ange virkets dimensioner och ytan som ska täckas."
      />

      <DropdownSelectRow>
        <DropdownSelectCell>
          <CellDivider>

            <Label text="Bredd:" />

          </CellDivider>
          <CellDivider>

            <PickerComponentFour
              selectedValue={selectedWidth}
              onValueChange={handleSelectedWidthChange}
              items={widthOptions}
              label="Ange virkets bredd" />

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
              label="Ange virkets längd"/>

          </CellDivider>
        </DropdownSelectCell>
      </DropdownSelectRow>

      <DropdownSelectRow>
        <CellDivider>

          <InputField
            placeholder="M2"
            onChangeText={handleAreaChange}
            value={area}
            keyboardType="numeric" />

        </CellDivider>
        <CellDivider>

          <SubmitButton onPress={handleSubmit} />

        </CellDivider>
      </DropdownSelectRow>

      <ResultCard
        result={result}
        increasedResult={increasedResult}
        onSave={saveResultsToNotes}
        onClose={handleReset}
        label={`Du behöver ${increasedResult} LPM inkl 10% marginal, (${result} LPM exkl marginal)`}
      />
    </ComponentWrapper>
  )
}

export default DeckBoards