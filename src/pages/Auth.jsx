import React, { useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/const";
import { login, registration } from "../http/userAPI";
import { setAuth, setUser } from "../store/actions";
import { selectUser } from "../store/selectors";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const click = async () => {
    setError("");
    try {
      if (isLogin) {
        const response = await login(email, password);
        const user = response.data.user;
        navigate(SHOP_ROUTE);
        dispatch(setAuth(true));
        dispatch(setUser(user));
      } else {
        const response = await registration(email, password);
        navigate(LOGIN_ROUTE);
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
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
              <Button
                variant={"outline-success"}
                className="mt-3"
                onClick={click}
              >
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
