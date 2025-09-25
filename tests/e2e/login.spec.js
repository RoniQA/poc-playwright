const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage');

test.describe('SauceDemo Login - Page Object Model', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Successful login', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Login with invalid user', async () => {
    await loginPage.login('invalid_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toHaveText(/Username and password do not match/);
  });

  test('Login with invalid password', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toHaveText(/Username and password do not match/);
  });

  test('Login with blocked user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toHaveText(/Sorry, this user has been locked out/);
  });

  test('Login with empty fields', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toHaveText(/Username is required/);

    await loginPage.loginWithOnlyUsername('standard_user');
    await expect(loginPage.errorMessage).toHaveText(/Password is required/);
  });
}); 