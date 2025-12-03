import type { LocaleInfo } from '@nuxtjs/i18n';

export default defineNuxtPlugin((nuxtApp) => {
  const LOCALE_STORAGE_KEY = 'locale';
  const i18n = nuxtApp.$i18n as ReturnType<typeof useI18n>;

  function applySavedLocale(): void {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

    if (!savedLocale || savedLocale === i18n.locale.value) return;

    const locales = i18n.locales.value as LocaleInfo[];

    const isValidLocale = locales.some((locale) => locale.code === savedLocale);

    if (isValidLocale) {
      i18n.setLocale(savedLocale as LocaleInfo['code']);
    }
  }

  applySavedLocale();

  nuxtApp.hook('page:finish', applySavedLocale);
});
