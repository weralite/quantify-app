import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePicker from '../../inputs/UsePicker';
import ComponentWrapper from '../../ComponentWrapper';
import HeaderComponent from '../../HeaderComponent';
import DropdownSelectRow from '../../DropdownSelectRow';
import DropdownSelectCell from '../../DropdownSelectCell';
import InputField from '../../inputs/InputField'
import SubmitButton from '../../buttons/SubmitButton'
import PickerComponentFour from '../../inputs/PickerComponentFour';
import ResultCard from '../../ResultCard';
import CellDivider from '../../CellDivider';
import Label from '../../DropdownSelectLabel';

const ConstructionWoodCalculator = () => {
  const [area, setArea] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [showResultCard, setShowResultCard] = useState(false); 

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
      ? `${notes}\n\nKonstruktion, ${area}m² (${result} LPM, inkl 10%),\n${pieces} ST Reglar á ${selectedLength}mm`
      : `Trall, ${area}m² (${result} LPM, inkl 10%)\n${pieces} ST, ${selectedLength}mm`;

    await AsyncStorage.setItem('notes', newNotes);
    handleReset();
  };

  return (
    <ComponentWrapper>

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
        <CellDivider>
          <InputField
            placeholder="M2"
            onChangeText={handleAreaChange}
            value={area}
            keyboardType="numeric" />
        </CellDivider>

        <CellDivider>
          <SubmitButton
            onPress={handleSubmit} />
        </CellDivider>

      </DropdownSelectRow>

        <ResultCard
          showResultCard={showResultCard}
          setShowResultCard={setShowResultCard}
          result={result}
          onSave={saveResultsToNotes}
          onClose={handleReset}
          label={`Du behöver ${result} löpmeter virke för att täcka en yta på ${area} m². Metervärdet inkluderar en marginal på 10% för spillvirke.`}
        />

    </ComponentWrapper>
  )
}

export default ConstructionWoodCalculator;
