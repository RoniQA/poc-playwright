import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { InventoryPage } from '../../Pages/InventoryPage';
import { CartPage } from '../../Pages/CartPage';
import { CheckoutPage } from '../../Pages/CheckoutPage';
import { MenuPage } from '../../Pages/MenuPage';

// Fixtures globais para todas as páginas
export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  menuPage: MenuPage;
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
});

export { expect }; 