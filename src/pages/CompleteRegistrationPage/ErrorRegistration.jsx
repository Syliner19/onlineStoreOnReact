const ErrorRegistration = ({ displayError }) => {
  return (
    <div className="text-danger mt-3">
      {displayError || "Ошибка при установке пароля"}
    </div>
  );
};

export default ErrorRegistration;
