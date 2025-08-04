const { test, expect } = require('../fixtures/complete.fixture');

test.describe('SauceDemo Carrinho - Otimizado com Complete Fixture', () => {
  
  test('Adicionar um item ao carrinho', async ({ authenticatedPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(1);
  });

  test('Adicionar e remover itens do carrinho', async ({ authenticatedPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(2);
    await cartPage.removeAllItems();
    expect(await cartPage.getCartItemsCount()).toBe(0);
  });

  test('Adicionar múltiplos itens e validar badge', async ({ authenticatedPage, inventoryPage, cartPage }) => {
    for (let i = 0; i < 3; i++) {
      await inventoryPage.addItemToCartByIndex(i);
    }
    expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(3);
  });

  test('Esvaziar o carrinho', async ({ authenticatedPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await cartPage.goto();
    await cartPage.removeAllItems();
    expect(await cartPage.getCartItemsCount()).toBe(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });
}); 