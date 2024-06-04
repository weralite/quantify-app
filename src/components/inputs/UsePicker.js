import { useState } from 'react';

const usePicker = (initialValue) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
  };

  return {
    selectedValue,
    handleValueChange
  };
};

export default usePicker;