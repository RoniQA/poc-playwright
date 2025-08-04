const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');
const { InventoryPage } = require('../../Pages/InventoryPage');
const { CartPage } = require('../../Pages/CartPage');

test.describe('SauceDemo Carrinho - Page Object Model', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Adicionar um item ao carrinho', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(1);
  });

  test('Adicionar e remover itens do carrinho', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(2);
    await cartPage.removeAllItems();
    expect(await cartPage.getCartItemsCount()).toBe(0);
  });

  test('Adicionar múltiplos itens e validar badge', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await inventoryPage.addItemToCartByIndex(i);
    }
    expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(3);
  });

  test('Esvaziar o carrinho', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await cartPage.goto();
    await cartPage.removeAllItems();
    expect(await cartPage.getCartItemsCount()).toBe(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });
}); 