import React from "react";
import { useSearchParams } from "react-router-dom";
import { useConfirmPassword, usePasswordValidation } from "./hooks";
import { useNavigateLogin } from "../AuthOrLoginPage/hooks";
import SuccessMessage from "./SuccessMessage";
import InvalidLinkMessage from "./InvalidLinkMessage";
import CompleteRegistrationCard from "./CompleteRegistrationCard";

const CompleteRegistration = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const {
    password,
    confirmPassword,
    setConfirmPassword,
    setPassword,
    localError,
    validatePassword,
  } = usePasswordValidation();
  const { confirm, confirmError, success } = useConfirmPassword();
  const goToLogin = useNavigateLogin();

  const handleSubmit = async () => {
    const validation = validatePassword();
    if (!validation) {
      return;
    }
    await confirm(email, password);
    console.log("Попал");
  };
  const displayError = localError || confirmError;

  if (!email) {
    return <InvalidLinkMessage />;
  }
  if (success) {
    return <SuccessMessage onClick={goToLogin} />;
  }
  return (
    <CompleteRegistrationCard
      displayError={displayError}
      onSubmit={handleSubmit}
      password={password}
      confirmPassword={confirmPassword}
      onChangePassword={setPassword}
      onChangeConfirmPassword={setConfirmPassword}
    />
  );
};

export default CompleteRegistration;
