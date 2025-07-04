import { test, expect } from '@playwright/test';
import { LoginPage } from './Pages/LoginPage';

test.describe('SauceDemo Login - Page Object Model', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login com sucesso', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Login com usuário inválido', async () => {
    await loginPage.login('invalid_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toHaveText(/Username and password do not match/);
  });

  test('Login com senha inválida', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toHaveText(/Username and password do not match/);
  });

  test('Login com usuário bloqueado', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toHaveText(/Sorry, this user has been locked out/);
  });

  test('Login com campos vazios', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toHaveText(/Username is required/);

    await loginPage.loginWithOnlyUsername('standard_user');
    await expect(loginPage.errorMessage).toHaveText(/Password is required/);
  });
});