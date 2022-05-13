import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationsEng from "../localization/eng/translation.json";
import translationsRu from "../localization/ru/translation.json";
import translationsUz from "../localization/uz/translation.json";
let lang = localStorage.getItem("lang");
i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationsEng },
      ru: { translation: translationsRu },
      uz: { translation: translationsUz },
    },
    lng: lang,
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
    supportedLangs: ["en", "ru", "uz"],
    debug: false,
    // Options for language detector
    detection: {
      order: ["cookie", "path", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    // backend: {
    //   loadPath: "/assets/locales/{{lng}}/translation.json",
    // },
  });
