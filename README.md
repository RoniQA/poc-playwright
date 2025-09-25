# poc-playwright

This project is a proof of concept using Playwright with an organized structure following best practices, implemented in **JavaScript**.

## 📁 Project Structure

```
poc-playwright/
├── tests/                    # Folder for all tests
│   ├── e2e/                 # End-to-end tests
│   │   ├── login.spec.js
│   │   ├── inventory.spec.js
│   │   ├── cart.spec.js
│   │   ├── checkout.spec.js
│   │   ├── menu.spec.js
│   │   ├── inventory-optimized.spec.js    # Optimized example
│   │   ├── cart-optimized.spec.js         # Optimized example
│   │   └── checkout-optimized.spec.js     # Optimized example
│   ├── fixtures/            # Shared fixtures
│   │   ├── global.fixture.js              # Fixtures for all pages
│   │   ├── auth.fixture.js                # Authentication fixture
│   │   └── complete.fixture.js            # Complete fixture (recommended)
│   └── README.md
├── Pages/                   # Page Objects
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── MenuPage.js
├── playwright.config.js     # Playwright configuration
└── package.json
```

## 💻 Installation

```bash
npm install
```

## 🚀 Running Tests

```bash
# Run all tests
npm run test

# Run specific tests
npx playwright test tests/e2e/login.spec.js

# Run optimized tests
npx playwright test tests/e2e/*-optimized.spec.js

# Run in headed mode (with visible browser)
npm run test:headed

# Run in UI mode
npx playwright test --ui
```

## 📊 Reports

After running tests, an HTML report will be generated in `playwright-report`.
To open the report, run:

```bash
npm run report
```

## 🔒 Implemented Best Practices

- ✅ **Organized structure**: Tests separated in dedicated folder
- ✅ **Page Object Model**: Each page has its corresponding class
- ✅ **Shared fixtures**: Reusable code for authentication
- ✅ **Optimized configuration**: Timeouts, retries and reports configured
- ✅ **Separation by functionality**: Tests organized by domain
- ✅ **Documentation**: Specific README for test structure
- ✅ **Optimization with beforeAll/afterAll**: Efficient setup and teardown
- ✅ **Test isolation**: Automatic state cleanup between tests
- ✅ **Complete fixture**: Maximum optimization with automatic setup
- ✅ **Pure JavaScript**: No TypeScript dependencies

## ⚡ Performance Optimizations

### Global Fixtures
- Reusable page instances
- Reduced code duplication
- Better readability

### Optimized Authentication
- Login executed once per test suite
- Automatic state cleanup after each test
- Significant reduction in execution time

### Complete Fixture ⭐ **RECOMMENDED**
- Combines automatic authentication with all pages
- Automatic setup and teardown
- Maximum performance optimization
- Easy to use in any test

### Strategic Hooks
- `beforeAll`: Global setup for test suite
- `afterAll`: Final cleanup after all tests
- `beforeEach`: Individual setup when needed
- `afterEach`: Individual cleanup when needed

## 🎯 Usage Examples

### Optimized Test (Recommended)
```javascript
const { test, expect } = require('../fixtures/complete.fixture');

test('My test', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  // Test starts already logged in, clean and with all pages available
  await inventoryPage.addItemToCartByIndex(0);
  await cartPage.goto();
});
```

## ⚙️ Technologies

- Playwright
- Node.js
- JavaScript

## 👤 Author

RoniQA
