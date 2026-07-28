import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ne } from "./trans";

export const geti18nLanguage = (language: string) => {
  try {
    const value = atob(atob(localStorage.getItem(btoa(btoa(language))) ?? ""));
    return value || null; // normalize "" to null so ?? works correctly
  } catch (e) {
    return null;
  }
};

export const setI18nLanguage = (language: string, value: string) => {
  try {
    localStorage.setItem(btoa(btoa(language)), btoa(btoa(value)));
  } catch (e) {
    return null;
  }
};

// the translations
const resources = {
  en,
  ne,
};

const nepaliCount = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

i18n.use(initReactI18next).init({
  resources,
  lng: geti18nLanguage("language") ?? "en",
  fallbackLng: "en",
  defaultNS: "common",
  keySeparator: ".",
  interpolation: { escapeValue: false },
});

// keep localStorage in sync whenever the language changes, from anywhere in the app
i18n.on("languageChanged", (lng) => {
  setI18nLanguage("language", lng);
});

export function getTextByLanguage<T, U>(languageEn: T, languageNe: U): T | U {
  if (i18n.language === "ne") {
    return languageNe;
  }
  return languageEn;
}

export const convertEngToNepNumber = (
  numberEn: string | number | undefined,
) => {
  if (!numberEn && numberEn != 0) return "";
  return (typeof numberEn === "string" ? numberEn : numberEn.toString())
    .split("")
    .map((number) => (nepaliCount[+number] ? nepaliCount[+number] : number))
    .join("");
};

export default i18n;
