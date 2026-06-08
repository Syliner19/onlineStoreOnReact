import React from "react";
import { Form } from "react-bootstrap";

const AuthForm = ({ email, setEmail, password, setPassword }) => {
  return (
    <Form className="d-flex flex-column">
      <Form.Control
        placeholder="Введите ваш email..."
        className="mt-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Control
        placeholder="Введите ваш пароль..."
        className="mt-3"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </Form>
  );
};

export default AuthForm;
