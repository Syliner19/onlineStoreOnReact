const AuthHeader = ({ isLogin }) => {
  return <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>;
};

export default AuthHeader;
