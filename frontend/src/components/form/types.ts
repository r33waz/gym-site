export type FieldType =
  | "text"
  | "password"
  | "textarea"
  | "select" // Searchable Single Combobox
  | "multi-select" // Searchable Multi-Select Combobox
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
  options?: FieldOption[]; // Structured as data objects for filtering accuracy
  initialValue: any;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
}
