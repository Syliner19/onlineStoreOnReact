import React from "react";

const CreateUsersError = ({ title }) => {
  return (
    <span
      style={{ color: "red" }}
      className="d-flex justify-content-center align-items-center"
    >
      {title}
    </span>
  );
};

export default CreateUsersError;
