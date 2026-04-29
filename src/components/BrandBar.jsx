import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBrands, selectSelectedBrand } from "../store/selectors";
import { Card, Row } from "react-bootstrap";
import { setSelectBrand } from "../store/actions";

const BrandBar = () => {
  const brands = useSelector(selectBrands);
  const selectedBrand = useSelector(selectSelectedBrand);
  const dispatch = useDispatch();
  console.log(selectedBrand);
  return (
    <div className="d-flex flex-wrap gap-2">
      {brands.map((brand) => (
        <Card
          border={brand.id === selectedBrand.id ? "danger" : "light"}
          style={{ cursor: "pointer" }}
          key={brand.id}
          className="p-3"
          onClick={() => {
            dispatch(setSelectBrand(brand));
          }}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
};

export default BrandBar;
