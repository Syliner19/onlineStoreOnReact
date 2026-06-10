import { Row } from "react-bootstrap";

const DeviceDescription = ({ description }) => {
  if (!description || description.length === 0) {
    return null;
  }
  return (
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
  );
};

export default DeviceDescription;
