export const validateFields = (fields, resetDelay = 3000) => {
  fields.forEach(field => {
    const hasValue = !!field.value;
    field.setError(!hasValue);
  });

  // Reset all errors to false after the specified delay
  setTimeout(() => {
    fields.forEach(field => field.setError(false));
  }, resetDelay);


  return fields.every(field => !!field.value);
};
