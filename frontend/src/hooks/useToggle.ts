import { useCallback, useState } from "react";

const useToggle = (initialValue = false) => {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback((value?: boolean) => {
    if (typeof value === "boolean") {
      setState(value);
    } else {
      setState((prev) => !prev);
    }
  }, []);

  return [state, toggle] as const;
};

export default useToggle;
