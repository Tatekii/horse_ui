import { useEffect, useState } from "react";

export default function useDebounce(value: any, delay: number) {
  const [_v, set_v] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      set_v(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return _v;
}
