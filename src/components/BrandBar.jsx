import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBrands, selectSelectedBrand } from "../store/selectors";
import { Card, Row } from "react-bootstrap";
import { setBrands, setSelectBrand } from "../store/actions";
import { fetchBrandApi } from "../http/deviceAPI";

const BrandBar = () => {
  const selectedBrand = useSelector(selectSelectedBrand);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchBrandApi()
      .then((brandsFromApi) => dispatch(setBrands(brandsFromApi)))
      .catch((e) => console.log(e));
  }, [dispatch]);
  const brands = useSelector(selectBrands);
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
