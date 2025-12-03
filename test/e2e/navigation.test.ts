import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils/e2e';

describe('E2E - Navigation Flow', async () => {
  await setup({
    browser: false
  });

  it('should render home page', async () => {
    const html = await $fetch('/');
    expect(html).toContain('Nuxt Core Starter');
  });

  it('should render about page', async () => {
    const html = await $fetch('/about');
    expect(html).toBeTruthy();
  });

  it('should handle locale prefix routes', async () => {
    const html = await $fetch('/en');
    expect(html).toBeTruthy();
  });

  it('should return 404 for invalid routes', async () => {
    try {
      await $fetch('/invalid-route-that-does-not-exist');
      expect.fail('Should have thrown 404');
    } catch (error: any) {
      expect(error.response?.status).toBe(404);
    }
  });
});
