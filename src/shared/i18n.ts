import en from '@/locales/en.json';

type Messages = typeof en;
type Locale = 'en';

const locales: Record<Locale, Messages> = {
    en,
};

let currentLocale: Locale = 'en';

export const setLocale = (locale: Locale) => {
    if (locales[locale]) {
        currentLocale = locale;
    } else {
        console.warn(`Locale "${locale}" not supported. Defaulting to "en".`);
    }
};

export const getLocalizedMessage = (key: keyof Messages, fallback?: string): string => {
    return locales[currentLocale][key] || fallback || 'Message not available';
};