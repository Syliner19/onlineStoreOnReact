import { Button } from "react-bootstrap";

const NavBarButton = ({ onClick, title }) => {
  return (
    <Button variant={"outline-light"} className="ms-2" onClick={onClick}>
      {title}
    </Button>
  );
};

export default NavBarButton;
