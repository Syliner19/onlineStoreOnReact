import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../../api/hooks/useFetch";
import { user } from "../../http/userAPI";

export const useUserAccountChanger = () => {
  const [isVisible, setIsVisible] = useState(false);
  const passwordVisibility = () => {
    setIsVisible(!isVisible);
  };
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      secondName: "",
      age: "",
      adress: "",
      img: null,
    },
  });
  return {
    isVisible,
    setValue,
    register,
    handleSubmit,
    reset,
    errors,
    passwordVisibility,
  };
};
export const useUserInfo = () => {
  const {
    response = {},
    isLoading,
    trigger,
  } = useFetch(user, {
    autoTrigger: true,
    initialData: {
      user: {
        name: "",
        role: "",
        id: "",
        description: {
          firstName: "",
          secondName: "",
          age: null,
          adress: "",
          img: null,
        },
      },
    },
  });
  return {
    firstName: response?.user?.description?.firstName || "",
    secondName: response?.user?.description?.secondName || "",
    age: response?.user?.description?.age || null,
    adress: response?.user?.description?.adress || "",
    img: response?.user?.description?.img || null,
    error: null,
    isLoading,
    refresh: trigger,
  };
};
