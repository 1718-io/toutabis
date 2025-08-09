// Simple i18n utility - already handled by useLanguage hook
// This file exists for potential future expansion of i18n functionality

export type Language = 'en' | 'fr';

export const supportedLanguages: Language[] = ['en', 'fr'];

export const languageNames: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
};

export function isValidLanguage(lang: string): lang is Language {
  return supportedLanguages.includes(lang as Language);
}

export function getDefaultLanguage(): Language {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    if (isValidLanguage(browserLang)) {
      return browserLang;
    }
  }
  return 'en';
}

export function formatDate(date: Date | string, language: Language): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  
  return parsedDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRelativeTime(date: Date | string, language: Language): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);
  
  const timeUnits = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  
  const rtf = new Intl.RelativeTimeFormat(language === 'fr' ? 'fr' : 'en', {
    numeric: 'auto',
  });
  
  for (const [unit, seconds] of Object.entries(timeUnits)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return rtf.format(-interval, unit as Intl.RelativeTimeFormatUnit);
    }
  }
  
  return rtf.format(-diffInSeconds, 'second');
}
