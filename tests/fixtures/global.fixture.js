const { test: base } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');
const { InventoryPage } = require('../../Pages/InventoryPage');
const { CartPage } = require('../../Pages/CartPage');
const { CheckoutPage } = require('../../Pages/CheckoutPage');
const { MenuPage } = require('../../Pages/MenuPage');

// Fixtures globais para todas as páginas
const test = base.extend({
  // Fixture para LoginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Fixture para InventoryPage
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  // Fixture para CartPage
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // Fixture para CheckoutPage
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  // Fixture para MenuPage
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await use(menuPage);
  },
});

module.exports = { test };
module.exports.expect = require('@playwright/test').expect; 