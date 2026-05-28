import { useFetch } from "../../../api/hooks/useFetch";
import { addDeviceApi } from "../../../http/deviceAPI";

export const useDescription = (watch, setValue) => {
  const description = watch("description");

  const addDescription = () => {
    const currentDescription = watch("description");
    setValue("description", [
      ...currentDescription,
      {
        title: "",
        value: "",
        id: Date.now(),
      },
    ]);
  };

  const removeDescription = (id) => {
    const currentDescription = watch("description");
    const descriptionWithoutDeleted = currentDescription.filter(
      (desc) => desc.id !== id,
    );
    setValue("description", descriptionWithoutDeleted);
  };

  const updateTitleDesctiption = (id, value) => {
    const currentDescription = watch("description");
    const updated = currentDescription.map((desc) =>
      desc.id === id ? { ...desc, title: value } : desc,
    );
    setValue("description", updated);
  };
  const updateValueDesctiption = (id, value) => {
    const currentDescription = watch("description");
    const updated = currentDescription.map((desc) =>
      desc.id === id ? { ...desc, value: value } : desc,
    );
    setValue("description", updated);
  };
  return {
    description,
    addDescription,
    removeDescription,
    updateTitleDesctiption,
    updateValueDesctiption,
  };
};
export const useAddDevice = () => {
  const { response, error, isLoading, trigger } = useFetch(addDeviceApi);
  return { response, error, isLoading, addDevice: trigger };
};
