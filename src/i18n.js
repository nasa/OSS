import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-http-backend";

const FALLBACK_LOCALE = "en"; // Use this language as a fallback if we don't provide the one specified by the browser.

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true, // Enable the debugger environment?
    defaultNS: "translations",
    fallbackLng: FALLBACK_LOCALE,
    interpolation: { escapeValue: false, formatSeparator: "," },
    keySeparator: ".",
    ns: ["translations"], // Root level property containing translations
    react: {
      bindI18n: "languageChanged loaded",
      bindI18nStore: "added removed",
      nsMode: "default",
      useSuspense: false
    },
    resources: {
      en: require("./languages/en-US/GroupMgmt.json"),
      jp: require("./languages/ja-JP/GroupMgmt.json"),
      otherLanguages: FALLBACK_LOCALE
    }
  });

export default i18n;
