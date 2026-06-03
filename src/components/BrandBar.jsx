import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useGetBrands } from "./modals/CreateBrand/hooks";

const BrandBar = () => {
  const { brands, getBrands } = useGetBrands();
  const [selectedBrand, setSelectedBrand] = useState("");
  return (
    <div className="d-flex flex-wrap gap-2">
      {brands.map((brand) => (
        <Card
          border={brand.id === selectedBrand ? "danger" : "light"}
          style={{ cursor: "pointer" }}
          key={brand.id}
          className="p-3"
          onClick={() => {
            setSelectedBrand(brand.id);
          }}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
};

export default BrandBar;
