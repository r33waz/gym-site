import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email or username is required")
    .test("email-or-username", "Enter a valid email or username", (value) => {
      if (!value) return false;

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

      return emailRegex.test(value) || usernameRegex.test(value);
    }),
  password: yup.string().required("Password is required"),
});
