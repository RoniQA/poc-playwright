const { test, expect } = require('../fixtures/complete.fixture');

test.describe('SauceDemo Cart - Optimized with Complete Fixture', () => {

  test('Add one item to cart', async ({ authenticatedPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(1);
  });

  test('Add and remove items from cart', async ({ authenticatedPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(2);
    await cartPage.removeAllItems();
    expect(await cartPage.getCartItemsCount()).toBe(0);
  });

  test('Add multiple items and validate badge', async ({ authenticatedPage, inventoryPage, cartPage }) => {
    for (let i = 0; i < 3; i++) {
      await inventoryPage.addItemToCartByIndex(i);
    }
    expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(3);
  });

  test('Empty the cart', async ({ authenticatedPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await cartPage.goto();
    await cartPage.removeAllItems();
    expect(await cartPage.getCartItemsCount()).toBe(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });
}); 