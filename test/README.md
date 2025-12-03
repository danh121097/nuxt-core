# Testing Documentation

## Overview

This project uses **Vitest** as the primary testing framework with comprehensive test coverage across all components, utilities, composables, and pages.

## Running Tests

### All Tests

```bash
bun run test
```

### Unit Tests Only

```bash
bun run test:unit
```

### Nuxt Tests Only

```bash
bun run test:nuxt
```

### With Coverage Report

```bash
bun run test:coverage
```

### Watch Mode (for development)

```bash
bun run test:watch
```

### UI Mode (interactive)

```bash
bun run test:ui
```

## Coverage Requirements

This project maintains **100% code coverage** across:

- ✅ All utility functions (`app/utils/`)
- ✅ All composables (`app/composables/`)
- ✅ All plugins (`app/plugins/`)
- ✅ All pages (`app/pages/`)

Coverage thresholds are enforced in `vitest.config.ts`:

- Lines: 100%
- Functions: 100%
- Branches: 100%
- Statements: 100%

## Writing New Tests

### Unit Tests (Pure Functions)

Place in `test/unit/` for functions that don't require Nuxt runtime:

```typescript
import { describe, it, expect } from 'vitest';
import { myUtility } from '../../app/utils/myUtility';

describe('myUtility', () => {
  it('should do something', () => {
    expect(myUtility('input')).toBe('expected');
  });
});
```

### Nuxt Tests (Composables/Components)

Place in `test/nuxt/` for code that requires Nuxt runtime:

```typescript
import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import MyComponent from '../../../app/components/MyComponent.vue';

describe('MyComponent', () => {
  it('should render', async () => {
    const wrapper = await mountSuspended(MyComponent);
    expect(wrapper.exists()).toBe(true);
  });
});
```

### E2E Tests

Place in `test/e2e/` for full application flow tests:

```typescript
import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils/e2e';

describe('My E2E Test', async () => {
  await setup();

  it('should fetch page', async () => {
    const html = await $fetch('/my-page');
    expect(html).toContain('expected content');
  });
});
```

## Test Utilities

### Mocking

```typescript
import { vi } from 'vitest';

// Mock a function
const mockFn = vi.fn();

// Mock a module
vi.mock('#app', () => ({
  useI18n: () => ({ locale: 'en' })
}));
```

### Fake Timers

```typescript
import { vi, beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('should advance time', () => {
  vi.advanceTimersByTime(1000);
});
```

### Component Testing

```typescript
import { mountSuspended } from '@nuxt/test-utils/runtime';

const wrapper = await mountSuspended(Component, {
  props: {
    /* props */
  },
  global: {
    mocks: {
      /* mocks */
    },
    stubs: {
      /* stubs */
    }
  }
});
```

## CI/CD Integration

Tests run automatically in CI/CD pipelines. The test suite must pass with 100% coverage before merging.

### GitHub Actions Example

```yaml
- name: Run Tests
  run: bun run test:coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/coverage-final.json
```

## Debugging Tests

### Run specific test file

```bash
bun run vitest test/unit/utils.test.ts
```

### Run tests matching pattern

```bash
bun run vitest -t "numeralFormat"
```

### Debug in UI mode

```bash
bun run test:ui
```

Then open the browser UI to interactively debug tests.

## Best Practices

1. **Test behavior, not implementation** - Focus on what the code does, not how it does it
2. **Use descriptive test names** - Test names should clearly describe what is being tested
3. **Arrange-Act-Assert pattern** - Structure tests with clear setup, execution, and verification
4. **Test edge cases** - Include tests for null, undefined, empty values, and boundary conditions
5. **Keep tests isolated** - Each test should be independent and not rely on other tests
6. **Mock external dependencies** - Use mocks for API calls, timers, and external services
7. **Maintain 100% coverage** - All new code must include comprehensive tests

## Troubleshooting

### Tests fail with "Cannot find module"

- Ensure all dependencies are installed: `bun install`
- Check that paths in imports are correct

### Coverage not reaching 100%

- Run `bun run test:coverage` and check the HTML report in `coverage/index.html`
- Identify uncovered lines and add tests for those cases

### Nuxt tests fail

- Ensure `@nuxt/test-utils/module` is in `nuxt.config.ts`
- Check that test files are in the correct directory (`test/nuxt/`)

### E2E tests timeout

- Increase timeout in `vitest.config.ts` if needed
- Check that the Nuxt app builds successfully
