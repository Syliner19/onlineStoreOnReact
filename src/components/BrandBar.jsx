import { Card } from "react-bootstrap";
import { useGetBrands } from "./modals/CreateBrand/hooks";

const BrandBar = ({ filter, onClick }) => {
  const { brands } = useGetBrands();
  return (
    <div className="d-flex flex-wrap gap-2">
      {brands.map((brand) => (
        <Card
          border={brand.name === filter.brand ? "danger" : "light"}
          style={{ cursor: "pointer" }}
          key={brand.id}
          className="p-3"
          onClick={() => {
            onClick(brand.name);
          }}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
};

export default BrandBar;
