import { defineWorkspace } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';

export default defineWorkspace([
  // Unit tests - Node environment
  {
    test: {
      name: 'unit',
      include: ['test/unit/**/*.test.ts'],
      environment: 'node',
      setupFiles: ['test/setup.ts']
    }
  },
  // Nuxt tests - Nuxt environment with @nuxt/test-utils
  await defineVitestProject({
    test: {
      name: 'nuxt',
      include: ['test/nuxt/**/*.test.ts'],
      environment: 'nuxt',
      environmentOptions: {
        nuxt: {
          domEnvironment: 'happy-dom'
        }
      }
    }
  }),
  // E2E tests - Node environment
  {
    test: {
      name: 'e2e',
      include: ['test/e2e/**/*.test.ts'],
      environment: 'node'
    }
  }
]);
