const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');
const { InventoryPage } = require('../../Pages/InventoryPage');
const { CartPage } = require('../../Pages/CartPage');

test.describe('SauceDemo Cart - Page Object Model', () => {
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

  test('Add one item to cart', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(1);
  });

  test('Add and remove items from cart', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(2);
    await cartPage.removeAllItems();
    expect(await cartPage.getCartItemsCount()).toBe(0);
  });

  test('Add multiple items and validate badge', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await inventoryPage.addItemToCartByIndex(i);
    }
    expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(3);
  });

  test('Empty the cart', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await cartPage.goto();
    await cartPage.removeAllItems();
    expect(await cartPage.getCartItemsCount()).toBe(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });
}); 