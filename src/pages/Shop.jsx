import { Button, Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList/DeviceList";
import { useFilter } from "./hooks";

const Shop = () => {
  const {
    filter,
    setTypeFilter,
    setBrandFilter,
    clearFilter,
    hasActiveFilters,
  } = useFilter();
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar onClick={setTypeFilter} filter={filter} />
        </Col>
        <Col md={9}>
          <BrandBar onClick={setBrandFilter} filter={filter} />
          {hasActiveFilters && (
            <Button size="sm" variant="secondary" onClick={clearFilter}>
              Очистить фильтры
            </Button>
          )}
          <DeviceList filter={filter} />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
