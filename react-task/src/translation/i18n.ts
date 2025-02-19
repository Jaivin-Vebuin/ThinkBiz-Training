import i18n from "i18next";
import { englishTranslation } from "./en/englishTranslation";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { hindiTranslation } from "./hi/hindiTranslation";

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: englishTranslation,
    },
    hi: {
      translation: hindiTranslation,
    },
  },
});
