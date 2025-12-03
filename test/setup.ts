// Global test setup
import { vi } from 'vitest';
import * as vue from 'vue';

// Auto-import mocks for Vue composables
(globalThis as any).ref = vue.ref;
(globalThis as any).computed = vue.computed;
(globalThis as any).readonly = vue.readonly;
(globalThis as any).watch = vue.watch;
(globalThis as any).onBeforeUnmount = vue.onBeforeUnmount;
(globalThis as any).onMounted = vue.onMounted;
(globalThis as any).onUnmounted = vue.onUnmounted;
(globalThis as any).reactive = vue.reactive;
(globalThis as any).toRef = vue.toRef;
(globalThis as any).toRefs = vue.toRefs;
(globalThis as any).shallowRef = vue.shallowRef;
(globalThis as any).triggerRef = vue.triggerRef;
(globalThis as any).unref = vue.unref;
(globalThis as any).defineNuxtPlugin = (cb: any) => cb;

// Mock localStorage for SSR tests
if (typeof localStorage === 'undefined') {
  const storageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn()
  };
  globalThis.localStorage = storageMock;
}
