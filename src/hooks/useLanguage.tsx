'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { Locale, locales, defaultLocale } from '../i18n/locales';
import useSafeLocaleStorage from './useSafeLocaleStorage';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isClient: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { locale, setLocale, isClient } = useSafeLocaleStorage();

  useEffect(() => {
    // 更新 HTML lang 属性
    if (isClient) {
      document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    }
  }, [locale, isClient]);

  // 翻译函数
  const t = (key: string): string => {
    // 通过点表示法访问嵌套属性
    const keys = key.split('.');
    let value: any = locales[locale];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} for locale: ${locale}`);
        return key; // 如果找不到翻译，返回原始键
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isClient }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default useLanguage; 