import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navega para a página de login do SauceDemo.
   */
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  /**
   * Realiza login com usuário e senha.
   * @param username Usuário a ser utilizado no login
   * @param password Senha a ser utilizada no login
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Realiza login preenchendo apenas o usuário.
   * @param username Usuário a ser utilizado no login
   */
  async loginWithOnlyUsername(username: string) {
    await this.usernameInput.fill(username);
    await this.loginButton.click();
  }

  /**
   * Realiza login preenchendo apenas a senha.
   * @param password Senha a ser utilizada no login
   */
  async loginWithOnlyPassword(password: string) {
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}