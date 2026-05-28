export const createFormData = (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("rating", data.rating);
  formData.append("type", data.type);
  formData.append("brand", data.brand);
  formData.append("description", JSON.stringify(data.description));
  if (data.img && data.img[0]) {
    formData.append("img", data.img[0]);
  }
  return formData;
};
