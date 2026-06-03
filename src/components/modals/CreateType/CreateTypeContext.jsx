import React, { createContext, useState } from "react";
import { useAddType, useDeleteType, useGetTypes } from "./hooks";

export const CreateTypeContext = createContext(null);
export const CreateTypeProvider = ({ children }) => {
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const { addType } = useAddType();
  const { deleteType } = useDeleteType();
  const { types, getTypes } = useGetTypes();

  const values = {
    type,
    setType,
    error,
    setError,
    addType,
    deleteType,
    types,
    getTypes,
  };
  return (
    <CreateTypeContext.Provider value={values}>
      {children}
    </CreateTypeContext.Provider>
  );
};
