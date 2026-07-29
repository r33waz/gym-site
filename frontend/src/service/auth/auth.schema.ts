import * as yup from "yup"; // Import Yup for schema-based form validation

export const loginSchema = yup.object().shape({
  // Define validation schema for the login form
  email: yup
    .string() // Must be a string value
    .required("auth:form.emailOrUsernamerequired"), // Field cannot be empty

  password: yup.string().required("auth:form.passwordRequired"), // Password must be a non-empty string
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("auth:form.validEmail")
    .required("auth:form.emailrequired"), // Email must be a non-empty string
  username: yup
    .string()
    .required("auth:form.usernameRequired")
    .matches(/^[A-Za-z]+$/, "auth:form.validUsername"), // Password must be a non-empty string
  password: yup.string().required("auth:form.passwordRequired"), // Password must be a non-empty string
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "auth:form.matchPassword")
    .required("auth:form.confirmPasswordRequired"), // Password must be a non-empty string
});
