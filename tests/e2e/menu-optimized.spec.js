const { test, expect } = require('../fixtures/complete.fixture');

test.describe('SauceDemo Menu - Optimized with Complete Fixture', () => {
  test('Successful logout', async ({ authenticatedPage, menuPage }) => {
    await menuPage.logout();
    await expect(authenticatedPage).toHaveURL(/.*\/$/);
    await expect(authenticatedPage.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('Reset application state', async ({ authenticatedPage, menuPage, inventoryPage }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    await menuPage.resetAppState();
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });

  test('Open and close hamburger menu', async ({ authenticatedPage, menuPage }) => {
    await menuPage.openMenu();
    await expect(menuPage.logoutLink).toBeVisible();
    await expect(menuPage.aboutLink).toBeVisible();
    await expect(menuPage.resetAppStateLink).toBeVisible();

    await menuPage.closeMenu();
    await expect(menuPage.logoutLink).not.toBeVisible();
  });

  test('Navigate to About through menu', async ({ authenticatedPage, menuPage }) => {
    await menuPage.goToAbout();
    await expect(authenticatedPage).toHaveURL(/saucelabs.com/);
  });

  test('Navigate to All Items through menu', async ({ authenticatedPage, menuPage }) => {
    await authenticatedPage.locator('.shopping_cart_link').click();
    await expect(authenticatedPage).toHaveURL(/.*\/cart.html/);

    await menuPage.goToAllItems();
    await expect(authenticatedPage).toHaveURL(/inventory.html/);
  });
});
