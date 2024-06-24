export const validateFields = (fields) => {
  fields.forEach(field => {
    const hasValue = !!field.value;
    field.setError(!hasValue);
  });

  // Check if all fields are valid
  return fields.every(field => !!field.value);
};