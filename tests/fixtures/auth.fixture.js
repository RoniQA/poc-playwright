const { test: base } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');
const { MenuPage } = require('../../Pages/MenuPage');
const { InventoryPage } = require('../../Pages/InventoryPage');
const { CartPage } = require('../../Pages/CartPage');

// Fixture for authentication with beforeAll and afterAll
const test = base.extend({
  // Fixture for LoginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Fixture for MenuPage
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await use(menuPage);
  },

  // Fixture for InventoryPage
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  // Fixture for CartPage
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // Fixture for authenticated page
  authenticatedPage: async ({ page, loginPage, menuPage }, use) => {
    // beforeAll - Login once for all tests
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await use(page);
    
    // afterAll - Clean state after each test
    try {
      await menuPage.resetAppState();
    } catch (error) {
      // Ignore cleanup errors if page is not available
      console.log('State was already clean or page not available');
    }
  },
});

module.exports = { test };
module.exports.expect = require('@playwright/test').expect; 