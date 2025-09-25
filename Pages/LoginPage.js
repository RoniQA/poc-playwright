class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the SauceDemo login page.
   */
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  /**
   * Performs login with username and password.
   * @param {string} username Username to be used in login
   * @param {string} password Password to be used in login
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Performs login filling only the username.
   * @param {string} username Username to be used in login
   */
  async loginWithOnlyUsername(username) {
    await this.usernameInput.fill(username);
    await this.loginButton.click();
  }

  /**
   * Performs login filling only the password.
   * @param {string} password Password to be used in login
   */
  async loginWithOnlyPassword(password) {
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage }; 