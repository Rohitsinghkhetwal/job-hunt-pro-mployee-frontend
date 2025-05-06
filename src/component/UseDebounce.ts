import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [keyword, setKeyword] = useState(value || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return keyword;
};