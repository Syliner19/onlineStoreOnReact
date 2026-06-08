import React from "react";
import AuthLink from "./AuthLink";
import { Button } from "react-bootstrap";

const AuthFooter = ({ isLogin, onSubmit }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3 pl-3 pr-3">
      <AuthLink isLogin={isLogin} />
      <Button
        variant={"outline-success"}
        className="mt-3"
        onClick={() => onSubmit()}
      >
        {isLogin ? "Войти" : "Зарегестрироваться"}
      </Button>
    </div>
  );
};

export default AuthFooter;
