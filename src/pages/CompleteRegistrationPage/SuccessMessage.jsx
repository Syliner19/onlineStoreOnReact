import React from "react";
import { Button, Card, Container } from "react-bootstrap";

const SuccessMessage = ({ onClick }) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">Пароль успешно установлен!</h2>
        <p>Теперь вы можете войти в систему, используя ваш email и пароль.</p>
        <Button variant={"outline-success"} className="mt-3" onClick={onClick}>
          Войти в систему
        </Button>
      </Card>
    </Container>
  );
};

export default SuccessMessage;
