import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/const";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../store/selectors";

const NavBar = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          Купи Девайс
        </NavLink>
        {isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button variant={"outline-light"}>Админ панель</Button>
            <Button variant={"outline-light"}>Войти</Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button variant={"outline-light"}>Авторизация</Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
