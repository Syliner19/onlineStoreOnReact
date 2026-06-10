import AuthHeader from "./AuthHeader";
import AuthForm from "./AuthForm";
import AuthFooter from "./AuthFooter";
import { Card } from "react-bootstrap";

const AuthCard = ({
  setEmail,
  setPassword,
  email,
  password,
  isLogin,
  onSubmit,
}) => {
  return (
    <Card style={{ width: "600px" }} className="p-5">
      <AuthHeader isLogin={isLogin} />
      <AuthForm
        setEmail={setEmail}
        setPassword={setPassword}
        email={email}
        password={password}
      />
      <AuthFooter isLogin={isLogin} onSubmit={onSubmit} />
    </Card>
  );
};

export default AuthCard;
