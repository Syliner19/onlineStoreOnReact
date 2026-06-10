import { Button, Card } from "react-bootstrap";

const DeviceBuyCard = ({ onClick, device }) => {
  return (
    <Card
      className="d-flex flex-column align-items-center justify-content-around"
      style={{
        width: 300,
        height: 300,
        fontSize: 32,
        border: "5px solid lightgray",
      }}
    >
      <h3>От: {device.price} руб.</h3>
      <Button variant={"outline-dark"} onClick={() => onClick(device.id)}>
        Добавить в корзину
      </Button>
    </Card>
  );
};

export default DeviceBuyCard;
