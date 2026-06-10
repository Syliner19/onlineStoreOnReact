import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/const";
import { NavLink } from "react-router-dom";

const AuthLink = ({ isLogin }) => {
  if (isLogin) {
    return (
      <div>
        <span> Нет аккаунта? </span>
        <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
      </div>
    );
  }
  return (
    <div>
      <span> Есть аккаунт? </span>
      <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
    </div>
  );
};

export default AuthLink;
