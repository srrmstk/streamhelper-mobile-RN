import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import ru from './ru';

i18n.use(initReactI18next).init({
  resources: { en, ru },
  // @TODO: define based on system locale
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  debug: false,
});

export default i18n;
