import React, { memo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/const";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../store/selectors";
import { setAuth } from "../store/actions";

const NavBar = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          Купи Девайс
        </NavLink>
        {isAuth ? (
          <Nav className="ms-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => {
                navigate(ADMIN_ROUTE);
              }}
            >
              Админ панель
            </Button>
            <Button
              variant={"outline-light"}
              className="ms-2"
              onClick={() => {
                navigate(LOGIN_ROUTE);
              }}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => {
                dispatch(setAuth(true));
              }}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
