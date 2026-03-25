function useSelectOptions<T, V extends string | number>(
  data: T[],
  labelKey: keyof T,
  valueKey: keyof T
): { label: string; value: V }[] {
  return data.map((item) => ({
    label: String(item[labelKey]),
    value: item[valueKey] as V, // keep original type
  }));
}

export default useSelectOptions; 