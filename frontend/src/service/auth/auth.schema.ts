import * as yup from "yup"; // Import Yup for schema-based form validation

export const loginSchema = yup.object().shape({
  // Define validation schema for the login form
  email: yup
    .string() // Must be a string value
    .required("Email or username is required") // Field cannot be empty
    .test("email-or-username", "Enter a valid email or username", (value) => {
      if (!value) return false; // Fail validation if value is empty or undefined

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // Regex pattern to validate standard email format

      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Regex pattern to validate alphanumeric username (3–20 chars)

      return emailRegex.test(value) || usernameRegex.test(value); // Pass if value matches either email or username format
    }),
  password: yup.string().required("Password is required"), // Password must be a non-empty string
});
