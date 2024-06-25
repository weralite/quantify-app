import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useState } from 'react'
import SubmitButton from '../../common/buttons/SubmitButton'
import InputField from '../../common/inputs/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePicker from '../../common/inputs/UsePicker';
import CalculatorBody from '../../common/calculatorLayout/CalculatorBody';
import CalculatorHeader from '../../common/calculatorLayout/CalculatorHeader';
import CalculatorRow from '../../common/calculatorLayout/CalculatorRow';
import CalculatorCell from '../../common/calculatorLayout/CalculatorCell';
import CustomPicker from '../../common/inputs/CustomPicker';
import ResultCard from '../../common/assembledComponents/ResultCard';
import CellDividerLarge from '../../common/calculatorLayout/CellDividerLarge';
import Label from '../../common/calculatorLayout/CalculatorLabel';

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
      pieces = Math.ceil(pieces); // Round up to the nearest whole number
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
    <CalculatorBody>

      <CalculatorHeader
        title="Trallvirke"
        description="Ange virkets dimensioner och ytan som ska täckas."
      />

      <CalculatorRow>
        <CalculatorCell>
          <CellDividerLarge>

            <Label text="Bredd:" />

          </CellDividerLarge>
          <CellDividerLarge>

            <CustomPicker
              selectedValue={selectedWidth}
              onValueChange={handleSelectedWidthChange}
              items={widthOptions}
              label="Ange virkets bredd" />

          </CellDividerLarge>
        </CalculatorCell>

        <CalculatorCell>
          <CellDividerLarge>

            <Label text="Längd:" />

          </CellDividerLarge>
          <CellDividerLarge>

            <CustomPicker
              selectedValue={selectedLength}
              onValueChange={handleSelectedLengthChange}
              items={lengthOptions}
              label="Ange virkets längd" />

          </CellDividerLarge>
        </CalculatorCell>
      </CalculatorRow>

      <CalculatorRow>
        <CellDividerLarge>

          <InputField
            placeholder="M2"
            onChangeText={handleAreaChange}
            value={area}
            keyboardType="numeric" />

        </CellDividerLarge>
          <SubmitButton onPress={handleSubmit} />
      </CalculatorRow>

      <ResultCard
        showResultCard={showResultCard}
        setShowResultCard={setShowResultCard}
        result={result}
        onSave={saveResultsToNotes}
        onClose={handleReset}
        label={`Du behöver ${result} LPM inkl 10% marginal,  LPM exkl marginal)`}
      />
    </CalculatorBody>
  )
}

export default DeckBoardCalculator