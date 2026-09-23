// /src/react-i18next.d.ts
import "react-i18next";
import translation from "locales/en/translation.json";

declare module "react-i18next" {
  interface Resources {
    translation: typeof translation;
  }
}

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof translation;
    };
  }
}
