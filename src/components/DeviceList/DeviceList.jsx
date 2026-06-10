import DeviceItem from "../DeviceItem";
import { Col, Row } from "react-bootstrap";
import { useGetDevices, useNavidateDevice } from "./hooks";
import Loader from "../Loader";

const DeviceList = ({ filter }) => {
  const { devices, error, isLoading } = useGetDevices(filter);
  const goToDevice = useNavidateDevice();
  if (isLoading && !error) {
    return <Loader />;
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
