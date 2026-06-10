import { Card, Image } from "react-bootstrap";
import star from "../assets/star.png";

const DeviceItem = ({ device, onClick }) => {
  return (
    <Card
      style={{ width: "150px", cursor: "pointer" }}
      border="light"
      onClick={() => onClick(device.id)}
    >
      <Image width="100%" height={150} src={`${device.img}`} />
      <div className=" text-black-50 d-flex justify-content-between align-items-center mt-2">
        <div>Samsung...</div>
        <div className="d-flex align-items-center">
          <div>{device.rating}</div>
          <Image width={18} height={18} src={star}></Image>
        </div>
      </div>
      <div>{device.name}</div>
    </Card>
  );
};

export default DeviceItem;
