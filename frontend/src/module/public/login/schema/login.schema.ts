import * as yup from "yup";

export interface LoginFormData {
  email: string;
  password: string;
}

export type LoginSchemaType = yup.InferType<typeof loginSchema>;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i, "Invalid email format"),
  password: yup.string().required("Password is required"),
});


