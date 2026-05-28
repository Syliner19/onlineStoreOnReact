import { useState } from "react";

export const useFetch = (fetchFn) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const trigger = async (data) => {
    try {
      setError("");
      setIsLoading(true);
      const resp = await fetchFn(data);
      setResponse(resp);
    } catch (e) {
      setError(`Ошибка: ${e.response.message || e.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return { response, error, isLoading, trigger };
};
