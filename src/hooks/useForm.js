import { useRef, useState } from "react";

export function useForm({ config = {}, initialValues = {}, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const ref = useRef(false);

  
  const validate = (customValues = values) => {
    const newErrors = {};

    for (const field in config) {
      const value = customValues[field]?.toString().trim();
      const rules = config[field];

      if (rules.required && !value) {
        newErrors[field] = "Required";
      } else if (rules.validate) {
        const customError = rules.validate(value);
        if (customError) {
          newErrors[field] = customError;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const updatedValues = { ...values, [field]: value };

    setValues(updatedValues);

    if (ref.current) {
      validate(updatedValues); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ref.current = true;
    if (validate()) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
  };
}
