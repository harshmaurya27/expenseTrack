import { useEffect, useState } from "react";

export function useLocaleStorage(key, initialData) {
  const [data, setData] = useState(initialData);
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem(key));
    if (existingData) {
      setData(existingData);
    } else {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  }, []);
  const updateLocaleStorage = (newData) => {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
    }

    setData(newData);
  };
  return [data, updateLocaleStorage];
}
