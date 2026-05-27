import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/const";
import { Button, Card, Container, Form } from "react-bootstrap";
import { confirmPasswordApi } from "../http/userAPI";

const CompleteRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      setError("Отсутствует email в ссылке для регистрации");
    }
  }, [email]);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    setError("");
    try {
      const response = await confirmPasswordApi(email, password);
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError(response.data.message);
      }
    } catch (e) {
      setError(e.response?.data?.message || "Ошибка при установке пароля");
    }
  };

  if (!email) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 54 }}
      >
        <Card style={{ width: "600px" }} className="p-5">
          <h2 className="m-auto">Неверная ссылка!</h2>
        </Card>
      </Container>
    );
  }
  if (success) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 54 }}
      >
        <Card style={{ width: "600px" }} className="p-5">
          <h2 className="m-auto">Пароль успешно установлен!</h2>
          <p>Теперь вы можете войти в систему, используя ваш email и пароль.</p>
          <Button
            variant={"outline-success"}
            className="mt-3"
            onClick={() => {
              {
                navigate(LOGIN_ROUTE);
                setSuccess(false);
              }
            }}
          >
            Войти в систему
          </Button>
        </Card>
      </Container>
    );
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">Завершение регистрации</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            placeholder="Введите ваш пароль..."
            className="mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control
            placeholder="Подтвердите ваш пароль..."
            className="mt-3"
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="d-flex justify-content-between align-items-center mt-3 pl-3 pr-3">
            <div>
              <Button
                variant={"outline-success"}
                className="mt-3"
                onClick={handleSubmit}
              >
                Сохранить пароль
              </Button>
            </div>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CompleteRegistration;
