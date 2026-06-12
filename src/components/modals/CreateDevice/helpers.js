export const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value === null || value === undefined) {
      return;
    }
    if (value instanceof FileList || key === "img") {
      if (value.length > 0) {
        formData.append(key, value[0]);
      }
    } else if (typeof value === "object" && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
};
