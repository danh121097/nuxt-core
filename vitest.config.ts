import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'app/utils/**/*.ts',
        'app/composables/**/*.ts',
        'app/plugins/**/*.ts'
      ],
      exclude: [
        'app/**/*.config.ts',
        'app/app.vue',
        'app/pages/**',
        'app/error.vue',
        'app/scss/**',
        'node_modules/**',
        'test/**',
        '.nuxt/**'
      ],
      all: true,
      thresholds: {
        'app/utils/**/*.ts': {
          lines: 100,
          functions: 100,
          branches: 100,
          statements: 100
        }
      }
    }
  }
});
