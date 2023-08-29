import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import de from './de.json';
import {Platform, NativeModules} from 'react-native';

const getDeviceLang = () => {
  const appLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return appLanguage.search(/-|_/g) !== -1
    ? appLanguage.slice(0, 2)
    : appLanguage;
};

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

const setDefaultLanguage = () => {
  const deviceLang = getDeviceLang();

  i18n.use(initReactI18next).init({
    resources,
    lng: deviceLang,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });
};

export default setDefaultLanguage;
