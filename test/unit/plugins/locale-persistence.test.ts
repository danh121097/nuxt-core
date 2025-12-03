import { describe, it, expect, vi, beforeEach } from 'vitest';

// Stub defineNuxtPlugin before import
const defineNuxtPluginMock = vi.fn((callback) => callback);
vi.stubGlobal('defineNuxtPlugin', defineNuxtPluginMock);

// Import the plugin
import localePersistencePlugin from '../../../app/plugins/locale-persistence.client';

describe('locale-persistence plugin', () => {
  const setLocaleMock = vi.fn();
  const localeRef = { value: 'en' };
  const localesRef = { value: [{ code: 'en' }, { code: 'vi' }] };
  const hookMock = vi.fn();

  const nuxtAppMock = {
    $i18n: {
      locale: localeRef,
      locales: localesRef,
      setLocale: setLocaleMock
    },
    hook: hookMock
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localeRef.value = 'en';
  });

  it('should apply saved locale if valid', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue('vi');

    localePersistencePlugin(nuxtAppMock as any);

    expect(setLocaleMock).toHaveBeenCalledWith('vi');
  });

  it('should ignore invalid saved locale', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue('invalid');

    localePersistencePlugin(nuxtAppMock as any);

    expect(setLocaleMock).not.toHaveBeenCalled();
  });

  it('should register page:finish hook', () => {
    localePersistencePlugin(nuxtAppMock as any);
    expect(hookMock).toHaveBeenCalledWith('page:finish', expect.any(Function));
  });

  it('should re-apply locale on page:finish', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue('vi');
    localePersistencePlugin(nuxtAppMock as any);

    // Get the hook callback
    // Note: Since we call the plugin multiple times in tests, hookMock might have multiple calls
    // We should look at the last call or clear mocks
    const hookCallback = hookMock.mock.calls[hookMock.mock.calls.length - 1][1];

    // Reset mock to check if called again
    setLocaleMock.mockClear();

    // Call hook
    hookCallback();

    expect(setLocaleMock).toHaveBeenCalledWith('vi');
  });
});
