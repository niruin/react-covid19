import {use} from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import {AvailableLanguages} from 'common/types';

import en from './locales/en.json';
import ru from './locales/ru.json';

const resources = {
  en,
  ru,
};

export const availableLanguages: AvailableLanguages[] = [
  {lang: en.lang, shortName: 'en', nativeName: 'English'},
  {lang: ru.lang, shortName: 'ru', nativeName: 'Русский'},
];

use(initReactI18next).use(LanguageDetector).init({
  resources,
  defaultNS: 'common',
  fallbackLng: 'en',
});
