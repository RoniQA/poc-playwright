const { test: base } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');
const { InventoryPage } = require('../../Pages/InventoryPage');
const { CartPage } = require('../../Pages/CartPage');
const { CheckoutPage } = require('../../Pages/CheckoutPage');
const { MenuPage } = require('../../Pages/MenuPage');

// Fixture completa com autenticação automática e todas as páginas
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

  // Fixture para página autenticada (setup automático)
  authenticatedPage: async ({ page, loginPage, menuPage }, use) => {
    // Login automático
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await use(page);
    
    // Limpeza automática
    try {
      await menuPage.resetAppState();
    } catch (error) {
      console.log('Estado já estava limpo ou página não disponível');
    }
  },
});

module.exports = { test };
module.exports.expect = require('@playwright/test').expect; 