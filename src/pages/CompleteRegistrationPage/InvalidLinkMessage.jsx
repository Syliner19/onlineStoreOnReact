import { Card, Container } from "react-bootstrap";

const InvalidLinkMessage = () => {
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
};

export default InvalidLinkMessage;
