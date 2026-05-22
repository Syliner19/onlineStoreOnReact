import React, { memo, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/const";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAdmin, selectIsAuth, selectRole } from "../store/selectors";
import { setAuth, setUser } from "../store/actions";
import { logout, user } from "../http/userAPI";

const NavBar = memo(({ setCartVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isAdmin = useSelector(selectIsAdmin);
  const onLogout = () => {
    logout().then(() => {
      dispatch(setAuth(false));
      dispatch(setUser({}));
    });
  };
  useEffect(() => {
    user()
      .then((resp) => {
        dispatch(setUser(resp));
        dispatch(setAuth(true));
      })
      .catch(() => {
        dispatch(setAuth(false));
        dispatch(setUser({}));
      });
  }, []);
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
              className="ms-2"
              onClick={() => {
                setCartVisible(true);
              }}
            >
              Корзина
            </Button>
            {isAdmin && (
              <Button
                className="ms-2"
                variant={"outline-light"}
                onClick={() => {
                  navigate(ADMIN_ROUTE);
                }}
              >
                Админ панель
              </Button>
            )}
            <Button
              variant={"outline-light"}
              className="ms-2"
              onClick={onLogout}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => {
                navigate(LOGIN_ROUTE);
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
