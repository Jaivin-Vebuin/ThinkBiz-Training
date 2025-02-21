import i18n from "i18next";
import { englishTranslation } from "./en/englishTranslation";
import { initReactI18next } from "react-i18next";
import { hindiTranslation } from "./hi/hindiTranslation";
import store from "../redux/store/store";

const initializeI18n = async () => {
  const current_lang = store.getState();
  const persistedLang = current_lang.lang.language;

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: englishTranslation,
        },
        hi: {
          translation: hindiTranslation,
        },
      },
      lng: persistedLang,
      fallbackLng: "en",
    });
};

initializeI18n();

export default i18n;