'use client';

import { useEffect, useState } from 'react';
import { Locale, defaultLocale } from '@/i18n/locales';

export const useSafeLocaleStorage = () => {
  const [isClient, setIsClient] = useState(false);
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setIsClient(true);
    
    // 从本地存储恢复语言设置
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    
    if (savedLocale && (savedLocale === 'zh' || savedLocale === 'en')) {
      setLocale(savedLocale);
    } else {
      // 检测浏览器语言
      const browserLang = navigator.language.split('-')[0];
      const newLocale = browserLang === 'zh' ? 'zh' : 'en';
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
    }
  }, []);

  const updateLocale = (newLocale: Locale) => {
    if (isClient) {
      localStorage.setItem('locale', newLocale);
      setLocale(newLocale);
    }
  };

  return { locale, setLocale: updateLocale, isClient };
};

export default useSafeLocaleStorage; 