// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: 'latest',
  app: {
    head: {
      title: 'Nuxt Core Starter'
    }
  },
  devtools: {
    enabled: false
  },
  css: ['./app/scss/plugins.css', './app/scss/app.scss'],
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    locales: [
      { code: 'en', name: 'English', file: 'en.ts' },
      { code: 'jp', name: 'Japanese', file: 'jp.ts' }
    ],
    types: 'composition'
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/content',
    '@nuxtjs/i18n'
  ]
});
