import type { FieldValues } from "react-hook-form";
import type { ObjectSchema } from "yup";

import { DynamicForm } from "@/components/form/DynamicForm";
import type { FieldConfig } from "@/components/form/types";
import FormModal, { type ModalSize } from "./FormModal";

interface FormModalWrapperProps<T extends FieldValues> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  config: FieldConfig[];
  validationSchema: ObjectSchema<any>;
  onSubmit: (data: T) => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  loading?: boolean;
  size?: ModalSize;
}

export function FormModalWrapper<T extends FieldValues>({
  isOpen,
  onClose,
  title,
  description,
  config,
  validationSchema,
  onSubmit,
  submitButtonText,
  cancelButtonText,
  loading,
  size = "lg",
}: FormModalWrapperProps<T>) {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size={size}
    >
      <DynamicForm<T>
        config={config}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        submitButtonText={submitButtonText}
        cancelButtonText={cancelButtonText}
        loading={loading}
        onCancel={onClose}
      />
    </FormModal>
  );
}
