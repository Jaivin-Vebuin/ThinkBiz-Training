import i18n from "i18next";
import { englishTranslation } from "./en/englishTranslation";
import { initReactI18next } from "react-i18next";
import { hindiTranslation } from "./hi/hindiTranslation";
import storage from "redux-persist/lib/storage";

const getPersistedLanguage = async () => {
  const persistedState = await storage.getItem('persist:current_lang');
  if (persistedState) {
    const parsedState = JSON.parse(persistedState);
    const lang = JSON.parse(parsedState.lang);
    return lang.language;
  }
  return "en";
};

const initializeI18n = async () => {
  const persistedLanguage = await getPersistedLanguage();

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
      lng: persistedLanguage,
      fallbackLng: "en",
    });
};

initializeI18n();

export default i18n;