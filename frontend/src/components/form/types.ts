export type FieldType =
  | "text"
  | "password"
  | "textarea"
  | "select"
  | "multi-select"
  | "radio"
  | "date"
  | "checkbox-single"
  | "checkbox-group";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FieldOption[];
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  disable?: boolean;
}
