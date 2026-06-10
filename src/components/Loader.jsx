import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100%", flexDirection: "column" }}
    >
      <Spinner animation="border" role="status" />
      <span>Загрузка...</span>
    </div>
  );
};

export default Loader;
