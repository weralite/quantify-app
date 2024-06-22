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
import CellDividerMedium from '../../common/calculatorLayoutComponents/CellDividerMedium';
import CellDividerLabelTwo from '../../common/calculatorLayoutComponents/CellDividerSmall';
import CellDividerSmall from '../../common/calculatorLayoutComponents/CellDividerSmall';

const ConstructionWoodCalculator = () => {
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [length, setLength] = React.useState('');
  const [volume, setVolume] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [weightWithCompression, setWeightWithCompression] = React.useState(0);
  const [result, setResult] = React.useState(0);
  const [showResultCard, setShowResultCard] = useState(false);

  const selectedDensity = 1.40;

  const sizeOptions = [
    '2/4', '4/8', '8/16', '16/32', '32/64'
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


  const calculateResult = () => {
    const height_m = height / 100;
    const width_m = width / 100;
    const length_m = length / 100;

    // Calculate volume in cubic meters
    const volume = height_m * width_m * length_m;

    // Calculate weight
    const weight = volume * selectedDensity;

    // Calculate weight with 15% compression
    const weightWithCompression = weight * 1.15;

    // Set the results in state
    setVolume(volume.toFixed(2));
    setWeight(weight.toFixed(2));
    setWeightWithCompression(weightWithCompression.toFixed(2));
    setShowResultCard(true);
  };




  const handleSubmit = () => {
    if (height !== '' && width !== '' && length !== '') {
      calculateResult();
    }
  };

  const handleReset = () => {
    setResult(0);
    setShowResultCard(false);
  };

  const saveResultsToNotes = async () => {
    const notes = await AsyncStorage.getItem('notes');

    const newNotes = notes
      ? `${notes}\n\nVolym: ${volume} m³, Vikt: ${weight} ton, Vikt med 15% kompression: ${weightWithCompression} ton.`
      : `Volym: ${volume} m³, Vikt: ${weight} ton, Vikt med 15% kompression: ${weightWithCompression} ton.,`;

    await AsyncStorage.setItem('notes', newNotes);
    handleReset();
  };

  return (
    <ComponentWrapper>

      <HeaderComponent
        title="Stenmjöl"
        description="Ange stenstorlek samt mått i centimeter och beräkna önskad mängd i kubikmeter och ton."
      />

      <DropdownSelectRow>

        <DropdownSelectCell>
          <CellDivider>
            <Label text="Höjd:" />
          </CellDivider>
          <CellDividerMedium>
            <InputFieldSmall
              onChangeText={handleHeightChange}
              value={height}
              placeholder="30"
              keyboardType="numeric" />
          </CellDividerMedium>
          <CellDividerLabelTwo>
            <UnitLabel label="cm" />
          </CellDividerLabelTwo>
        </DropdownSelectCell>
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


      </DropdownSelectRow>

      <DropdownSelectRow>
        <DropdownSelectCell>
          <CellDivider>
            <Label text="Bredd:" />
          </CellDivider>
          <CellDividerMedium>
            <InputFieldSmall
              onChangeText={handleWidthChange}
              value={width}
              placeholder="200"
              keyboardType="numeric" />
          </CellDividerMedium>
          <CellDividerLabelTwo>
            <UnitLabel label="cm" />
          </CellDividerLabelTwo>
        </DropdownSelectCell>

        <DropdownSelectCell>
          <CellDivider>
            <Label text="Densitet:" />
          </CellDivider>

          <CellDivider>
            <FixedLabel
             label={`${selectedDensity}t/m³`}
            />
          </CellDivider>
        </DropdownSelectCell>

      </DropdownSelectRow>

      <DropdownSelectRow>
        <DropdownSelectCell>
          <CellDivider>
            <Label text="Längd:" />
          </CellDivider>
          <CellDividerMedium>
            <InputFieldSmall
              onChangeText={handleLengthChange}
              value={length}
              placeholder="450"
              keyboardType="numeric" />
          </CellDividerMedium>
          <CellDividerLabelTwo>
            <UnitLabel label="cm" />
          </CellDividerLabelTwo>
        </DropdownSelectCell>


        <CellDivider>
          <SubmitButton
            onPress={handleSubmit} />
        </CellDivider>

      </DropdownSelectRow>

      <ResultCard
        showResultCard={showResultCard}
        setShowResultCard={setShowResultCard}
        weight={weight}
        weightWithCompression={weightWithCompression}
        onSave={saveResultsToNotes}
        onClose={handleReset}
        label={`Volym: ${volume} m³\nVikt: ${weight} ton,\nVikt med 15% kompression: ${weightWithCompression} ton.`}
      />

    </ComponentWrapper>
  )
}

export default ConstructionWoodCalculator;
