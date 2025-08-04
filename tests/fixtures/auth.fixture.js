const { test: base } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');
const { MenuPage } = require('../../Pages/MenuPage');
const { InventoryPage } = require('../../Pages/InventoryPage');
const { CartPage } = require('../../Pages/CartPage');

// Fixture para autenticação com beforeAll e afterAll
const test = base.extend({
  // Fixture para LoginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Fixture para MenuPage
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await use(menuPage);
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

  // Fixture para página autenticada
  authenticatedPage: async ({ page, loginPage, menuPage }, use) => {
    // beforeAll - Login uma vez para todos os testes
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await use(page);
    
    // afterAll - Limpar estado após cada teste
    try {
      await menuPage.resetAppState();
    } catch (error) {
      // Ignora erros de limpeza se a página não estiver disponível
      console.log('Estado já estava limpo ou página não disponível');
    }
  },
});

module.exports = { test };
module.exports.expect = require('@playwright/test').expect; 