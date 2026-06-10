const BrandNotFound = ({ error }) => {
  return (
    <span style={{ color: "red" }} className="d-flex justify-content-center">
      {error}
    </span>
  );
};

export default BrandNotFound;
