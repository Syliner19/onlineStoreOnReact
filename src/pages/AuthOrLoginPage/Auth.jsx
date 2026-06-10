import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/const";
import {
  useLogin,
  useNavigateLogin,
  useNavigateShop,
  useRegistration,
} from "./hooks";
import AuthCard from "./AuthCard";
import { UserContext } from "../../context/userContext";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useLogin();
  const { registration } = useRegistration();
  const goToLogin = useNavigateLogin();
  const goToShop = useNavigateShop();
  const { refresh } = useContext(UserContext);
  const handleAuth = async () => {
    setError("");
    try {
      if (isLogin) {
        await login(email, password);
        await refresh();
        goToShop();
      } else {
        await registration(email, password);
        await refresh();
        goToLogin();
      }
    } catch ({ response }) {
      console.log(response.data.message);
      setError(response.data.message);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <AuthCard
        onSubmit={handleAuth}
        password={password}
        setPassword={setPassword}
        email={email}
        isLogin={isLogin}
        setEmail={setEmail}
      />
    </Container>
  );
};

export default Auth;
