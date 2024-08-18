import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import usePicker from '../../common/inputs/UsePicker';
import CalculatorBody from '../../common/calculatorLayout/CalculatorBody';
import CalculatorHeader from '../../common/calculatorLayout/CalculatorHeader';
import CalculatorRow from '../../common/calculatorLayout/CalculatorRow';
import CalculatorCell from '../../common/calculatorLayout/CalculatorCell';
import InputFieldSmall from '../../common/inputs/InputFieldSmall'
import SubmitButton from '../../common/buttons/SubmitButton'
import CustomPicker from '../../common/inputs/CustomPicker';
import ResultCard from '../../common/assembledComponents/ResultCard';
import CellDividerLarge from '../../common/calculatorLayout/CellDividerLarge';
import Label from '../../common/calculatorLayout/CalculatorLabel';
import UnitLabel from '../../common/calculatorLayout/CalculatorUnitLabel';
import CellDividerMedium from '../../common/calculatorLayout/CellDividerMedium';
import CellDividerSmall from '../../common/calculatorLayout/CellDividerSmall';

const CrushedRockCalculator = () => {
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [length, setLength] = React.useState('');
  const [volume, setVolume] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [weightWithCompression, setWeightWithCompression] = React.useState(0);
  const [showResultCard, setShowResultCard] = useState(false);

  const densityOptions = [1.25, 1.35, 1.40, 1.55
  ];

  const sizeOptions = [
    '2-4', '4-8', '8-16', '16-32', '32-64', '100-150'
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
  } = usePicker(sizeOptions[2]);

  const {
    selectedValue: selectedDensity,
    handleValueChange: handleSelectedDensityChange
  } = usePicker(densityOptions[2]);


  const calculateResult = () => {
    const height_m = height / 100;
    const width_m = width / 100;
    const length_m = length / 100;


    const volume = height_m * width_m * length_m;
    const weight = volume * selectedDensity;
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
    setShowResultCard(false);
  };

  const saveResultsToNotes = async () => {
    const notes = await AsyncStorage.getItem('notes');

    const newNotes = notes
      ? `${notes}\n\nMakadam ${selectedSize}mm\nVolym: ${volume} m³, Vikt: ${weight} ton, Vikt med 15% kompression: ${weightWithCompression} ton.`
      : `Volym: ${volume} m³, Vikt: ${weight} ton, Vikt med 15% kompression: ${weightWithCompression} ton.,`;

    await AsyncStorage.setItem('notes', newNotes);
    handleReset();
  };

  return (
    <CalculatorBody>

      <CalculatorHeader
        title="Makadam"
        description="Ange stenstorlek samt yta i centimeter och beräkna mängd i kubikmeter och ton. Rekommenderad densitet är 1.4 t/m³."
      />

      <CalculatorRow>

        <CalculatorCell>
          <CellDividerLarge>
            <Label text="Höjd:" />
          </CellDividerLarge>
          <CellDividerMedium>
            <InputFieldSmall
              onChangeText={handleHeightChange}
              value={height}
              placeholder="30"
              keyboardType="numeric" />
          </CellDividerMedium>
          <CellDividerSmall>
            <UnitLabel label="cm" />
          </CellDividerSmall>
        </CalculatorCell>
        <CalculatorCell>
          <CellDividerLarge>
            <Label text="Storlek:" />
          </CellDividerLarge>

          <CellDividerLarge>
            <CustomPicker
              selectedValue={selectedSize}
              onValueChange={handleSelectedSizeChange}
              items={sizeOptions}
              label="Ange storlek (mm)"
            />
          </CellDividerLarge>
        </CalculatorCell>


      </CalculatorRow>

      <CalculatorRow>
        <CalculatorCell>
          <CellDividerLarge>
            <Label text="Bredd:" />
          </CellDividerLarge>
          <CellDividerMedium>
            <InputFieldSmall
              onChangeText={handleWidthChange}
              value={width}
              placeholder="200"
              keyboardType="numeric" />
          </CellDividerMedium>
          <CellDividerSmall>
            <UnitLabel label="cm" />
          </CellDividerSmall>
        </CalculatorCell>
        <CalculatorCell>
          <CellDividerLarge>
            <Label text="Densitet:" />
          </CellDividerLarge>

          <CellDividerLarge>
            <CustomPicker
              selectedValue={selectedDensity}
              onValueChange={handleSelectedDensityChange}
              items={densityOptions}
              label="Ange densitet (t/m³)"
            />
          </CellDividerLarge>
        </CalculatorCell>
      </CalculatorRow>

      <CalculatorRow>
        <CalculatorCell>
          <CellDividerLarge>
            <Label text="Längd:" />
          </CellDividerLarge>
          <CellDividerMedium>
            <InputFieldSmall
              onChangeText={handleLengthChange}
              value={length}
              placeholder="450"
              keyboardType="numeric" />
          </CellDividerMedium>
          <CellDividerSmall>
            <UnitLabel label="cm" />
          </CellDividerSmall>
        </CalculatorCell>



          <SubmitButton
            onPress={handleSubmit} />


      </CalculatorRow>

      <ResultCard
        showResultCard={showResultCard}
        setShowResultCard={setShowResultCard}
        weight={weight}
        weightWithCompression={weightWithCompression}
        onSave={saveResultsToNotes}
        onClose={handleReset}
        label={`\nVolym: ${volume} m³\nVikt: ${weight} ton,\nVikt med 15% kompression: ${weightWithCompression} ton.`}
      />

    </CalculatorBody>
  )
}

export default CrushedRockCalculator;
