import { useRef, useState } from "react";

export function useForm({ config = [], initialValues = {}, onSubmit }) {
  const configObject = Array.isArray(config)
    ? config.reduce((acc, field) => {
        acc[field.key] = field;
        return acc;
      }, {})
    : config;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState(
    initialValues.image ? { image: initialValues.image } : {}
  );

  const ref = useRef(false);

  const validate = (customValues = values) => {
    const newErrors = {};

    for (const field in configObject) {
      const value = customValues[field]?.toString().trim();
      const rules = configObject[field];

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
    const type = configObject[field]?.type;

    if (type === "checkbox") {
      setValues((prev) => ({ ...prev, [field]: e.target.checked }));
    } else if (type === "radio") {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    } else if (type === "image") {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [field]: reader.result }));
        setValues((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      const value = e.target.value;
      const updatedValues = { ...values, [field]: value };
      setValues(updatedValues);
      if (ref.current) validate(updatedValues);
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
    previews,
  };
}

