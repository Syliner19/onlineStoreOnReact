import { Form } from "react-bootstrap";

const FormInputUserAccount = ({
  label,
  placeholder,
  type,
  errors,
  register,
  accept,
  min,
}) => {
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
        {...register(label)}
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

export default FormInputUserAccount;
