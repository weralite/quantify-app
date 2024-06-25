import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePicker from '../../common/inputs/UsePicker';
import CalculatorBody from '../../common/calculatorLayoutComponents/CalculatorBody';
import CalculatorHeader from '../../common/calculatorLayoutComponents/CalculatorHeader';
import CalculatorRow from '../../common/calculatorLayoutComponents/CalculatorRow';
import CalculatorCell from '../../common/calculatorLayoutComponents/CalculatorCell';
import InputFieldSmall from '../../common/inputs/InputFieldSmall'
import SubmitButton from '../../common/buttons/SubmitButton'
import CustomPicker from '../../common/inputs/CustomPicker';
import ResultCard from '../../common/ResultCard';
import CellDividerLarge from '../../common/calculatorLayoutComponents/CellDividerLarge';
import Label from '../../common/calculatorLayoutComponents/CalculatorLabel';
import UnitLabel from '../../common/calculatorLayoutComponents/CalculatorUnitLabel';
import CellDividerMedium from '../../common/calculatorLayoutComponents/CellDividerMedium';
import CellDividerSmall from '../../common/calculatorLayoutComponents/CellDividerSmall';
import { validateFields } from '../../../utils/ValidateFields';
import InputfieldUnit from '../../common/assembledComponents/InputfieldUnit';
import LabeledPicker from '../../common/assembledComponents/LabeledPicker';

const RockFlourCalculator = () => {
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [length, setLength] = React.useState('');
  const [volume, setVolume] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [weightWithCompression, setWeightWithCompression] = React.useState(0);
  const [showResultCard, setShowResultCard] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [widthError, setWidthError] = useState(false);
  const [lengthError, setLengthError] = useState(false);

  const densityOptions = [1.50, 1.60
  ];

  const sizeOptions = [
    '0-2', '0-4', '0-5', '0-6', '0-8'
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
  } = usePicker(sizeOptions[1]);

  const {
    selectedValue: selectedDensity,
    handleValueChange: handleSelectedDensityChange
  } = usePicker(densityOptions[0]);


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
    // Array of field validators
    const fields = [
      { value: height, setError: setHeightError },
      { value: width, setError: setWidthError },
      { value: length, setError: setLengthError }
    ];

    const isValid = validateFields(fields);

    if (isValid) {
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
        title="Stenmjöl"
        description="
        Ange stenstorlek samt yta i centimeter och beräkna mängd i kubikmeter och ton. 
        Rekommenderad densitet är 1.4 t/m³."
      />

      <CalculatorRow>
        
        <InputfieldUnit
          labelText="Höjd:"
          placeholder="30"
          value={height}
          onChangeText={handleHeightChange}
          keyboardType="numeric"
          unitLabel="cm"
          error={heightError}
        />

        <LabeledPicker
          labelText="Storlek:"
          selectedValue={selectedSize}
          onValueChange={handleSelectedSizeChange}
          sizeOptions={sizeOptions}
          label="Ange storlek (mm)"
        />

      </CalculatorRow>
      <CalculatorRow>

        <InputfieldUnit
          labelText="Bredd:"
          placeholder="200"
          value={width}
          onChangeText={handleWidthChange}
          keyboardType="numeric"
          unitLabel="cm"
          error={widthError}
        />
        <LabeledPicker
          labelText="Densitet:"
          selectedValue={selectedDensity}
          onValueChange={handleSelectedDensityChange}
          sizeOptions={densityOptions}
          label="Ange densitet (t/m³)"
        />

      </CalculatorRow>
      <CalculatorRow>

        <InputfieldUnit
          labelText="Längd:"
          placeholder="450"
          value={length}
          onChangeText={handleLengthChange}
          keyboardType="numeric"
          unitLabel="cm"
          error={lengthError}
        />
        <CellDividerLarge>
          <SubmitButton
            onPress={handleSubmit} />
        </CellDividerLarge>

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

export default RockFlourCalculator;
