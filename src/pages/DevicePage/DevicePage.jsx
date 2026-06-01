import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsAuth } from "../../store/selectors";
import { useAddDevice, useGetDevice } from "./hooks";
import DeviceDescription from "./DeviceDescription";
import DeviceRating from "./DeviceRating";
import DeviceBuyCard from "./DeviceBuyCard";

const DevicePage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const isAuth = useSelector(selectIsAuth);
  const { getDevice, isLoading, error } = useGetDevice();
  const { addDevice } = useAddDevice();

  useEffect(() => {
    getDevice(id).then((resp) => setDevice(resp));
  }, [id]);

  const handleAddDeviceToCart = async (deviceId) => {
    try {
      if (isAuth) {
        const response = await addDevice({ deviceId });
      }
    } catch (e) {
      console.error("Error loading cart:", e);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (!device) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
  const { description } = device;
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={device.img} />
        </Col>
        <Col md={4}>
          <DeviceRating device={device} />
        </Col>
        <Col md={4}>
          <DeviceBuyCard
            device={device}
            onClick={() => {
              console.log(`Попал ${device.id}`);
              handleAddDeviceToCart(device.id);
            }}
          />
        </Col>
      </Row>
      <DeviceDescription description={description} />
    </Container>
  );
};

export default DevicePage;
