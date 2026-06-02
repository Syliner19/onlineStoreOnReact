import React, { createContext } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectBrands, selectTypes } from "../../../store/selectors";
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
  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);
  const values = {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    errors,
    types,
    brands,
  };
  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};
