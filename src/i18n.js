import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Импортируем JSON напрямую
import et from '../public/locales/et/translation.json';
import en from '../public/locales/en/translation.json';
import ru from '../public/locales/ru/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'et',
    debug: true,
    resources: {
      et: { translation: et },
      en: { translation: en },
      ru: { translation: ru },
    },
  });

export default i18n;
