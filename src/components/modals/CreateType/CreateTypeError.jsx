import React, { useContext } from "react";
import { CreateTypeContext } from "./CreateTypeContext";

const CreateTypeError = () => {
  const { error } = useContext(CreateTypeContext);
  return (
    <span
      style={{ color: "red" }}
      className="d-flex justify-content-center align-items-center"
    >
      {error}
    </span>
  );
};

export default CreateTypeError;
