import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      console.log("Ошибка получения данных из LocalStorage", e);
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (e) {
      console.log("Ошибка установки данных в LocalStorage", e);
    }
  }, [key, storedValue]);
  return [storedValue, setStoredValue];
};
