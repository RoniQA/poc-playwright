const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');
const { InventoryPage } = require('../../Pages/InventoryPage');

test.describe('SauceDemo Inventory - Page Object Model', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Validate product prices', async ({ page }) => {
    const productPrices = await inventoryPage.getProductPrices();
    
    // Check if all products have valid prices
    productPrices.forEach(price => {
      expect(price).toMatch(/^\$\d+\.\d{2}$/);
    });
  });

  test('Validate product images', async ({ page }) => {
    // Check if all images are loaded
    for (let i = 0; i < 6; i++) {
      expect(await inventoryPage.isProductImageLoaded(i)).toBe(true);
    }
  });

  test('Click product to view details', async ({ page }) => {
    await inventoryPage.clickProductByIndex(0);
    await expect(page).toHaveURL(/.*\/inventory-item.html/);
  });

  test('Add and remove multiple products', async ({ page }) => {
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

  test('Validate available products quantity', async ({ page }) => {
    const productNames = await inventoryPage.getProductNames();
    const productPrices = await inventoryPage.getProductPrices();
    
    // Check if there are 6 products (SauceDemo default)
    expect(productNames.length).toBe(6);
    expect(productPrices.length).toBe(6);
  });
}); 