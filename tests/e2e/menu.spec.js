const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');
const { MenuPage } = require('../../Pages/MenuPage');
const { InventoryPage } = require('../../Pages/InventoryPage');

test.describe('SauceDemo Menu - Page Object Model', () => {
  let loginPage;
  let menuPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    menuPage = new MenuPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Logout com sucesso', async ({ page }) => {
    await menuPage.logout();
    await expect(page).toHaveURL(/.*\/$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('Reset do estado da aplicação', async ({ page }) => {
    // Adiciona itens ao carrinho
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);
    
    // Reseta o estado
    await menuPage.resetAppState();
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });

  test('Abrir e fechar menu hambúrguer', async ({ page }) => {
    await menuPage.openMenu();
    await expect(menuPage.logoutLink).toBeVisible();
    await expect(menuPage.aboutLink).toBeVisible();
    await expect(menuPage.resetAppStateLink).toBeVisible();
    
    await menuPage.closeMenu();
    await expect(menuPage.logoutLink).not.toBeVisible();
  });

  test('Navegar para About através do menu', async ({ page }) => {
    await menuPage.goToAbout();
    await expect(page).toHaveURL(/saucelabs.com/);
  });

  test('Navegar para All Items através do menu', async ({ page }) => {
    // Primeiro vai para o carrinho
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*\/cart.html/);
    
    // Depois volta para todos os itens via menu
    await menuPage.goToAllItems();
    await expect(page).toHaveURL(/inventory.html/);
  });
}); 