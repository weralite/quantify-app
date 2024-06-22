import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import usePicker from '../../common/inputs/UsePicker';
import ComponentWrapper from '../../common/calculatorLayoutComponents/ComponentWrapper';
import HeaderComponent from '../../common/calculatorLayoutComponents/HeaderComponent';
import DropdownSelectRow from '../../common/calculatorLayoutComponents/DropdownSelectRow';
import DropdownSelectCell from '../../common/calculatorLayoutComponents/DropdownSelectCell';
import FixedLabel from '../../common/labels/InfoLabel';
import InputFieldSmall from '../../common/inputs/InputFieldSmall'
import SubmitButton from '../../common/buttons/SubmitButton'
import CustomPicker from '../../common/inputs/CustomPicker';
import ResultCard from '../../common/ResultCard';
import CellDivider from '../../common/calculatorLayoutComponents/CellDivider';
import Label from '../../common/calculatorLayoutComponents/DropdownSelectLabel';
import UnitLabel from '../../common/labels/UnitLabel';
import CellDividerLabel from '../../common/calculatorLayoutComponents/CellDividerLabelOne';
import CellDividerLabelTwo from '../../common/calculatorLayoutComponents/CellDividerLabelTwo';

const ConstructionWoodCalculator = () => {
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [length, setLength] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [showResultCard, setShowResultCard] = useState(false);

  const selectedDensity = '1,40 t/m³';

  const sizeOptions = [
    '2/4', '4/8', '8/16', '16/32', '32/64'
  ];
  const lengthOptions = [
    '2500', '2700', '3000', '3300', '3600', '3900', '4200', '4500', '4800', '5100', '5400'
  ];

  const distanceOptions = [
    '200', '300', '400', '450', '500', '600', '900', '1200'
  ];

  const handleHeightChange = (newHeight) => {
    setHeight(newHeight);
  };
  const handleWidthChange = (newWidth) => {
    setWidth(newWidth);
  };
  const handleLengthChange = (newHeight) => {
    setLength(newHeight);
  };

  const {
    selectedValue: selectedSize,
    handleValueChange: handleSelectedSizeChange
  } = usePicker(sizeOptions[0]);

  const {
    selectedValue: selectedLength,
    handleValueChange: handleSelectedLengthChange
  } = usePicker(lengthOptions[4]);

  const {
    selectedValue: selectedDistance,
    handleValueChange: handleSelectedDistanceChange
  } = usePicker(distanceOptions[3]);

  const calculateResult = () => {
    const lumberRequirementPerSquareMeter = {
      '200': 5.00,
      '300': 3.33,
      '400': 2.50,
      '500': 2.00,
      '600': 1.67,
      '800': 1.25,
      '1000': 1.00,
      '1200': 0.83
    };


    const requirement = lumberRequirementPerSquareMeter[selectedDistance];
    const totalLumber = parseFloat(area) * requirement;
    const resultWithMargin = totalLumber * 1.10;

    setResult(resultWithMargin.toFixed(2));
    setShowResultCard(true);
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
      ? `${notes}\n\nKonstruktion`
      : `Trall,`;

    await AsyncStorage.setItem('notes', newNotes);
    handleReset();
  };

  return (
    <ComponentWrapper>

      <HeaderComponent
        title="Makadam"
        description="Ange stenstorlek samt mått i centimeter och beräkna önskad mängd i kubikmeter och ton."
      />

      <DropdownSelectRow>
        <DropdownSelectCell>
          <CellDivider>
            <Label text="Storlek:" />
          </CellDivider>

          <CellDivider>
            <CustomPicker
              selectedValue={selectedSize}
              onValueChange={handleSelectedSizeChange}
              items={sizeOptions}
              label="Ange storlek"
            />
          </CellDivider>
        </DropdownSelectCell>


        <DropdownSelectCell>
          <CellDivider>
            <Label text="Höjd:" />
          </CellDivider>
          <CellDividerLabel>
            <InputFieldSmall
              onChangeText={handleHeightChange}
              value={height}
              placeholder="30"
              keyboardType="numeric" />
          </CellDividerLabel>
          <CellDividerLabelTwo>
            <UnitLabel label="cm" />
          </CellDividerLabelTwo>
        </DropdownSelectCell>
      </DropdownSelectRow>
      
      <DropdownSelectRow>
      <DropdownSelectCell>
          <CellDivider>
            <Label text="Bredd:" />
          </CellDivider>
          <CellDividerLabel>
            <InputFieldSmall
              onChangeText={handleWidthChange}
              value={width}
              placeholder="200"
              keyboardType="numeric" />
          </CellDividerLabel>
          <CellDividerLabelTwo>
            <UnitLabel label="cm" />
          </CellDividerLabelTwo>
        </DropdownSelectCell>


        <DropdownSelectCell>
          <CellDivider>
            <Label text="Längd:" />
          </CellDivider>
          <CellDividerLabel>
            <InputFieldSmall
              onChangeText={handleLengthChange}
              value={length}
              placeholder="450"
              keyboardType="numeric" />
          </CellDividerLabel>
          <CellDividerLabelTwo>
            <UnitLabel label="cm" />
          </CellDividerLabelTwo>
        </DropdownSelectCell>
      </DropdownSelectRow>

      <DropdownSelectRow>
        <DropdownSelectCell>
          <CellDivider>
            <Label text="Densitet:" />
          </CellDivider>

          <CellDivider>
            <FixedLabel
              label={selectedDensity}
            />
          </CellDivider>
        </DropdownSelectCell>

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
        label={`Du behöver ${result} löpmeter virke för att täcka en yta på  m². Metervärdet inkluderar en marginal på 10% för spillvirke.`}
      />

    </ComponentWrapper>
  )
}

export default ConstructionWoodCalculator;
