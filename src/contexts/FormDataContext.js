import React from 'react';

const FormDataContext = React.createContext({
  formData: {},
  setFormData: () => {}
});

export default FormDataContext;
