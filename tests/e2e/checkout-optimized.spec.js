const { test, expect } = require('../fixtures/complete.fixture');

test.describe('SauceDemo Checkout - Optimized with Complete Fixture', () => {

  test('Successful complete checkout', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage }) => {
    // Add item to cart
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Fill information and finish
    await checkoutPage.completeCheckout('John', 'Silva', '12345-678');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('Checkout with empty required fields', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Try to continue without filling
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
  });

  test('Cancel checkout', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Cancel checkout
    await checkoutPage.cancel();
    await expect(authenticatedPage).toHaveURL(/cart.html/);
  });

  test('Checkout with multiple items', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage }) => {
    // Add multiple items
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await inventoryPage.addItemToCartByIndex(2);
    
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(3);
    
    await cartPage.checkout();
    await checkoutPage.completeCheckout('John', 'Silva', '12345-678');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
}); 