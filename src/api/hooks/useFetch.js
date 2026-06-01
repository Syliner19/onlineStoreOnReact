import { useState, useCallback, useRef, useEffect } from "react";

export const useFetch = (fetchFn, options = {}) => {
  const { autoTrigger = false, initialData = undefined } = options;
  const [response, setResponse] = useState(initialData);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const abortControllerRef = useRef(null);

  const execute = useCallback(
    async (...args) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      try {
        setError("");
        setIsLoading(true);
        const result = await fetchFn(...args, { signal: controller.signal });
        if (!controller.signal.aborted) {
          setResponse(result);
          setIsSuccess(true);
          return result;
        }
      } catch (e) {
        if (e.name === "AbortError") {
          return;
        }
        const message =
          e.response?.message || e.message || "Неизвестная ошибка";
        setError(`Ошибка ${message}`);
        setIsSuccess(false);
        throw e;
      } finally {
        if (
          abortControllerRef.current &&
          !abortControllerRef.current.signal.aborted
        ) {
          setIsLoading(false);
        }
      }
    },
    [fetchFn],
  );

  useEffect(() => {
    if (autoTrigger) {
      execute();
    }
  }, [autoTrigger, execute]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  return { response, error, isLoading, isSuccess, trigger: execute };
};
