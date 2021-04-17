export const useLocoStorage = <
  T extends Record<string, any>,
  K extends keyof T
>() => {
  const get = <T>(key: K): T[K] | null => {
    try {
      const json = localStorage.getItem(key);
      if (!json) throw new Error(`key not found => ${key}`);
      return JSON.parse(json);
    } catch (err) {
      console.error("Coudln't parse item for some reason idk.", err);
      return null;
    }
  };

  const set = <T>(key: K, body: Partial<T>): boolean => {
    try {
      const json = JSON.stringify(body);
      localStorage.setItem(key, json);
      return true;
    } catch (err) {
      console.error("Couldn't store body - invalid json", body);
      return false;
    }
  };

  return { get, set };
};
