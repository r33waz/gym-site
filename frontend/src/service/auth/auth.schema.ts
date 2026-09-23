import * as yup from "yup"; // Import Yup for schema-based form validation
import { getTextByLanguage } from "@/i18n/i18n";

export interface PasswordRule {
  label: string; // shown in the live checklist under the input
  message: string; // i18n key, shown via yup's FormMessage on submit/blur
  regex: RegExp;
}

export const passwordRules: PasswordRule[] = [
  {
    label: getTextByLanguage("At least 8 characters", "कम्तिमा ८ अक्षर"),
    message: "auth:form.passwordMinLength",
    regex: /.{8,}/,
  },
  {
    label: getTextByLanguage("One uppercase letter", "एक ठूलो अक्षर"),
    message: "auth:form.passwordUppercase",
    regex: /[A-Z]/,
  },
  {
    label: getTextByLanguage("One lowercase letter", "एक सानो अक्षर"),
    message: "auth:form.passwordLowercase",
    regex: /[a-z]/,
  },
  {
    label: getTextByLanguage("One number", "एक अंक"),
    message: "auth:form.passwordNumber",
    regex: /[0-9]/,
  },
  {
    label: getTextByLanguage("One special character", "एक विशेष क्यारेक्टर"),
    message: "auth:form.passwordSpecialChar",
    regex: /[^A-Za-z0-9]/,
  },
];

export const loginSchema = yup.object().shape({
  email: yup.string().required("auth:form.emailOrUsernamerequired"),

  password: yup.string().required("auth:form.passwordRequired"),
});

const passwordValidation = passwordRules.reduce(
  (schema, rule) =>
    schema.matches(rule.regex, {
      message: rule.message,
      excludeEmptyString: true,
    }),
  yup.string().required("auth:form.passwordRequired"),
);

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("auth:form.validEmail")
    .required("auth:form.emailrequired"),
  username: yup
    .string()
    .required("auth:form.usernameRequired")
    .matches(/^[A-Za-z]+$/, "auth:form.validUsername"),
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "auth:form.matchPassword")
    .required("auth:form.confirmPasswordRequired"),
});
