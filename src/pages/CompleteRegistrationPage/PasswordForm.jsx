import React from "react";
import { Button, Form } from "react-bootstrap";
import ErrorRegistration from "./ErrorRegistration";

const PasswordForm = ({
  displayError,
  password,
  confirmPassword,
  onSubmit,
  onChangePassword,
  onChangeConfirmPassword,
}) => {
  return (
    <Form className="d-flex flex-column">
      <Form.Control
        placeholder="Введите ваш пароль..."
        className="mt-3"
        value={password}
        onChange={(e) => onChangePassword(e.target.value)}
      />
      <Form.Control
        placeholder="Подтвердите ваш пароль..."
        className="mt-3"
        value={confirmPassword}
        type="password"
        onChange={(e) => onChangeConfirmPassword(e.target.value)}
      />
      {displayError && <ErrorRegistration displayError={displayError} />}
      <div className="d-flex justify-content-between align-items-center mt-3 pl-3 pr-3">
        <div>
          <Button
            variant={"outline-success"}
            className="mt-3"
            onClick={onSubmit}
          >
            Сохранить пароль
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default PasswordForm;
