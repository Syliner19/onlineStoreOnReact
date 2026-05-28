import React, { createContext } from "react";
import { useForm } from "react-hook-form";
export const FormContext = createContext(null);
export const FormProvider = ({ children }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      brand: "",
      name: "",
      price: "",
      img: null,
      description: [],
    },
  });
  const values = {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    errors,
  };
  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};
