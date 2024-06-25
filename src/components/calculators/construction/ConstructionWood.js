import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePicker from '../../common/inputs/UsePicker';
import CalculatorBody from '../../common/calculatorLayout/CalculatorBody';
import CalculatorHeader from '../../common/calculatorLayout/CalculatorHeader';
import CalculatorRow from '../../common/calculatorLayout/CalculatorRow';
import CalculatorCell from '../../common/calculatorLayout/CalculatorCell';
import InputField from '../../common/inputs/InputField'
import SubmitButton from '../../common/buttons/SubmitButton'
import CustomPicker from '../../common/inputs/CustomPicker';
import ResultCard from '../../common/assembledComponents/ResultCard';
import CellDividerLarge from '../../common/calculatorLayout/CellDividerLarge';
import Label from '../../common/calculatorLayout/CalculatorLabel';

const ConstructionWoodCalculator = () => {
  const [area, setArea] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [showResultCard, setShowResultCard] = useState(false);

  const lengthOptions = [
    '2500', '2700', '3000', '3300', '3600', '3900', '4200', '4500', '4800', '5100', '5400'
  ];

  const distanceOptions = [
    '200', '300', '400', '450', '500', '600', '900', '1200'
  ];


  const {
    selectedValue: selectedLength,
    handleValueChange: handleSelectedLengthChange
  } = usePicker(lengthOptions[6]);

  const {
    selectedValue: selectedDistance,
    handleValueChange: handleSelectedDistanceChange
  } = usePicker(distanceOptions[5]);

  const calculateResult = () => {
    const lumberRequirementPerSquareMeter = {
      '200': 5.00,
      '300': 3.33,
      '400': 2.50,
      '450': 2.25,
      '500': 2.00,
      '600': 1.67,
      '900': 1.12,
      '1200': 0.83
    };


    const requirement = lumberRequirementPerSquareMeter[selectedDistance];
    const totalLumber = requirement * parseFloat(area);
    const resultWithMargin = totalLumber * 1.10;

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
      return pieces;
    };

    const pieces = convertResult(result, selectedLength);
    const newNotes = notes
      ? `${notes}\n\nKonstruktion, ${area}m² (${result} LPM, inkl 10%),\n${pieces} ST Reglar á ${selectedLength}mm`
      : `Trall, ${area}m² (${result} LPM, inkl 10%)\n${pieces} ST, ${selectedLength}mm`;

    await AsyncStorage.setItem('notes', newNotes);
    handleReset();
  };

  return (
    <CalculatorBody>

      <CalculatorHeader
        title="Regel / Läkt"
        description="Ange yta och regelavstånd. Observera att till summan löpmeter (lm) ska längden av en regel eller läkt adderas."
      />

      <CalculatorRow>
        <CalculatorCell>
          <CellDividerLarge>
            <Label text="Avstånd:" />
          </CellDividerLarge>

          <CellDividerLarge>
            <CustomPicker
              selectedValue={selectedDistance}
              onValueChange={handleSelectedDistanceChange}
              items={distanceOptions}
              label="Ange cc-avstånd"
            />
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
              label="Ange virkets längd"
            />
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

          <SubmitButton
            onPress={handleSubmit} />

      </CalculatorRow>

      <ResultCard
        showResultCard={showResultCard}
        setShowResultCard={setShowResultCard}
        result={result}
        onSave={saveResultsToNotes}
        onClose={handleReset}
        label={`Du behöver ${result} löpmeter virke för att täcka en yta på ${area} m². Metervärdet inkluderar en marginal på 10% för spillvirke.`}
      />

    </CalculatorBody>
  )
}

export default ConstructionWoodCalculator;
