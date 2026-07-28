import { getTextByLanguage } from "@/i18n/i18n";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const { t } = useTranslation();
  return <div>{getTextByLanguage("LandingPage", "ल्यान्डिङ पृष्ठ")}</div>;
};

export default LandingPage;
