import { useEffect, useState } from "react";

export const useFetchByUserId = (fetchFn) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getResponseByUserId = async () => {
    try {
      setError("");
      setIsLoading(true);
      const resp = await fetchFn();
      setResponse(resp);
    } catch (e) {
      setError(`Ошибка: ${e.response.message || e.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getResponseByUserId();
  }, []);
  return { response, error, isLoading };
};
