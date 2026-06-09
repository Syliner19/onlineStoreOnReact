import React from "react";
import PasswordForm from "./PasswordForm";
import { Card, Container } from "react-bootstrap";

const CompleteRegistrationCard = ({
  displayError,
  password,
  confirmPassword,
  onSubmit,
  onChangePassword,
  onChangeConfirmPassword,
}) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">Завершение регистрации</h2>
        <PasswordForm
          displayError={displayError}
          password={password}
          confirmPassword={confirmPassword}
          onSubmit={onSubmit}
          onChangePassword={onChangePassword}
          onChangeConfirmPassword={onChangeConfirmPassword}
        />
      </Card>
    </Container>
  );
};

export default CompleteRegistrationCard;
