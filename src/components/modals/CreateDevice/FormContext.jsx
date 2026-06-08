import React, { createContext } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectBrands, selectTypes } from "../../../store/selectors";
import { useGetBrands } from "../CreateBrand/hooks";
import { useGetTypes } from "../CreateType/hooks";
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
  useGetBrands();
  const { types } = useGetTypes();
  const { brands } = useGetBrands();
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
