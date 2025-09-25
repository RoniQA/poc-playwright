const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');
const { InventoryPage } = require('../../Pages/InventoryPage');
const { CartPage } = require('../../Pages/CartPage');
const { CheckoutPage } = require('../../Pages/CheckoutPage');

test.describe('SauceDemo Checkout - Page Object Model', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Successful complete checkout', async ({ page }) => {
    // Add item to cart
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Fill information and finish
    await checkoutPage.completeCheckout('John', 'Silva', '12345-678');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('Checkout with empty required fields', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Try to continue without filling
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
  });

  test('Checkout with only first name filled', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Fill only first name
    await checkoutPage.firstNameInput.fill('John');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
  });

  test('Checkout with only name and surname filled', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Fill name and surname
    await checkoutPage.firstNameInput.fill('John');
    await checkoutPage.lastNameInput.fill('Silva');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
  });

  test('Cancel checkout', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Cancel checkout
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart.html/);
  });

  test('Validate checkout information', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Fill information
    await checkoutPage.fillCheckoutInfo('John', 'Silva', '12345-678');
    await checkoutPage.continue();
    
    // Check if on summary page
    await expect(checkoutPage.summaryInfo).toBeVisible();
    await expect(checkoutPage.finishButton).toBeVisible();
  });

  test('Checkout with multiple items', async ({ page }) => {
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