const { test, expect } = require('../fixtures/complete.fixture');

test.describe('SauceDemo Inventory - Optimized with Complete Fixture', () => {
  
  test('Validate product prices', async ({ authenticatedPage, inventoryPage }) => {
    const productPrices = await inventoryPage.getProductPrices();
    
    // Check if all products have valid prices
    productPrices.forEach(price => {
      expect(price).toMatch(/^\$\d+\.\d{2}$/);
    });
  });

  test('Validate product images', async ({ authenticatedPage, inventoryPage }) => {
    // Check if all images are loaded
    for (let i = 0; i < 6; i++) {
      expect(await inventoryPage.isProductImageLoaded(i)).toBe(true);
    }
  });

  test('Click product to view details', async ({ authenticatedPage, inventoryPage }) => {
    await inventoryPage.clickProductByIndex(0);
    await expect(authenticatedPage).toHaveURL(/.*\/inventory-item.html/);
  });

  test('Add and remove multiple products', async ({ authenticatedPage, inventoryPage }) => {
    // Add products
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await inventoryPage.addItemToCartByIndex(2);
    expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    
    // Remove products
    await inventoryPage.removeItemFromCartByIndex(0);
    await inventoryPage.removeItemFromCartByIndex(0);
    await inventoryPage.removeItemFromCartByIndex(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });

  test('Validate available products quantity', async ({ authenticatedPage, inventoryPage }) => {
    const productNames = await inventoryPage.getProductNames();
    const productPrices = await inventoryPage.getProductPrices();
    
    // Check if there are 6 products (SauceDemo default)
    expect(productNames.length).toBe(6);
    expect(productPrices.length).toBe(6);
  });
}); 