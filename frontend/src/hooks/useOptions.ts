import { useMemo } from "react";

type Option = {
  label: string;
  value: unknown;
};

function useOptions<T, L extends keyof T, V extends keyof T>(
  data: T | T[],
  labelKey: L,
  valueKey: V,
) {
  return useMemo<Option[]>(() => {
    const items = Array.isArray(data) ? data : [data];

    return items.map((item) => ({
      label: String(item[labelKey]),
      value: item[valueKey],
    }));
  }, [data, labelKey, valueKey]);
}

export default useOptions;
