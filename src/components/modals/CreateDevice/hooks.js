import { useWatch } from "react-hook-form";
import { useFetch } from "../../../api/hooks/useFetch";
import { createNewDevice } from "../../../http/deviceAPI";

export const useDescription = (control, setValue) => {
  const description = useWatch({ control, name: "description" });

  const addDescription = () => {
    setValue("description", [
      ...description,
      {
        title: "",
        value: "",
        id: Date.now(),
      },
    ]);
  };

  const removeDescription = (id) => {
    const descriptionWithoutDeleted = description.filter(
      (desc) => desc.id !== id,
    );
    setValue("description", descriptionWithoutDeleted);
  };

  const updateTitleDesctiption = (id, value) => {
    const updated = description.map((desc) =>
      desc.id === id ? { ...desc, title: value } : desc,
    );
    setValue("description", updated);
  };
  const updateValueDesctiption = (id, value) => {
    const updated = description.map((desc) =>
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
  const { response, error, isLoading, trigger } = useFetch(createNewDevice);
  return { response, error, isLoading, addDevice: trigger };
};
