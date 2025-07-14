import en from './en';
import zh from './zh';

export type Locale = 'en' | 'zh';

export type LocaleContent = typeof zh;

export const locales: Record<Locale, LocaleContent> = {
  en,
  zh,
};

export const defaultLocale: Locale = 'zh'; 