import React from 'react';
import { CalculatorBody, CalculatorCell, CalculatorLabel, CalculatorUnitLabel, CellDividerLarge, CellDividerMedium, CellDividerSmall } from '../calculatorLayout';
import InputFieldSmall from '../inputs/InputFieldSmall'; 
import CustomPicker from '../../common/inputs/CustomPicker';

const LabeledPicker = ({ labelText, selectedValue, onValueChange, sizeOptions, label }) => {
    return (
        <CalculatorCell>
            <CellDividerLarge>
                <CalculatorLabel text={labelText} />
            </CellDividerLarge>
            <CellDividerLarge>
                <CustomPicker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    items={sizeOptions}
                    label={label}
                />
            </CellDividerLarge>
        </CalculatorCell>
    );
};

export default LabeledPicker;