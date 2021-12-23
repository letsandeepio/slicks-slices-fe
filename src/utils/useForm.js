import React, { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  const updateValues = (e) => {
    const { value, name, type } = e.target;

    const parsedValue = type === 'number' ? parseInt(value) : value;

    setValues({ ...values, [name]: parsedValue });
  };

  return { values, updateValues };
};

export default useForm;
