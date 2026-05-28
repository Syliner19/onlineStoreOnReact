import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { FormContext } from "./FormContext";

const FormInputs = ({ label, type, min, accept, placeholder }) => {
  const { register, errors } = useContext(FormContext);
  const additionalProps = {};
  if (type === "file") {
    additionalProps.accept = accept;
  }
  if (min !== undefined) {
    additionalProps.min = min;
  }
  return (
    <>
      <Form.Control
        placeholder={placeholder}
        {...register(label, { required: placeholder })}
        className="mt-3"
        type={type}
        {...additionalProps}
      ></Form.Control>
      {errors[label] && (
        <div className="text-danger">{errors[label].message}</div>
      )}
    </>
  );
};

export default FormInputs;
