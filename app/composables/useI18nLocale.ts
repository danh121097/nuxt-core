import type { LocaleInfo } from '@nuxtjs/i18n';

const LOCALE_STORAGE_KEY = 'locale';

export function useI18nLocale() {
  const { locale, setLocale, locales } = useI18n();

  function changeLocale(newLocale: LocaleInfo['code']): void {
    if (import.meta.client) localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    setLocale(newLocale);
  }

  return {
    locale,
    locales,
    changeLocale
  };
}
