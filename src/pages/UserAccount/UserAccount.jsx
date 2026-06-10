import { Button, Col, Form, Image, Row } from "react-bootstrap";
import valinor from "../../assets/Валинор.png";
import { useState } from "react";
const UserAccount = () => {
  const [isVisible, setIsVisible] = useState(false);
  const passwordVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <Row className="ms-3 pt-3 me-3">
        <Col md={9}>
          <Form className="d-flex flex-column">
            <Form.Control
              placeholder="Имя"
              className="mt-3"
              label="firstName"
            />
            <Form.Control
              placeholder="Фамилия"
              className="mt-3"
              label="secondName"
            />
            <Form.Control
              placeholder="Возраст"
              className="mt-3"
              type="number"
              label="age"
            />
            <Form.Control placeholder="Адрес" className="mt-3" label="adress" />
            <Form.Control
              placeholder="Аватар"
              className="mt-3"
              type="file"
              accept="image/*"
              label="img"
            />
          </Form>
        </Col>
        <Col
          md={3}
          className="d-flex align-items-center justify-content-center"
        >
          <Image width="100%" height="80%" src={valinor} />
        </Col>
        <div className="d-flex justify-content-center align-items-center mt-3 pl-3 pr-3">
          <Button variant={"outline-success"} className="mt-3">
            Сохранить изменения
          </Button>
        </div>
      </Row>
      <Row className="ms-5 pt-3 me-5">
        <Col>
          <Form className="d-flex flex-column">
            <Form.Control
              placeholder="Старый пароль"
              className="mt-3"
              type={isVisible ? "" : "password"}
              label="oldPassword"
            />

            <Form.Control
              placeholder="Новый пароль"
              className="mt-3"
              type={isVisible ? "" : "password"}
              label="newPassword"
            />

            <Form.Control
              placeholder="Повторите новый пароль"
              className="mt-3"
              type={isVisible ? "" : "password"}
              label="confirmNewPassword"
            />
          </Form>
        </Col>

        <div className="d-flex justify-content-center align-items-center mt-3 pl-3 pr-3 gap-3">
          <Button variant={"outline-success"} className="mt-3">
            Изменить пароль
          </Button>{" "}
          <Button
            variant={"outline-success"}
            className="mt-3"
            onClick={() => passwordVisibility()}
          >
            {isVisible ? "Скрыть пароли" : "Показать пароли"}
          </Button>
        </div>
      </Row>
    </>
  );
};

export default UserAccount;
