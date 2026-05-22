import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectDeviceById } from "../store/selectors";
import { fetchDeviceByIdApi } from "../http/deviceAPI";
import { addDeviceToCart } from "../store/actions";

const DevicePage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setErrorMessage("");
    setIsLoading(true);
    fetchDeviceByIdApi(id)
      .then((resp) => setDevice(resp))
      .catch(({ response }) => setErrorMessage(response.data.message))
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (!device) {
    return <div style={{ color: "red" }}>{errorMessage}</div>;
  }
  const { description } = device;
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: "240px",
                height: "240px",
                backgroundSize: "cover",
                fontSize: "64px",
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
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
            <Button
              variant={"outline-dark"}
              onClick={() => {
                dispatch(addDeviceToCart(device.id));
              }}
            >
              Добавить в корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {description.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.value}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
