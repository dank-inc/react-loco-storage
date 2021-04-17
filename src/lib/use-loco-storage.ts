import { useCallback, useEffect, useState } from "react";

export const useLocoStorage = <T extends Record<string, any>, K = keyof T>(
  key: K,
  defaultValue: any
) => {
  const [data, setData] = useState<Partial<T> | null>(null);

  useEffect(() => {
    if (typeof key !== "string") return;

    get(key);
  }, [key]);

  const get = useCallback((key: K): void => {
    if (typeof key !== "string") return;

    try {
      const json = localStorage.getItem(key);
      if (!json) throw new Error();
      setData(JSON.parse(json));
    } catch (err) {
      set(defaultValue);
    }
  }, []);

  const set = (body: Partial<T>): void => {
    if (typeof key !== "string") return;

    try {
      const json = JSON.stringify(body);
      localStorage.setItem(key, json);
      setData(body);
    } catch (err) {
      console.error("Couldn't store body - invalid json", body);
    }
  };

  return [data, get, set];
};
