# Test Structure

This folder contains all automated tests for the project, implemented in **JavaScript**.

## Organization

```
tests/
├── e2e/           # End-to-end tests
│   ├── login.spec.js
│   ├── inventory.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── menu.spec.js
│   ├── inventory-optimized.spec.js    # Optimized example
│   ├── cart-optimized.spec.js         # Optimized example
│   └── checkout-optimized.spec.js     # Optimized example
├── fixtures/      # Shared fixtures
│   ├── global.fixture.js              # Fixtures for all pages
│   ├── auth.fixture.js                # Authentication fixture
│   └── complete.fixture.js            # Complete fixture (recommended)
└── README.md      # This file
```

## Test Types

### E2E (End-to-End)
Tests that simulate complete user behavior, from login to purchase completion.

### Fixtures
Shared fixtures that can be reused in multiple tests to avoid code duplication.

## Implemented Optimizations

### 1. Global Fixtures (`global.fixture.js`)
- Provides instances of all pages (LoginPage, InventoryPage, etc.)
- Avoids repetitive object creation
- Improves test readability

### 2. Authentication Fixture (`auth.fixture.js`)
- **beforeAll**: Automatic login before tests
- **afterAll**: Automatic state cleanup after each test
- Significantly reduces execution time
- Ensures isolation between tests

### 3. Complete Fixture (`complete.fixture.js`) ⭐ **RECOMMENDED**
- Combines automatic authentication with all pages
- Automatic setup and teardown
- Maximum performance optimization
- Easy to use in any test

### 4. Setup/Teardown Hooks
- `test.beforeAll()`: Executes once before all tests in describe
- `test.afterAll()`: Executes once after all tests in describe
- `test.beforeEach()`: Executes before each individual test
- `test.afterEach()`: Executes after each individual test

## Usage Examples

### Traditional Test (without optimization)
```javascript
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});
```

### Optimized Test (with complete fixture) ⭐ **RECOMMENDED**
```javascript
const { test, expect } = require('../fixtures/complete.fixture');

test('My test', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  // Test starts already logged in, clean and with all pages available
  await inventoryPage.addItemToCartByIndex(0);
  await cartPage.goto();
});
```

### Test with beforeAll/afterAll
```javascript
const { test, expect } = require('../fixtures/global.fixture');

test.beforeAll(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test.afterAll(async ({ menuPage }) => {
  await menuPage.resetAppState();
});
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific tests
npx playwright test tests/e2e/login.spec.js

# Run optimized tests
npx playwright test tests/e2e/*-optimized.spec.js

# Run in UI mode
npx playwright test --ui

# Run in headed mode (with visible browser)
npx playwright test --headed
```

## Conventions

- All test files should end with `.spec.js`
- Use Page Object Model to organize selectors and methods
- Keep tests independent and isolated
- Use fixtures for shared code
- **Prefer `complete.fixture.js` for new tests**
- Use `beforeAll`/`afterAll` for global setup/teardown
- Use `beforeEach`/`afterEach` only when necessary 