import React from "react";
import DeviceItem from "../DeviceItem";
import { Col, Row } from "react-bootstrap";
import { useGetDevices, useNavidateDevice } from "./hooks";

const DeviceList = () => {
  const { devices, error, isLoading } = useGetDevices();
  const goToDevice = useNavidateDevice();
  if (isLoading && !error) {
    return <div>Загрузка...</div>;
  }
  return (
    <Row>
      {devices.map((device) => (
        <Col key={device.id} className="mt-3">
          <DeviceItem device={device} onClick={goToDevice} />
        </Col>
      ))}
    </Row>
  );
};

export default DeviceList;
