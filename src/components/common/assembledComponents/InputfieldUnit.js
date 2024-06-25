import React from 'react';
import { CalculatorBody, CalculatorCell, CalculatorLabel, CalculatorUnitLabel, CellDividerLarge, CellDividerMedium, CellDividerSmall } from '../calculatorLayoutComponents';
import InputFieldSmall from '../inputs/InputFieldSmall';   

const InputfieldUnit = ({ labelText, placeholder, value, onChangeText, keyboardType, unitLabel, error }) => {
    return (
      <CalculatorCell error={error}>
        <CellDividerLarge>
          <CalculatorLabel text={labelText} />
        </CellDividerLarge>
        <CellDividerMedium>
          <InputFieldSmall
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType} />
        </CellDividerMedium>
        <CellDividerSmall>
          <CalculatorUnitLabel label={unitLabel} />
        </CellDividerSmall>
      </CalculatorCell>
    );
  };
  
  export default InputfieldUnit;
