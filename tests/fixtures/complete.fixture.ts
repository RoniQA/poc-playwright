import { test as base } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { InventoryPage } from '../../Pages/InventoryPage';
import { CartPage } from '../../Pages/CartPage';
import { CheckoutPage } from '../../Pages/CheckoutPage';
import { MenuPage } from '../../Pages/MenuPage';

// Fixture completa com autenticação automática e todas as páginas
export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  menuPage: MenuPage;
  authenticatedPage: any;
}>({
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

export { expect } from '@playwright/test'; 