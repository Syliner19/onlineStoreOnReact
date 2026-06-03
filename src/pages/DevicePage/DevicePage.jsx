import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAddDevice, useGetDevice } from "./hooks";
import DeviceDescription from "./DeviceDescription";
import DeviceRating from "./DeviceRating";
import DeviceBuyCard from "./DeviceBuyCard";

const DevicePage = () => {
  const { id } = useParams();
  const { device, getDevice, isLoading, error } = useGetDevice(id);
  const { addDevice } = useAddDevice();

  const handleAddDeviceToCart = async (deviceId) => {
    try {
      const response = await addDevice({ deviceId });
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
          <DeviceBuyCard device={device} onClick={handleAddDeviceToCart} />
        </Col>
      </Row>
      <DeviceDescription description={description} />
    </Container>
  );
};

export default DevicePage;
