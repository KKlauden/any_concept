'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { Locale, locales, defaultLocale } from '../i18n/locales';
import useSafeLocaleStorage from './useSafeLocaleStorage';

// 将嵌套翻译对象扁平化为 Map，用于 O(1) 查找
function flattenLocale(obj: Record<string, any>, prefix = ''): Map<string, string> {
  const map = new Map<string, string>();
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (typeof value === 'string') {
      map.set(fullKey, value);
    } else if (typeof value === 'object' && value !== null) {
      for (const [k, v] of flattenLocale(value, fullKey)) {
        map.set(k, v);
      }
    }
  }
  return map;
}

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

  // 预计算扁平化翻译 Map，locale 变更时重新生成
  const translationMap = useMemo(() => flattenLocale(locales[locale]), [locale]);

  // 翻译函数：O(1) Map 查找
  const t = useCallback((key: string): string => {
    const value = translationMap.get(key);
    if (value === undefined) {
      console.warn(`Translation key not found: ${key} for locale: ${locale}`);
      return key;
    }
    return value;
  }, [translationMap, locale]);

  const contextValue = useMemo(
    () => ({ locale, setLocale, t, isClient }),
    [locale, setLocale, t, isClient]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
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