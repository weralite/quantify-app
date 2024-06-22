import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useState } from 'react'
import SubmitButton from '../../common/buttons/SubmitButton'
import InputField from '../../common/inputs/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePicker from '../../common/inputs/UsePicker';
import ComponentWrapper from '../../common/calculatorLayoutComponents/ComponentWrapper';
import HeaderComponent from '../../common/calculatorLayoutComponents/HeaderComponent';
import DropdownSelectRow from '../../common/calculatorLayoutComponents/DropdownSelectRow';
import DropdownSelectCell from '../../common/calculatorLayoutComponents/DropdownSelectCell';
import CustomPicker from '../../common/inputs/CustomPicker';
import ResultCard from '../../common/ResultCard';
import CellDivider from '../../common/calculatorLayoutComponents/CellDivider';
import Label from '../../common/calculatorLayoutComponents/DropdownSelectLabel';

const DeckBoardCalculator = () => {
  const [area, setArea] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [showResultCard, setShowResultCard] = useState(false);

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
    setResult(resultWithMargin.toFixed(2));
    setShowResultCard(true);
  };

  const handleAreaChange = (newArea) => {
    setArea(newArea);
    setShowResultCard(false);
  };

  const handleSubmit = () => {
    if (area !== '') {
      calculateResult();
    }
  };

  const handleReset = () => {
    setResult(0);
    setShowResultCard(false);
  };

  const saveResultsToNotes = async () => {
    const notes = await AsyncStorage.getItem('notes');

    const convertResult = (result, selectedLength) => {
      const resultInMeters = parseFloat(result);
      const selectedLengthInMeters = parseInt(selectedLength) / 1000;
      let pieces = resultInMeters / selectedLengthInMeters;
      pieces = Math.ceil(pieces);
      if (pieces % 2 !== 0) {
        pieces++;
      }
      return pieces;
    };

    const pieces = convertResult(result, selectedLength);

    const newNotes = notes
      ? `${notes}\n\nTrall, ${area}m² (${result} LPM, inkl 10%),\n${pieces} ST, ${selectedThickness}x${selectedWidth}x${selectedLength}mm`
      : `Trall, ${area}m² (${result} LPM, inkl 10%)\n${pieces} ST, ${selectedThickness}x${selectedWidth}x${selectedLength}mm`;

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

            <CustomPicker
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

            <CustomPicker
              selectedValue={selectedLength}
              onValueChange={handleSelectedLengthChange}
              items={lengthOptions}
              label="Ange virkets längd" />

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
        showResultCard={showResultCard}
        setShowResultCard={setShowResultCard}
        result={result}
        onSave={saveResultsToNotes}
        onClose={handleReset}
        label={`Du behöver ${result} LPM inkl 10% marginal, (${result} LPM exkl marginal)`}
      />
    </ComponentWrapper>
  )
}

export default DeckBoardCalculator