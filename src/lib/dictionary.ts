import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
  tr: () => import('@/dictionaries/tr.json').then((module) => module.default),
};

export type Locale = 'en' | 'ru' | 'de' | 'tr';

export const getDictionary = async (locale: Locale) => {
  // Safe fallback if locale is invalid
  const validLocale = dictionaries[locale] ? locale : 'en';
  return dictionaries[validLocale]();
};
