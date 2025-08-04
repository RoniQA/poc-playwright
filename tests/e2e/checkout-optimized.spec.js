const { test, expect } = require('../fixtures/complete.fixture');

test.describe('SauceDemo Checkout - Otimizado com Complete Fixture', () => {
  
  test('Checkout completo com sucesso', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage }) => {
    // Adiciona item ao carrinho
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Preenche informações e finaliza
    await checkoutPage.completeCheckout('João', 'Silva', '12345-678');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('Checkout com campos obrigatórios vazios', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Tenta continuar sem preencher
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
  });

  test('Cancelar checkout', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Cancela o checkout
    await checkoutPage.cancel();
    await expect(authenticatedPage).toHaveURL(/cart.html/);
  });

  test('Checkout com múltiplos itens', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage }) => {
    // Adiciona múltiplos itens
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await inventoryPage.addItemToCartByIndex(2);
    
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(3);
    
    await cartPage.checkout();
    await checkoutPage.completeCheckout('João', 'Silva', '12345-678');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
}); 