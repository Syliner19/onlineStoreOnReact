import React from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/const";

const Auth = () => {
  const location = useLocation();
  console.log(location);
  const isLogin = location.pathname === LOGIN_ROUTE;
  console.log(isLogin);
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control placeholder="Введите ваш email..." className="mt-3" />
          <Form.Control placeholder="Введите ваш пароль..." className="mt-3" />
          <div className="d-flex justify-content-between align-items-center mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                <span> Нет аккаунта? </span>
                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
              </div>
            ) : (
              <div>
                <span> Есть аккаунт? </span>
                <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
              </div>
            )}
            <div>
              <Button variant={"outline-success"} className="mt-3">
                {isLogin ? "Войти" : "Зарегестрироваться"}
              </Button>
            </div>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
