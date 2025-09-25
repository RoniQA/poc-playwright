const { test: base } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');
const { InventoryPage } = require('../../Pages/InventoryPage');
const { CartPage } = require('../../Pages/CartPage');
const { CheckoutPage } = require('../../Pages/CheckoutPage');
const { MenuPage } = require('../../Pages/MenuPage');

// Complete fixture with automatic authentication and all pages
const test = base.extend({
  // Fixture for LoginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
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

  // Fixture for CheckoutPage
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  // Fixture for MenuPage
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await use(menuPage);
  },

  // Fixture for authenticated page (automatic setup)
  authenticatedPage: async ({ page, loginPage, menuPage }, use) => {
    // Automatic login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await use(page);
    
    // Automatic cleanup
    try {
      await menuPage.resetAppState();
    } catch (error) {
      console.log('State was already clean or page not available');
    }
  },
});

module.exports = { test };
module.exports.expect = require('@playwright/test').expect; 