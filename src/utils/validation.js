export const validateField = (value, rules) => {
    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };
  
  export const required = (value) => !value ? 'This field is required' : null;
  export const isNumber = (value) => isNaN(value) ? 'Must be a number' : null;
  export const positiveNumber = (value) => value <= 0 ? 'Must be a positive number' : null;
  