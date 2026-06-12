import { createContext, useMemo } from "react";
import { useForm } from "react-hook-form";
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
  const { types } = useGetTypes();
  const { brands } = useGetBrands();
  const values = useMemo(
    () => ({
      control,
      register,
      handleSubmit,
      watch,
      setValue,
      reset,
      errors,
      types,
      brands,
    }),
    [
      control,
      register,
      handleSubmit,
      watch,
      setValue,
      reset,
      errors,
      types,
      brands,
    ],
  );
  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};
