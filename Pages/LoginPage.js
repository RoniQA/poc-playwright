class LoginPage {
  constructor(page) {
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
   * @param {string} username Usuário a ser utilizado no login
   * @param {string} password Senha a ser utilizada no login
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Realiza login preenchendo apenas o usuário.
   * @param {string} username Usuário a ser utilizado no login
   */
  async loginWithOnlyUsername(username) {
    await this.usernameInput.fill(username);
    await this.loginButton.click();
  }

  /**
   * Realiza login preenchendo apenas a senha.
   * @param {string} password Senha a ser utilizada no login
   */
  async loginWithOnlyPassword(password) {
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage }; 