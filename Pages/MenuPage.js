class MenuPage {
  constructor(page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
  }

  /**
   * Opens the hamburger menu.
   */
  async openMenu() {
    await this.menuButton.click();
  }

  /**
   * Closes the hamburger menu.
   */
  async closeMenu() {
    await this.closeMenuButton.click();
  }

  /**
   * Logs out from the application.
   */
  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  /**
   * Resets the application state (clears cart, etc.).
   */
  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }

  /**
   * Navigates to the "About" page.
   */
  async goToAbout() {
    await this.openMenu();
    await this.aboutLink.click();
  }

  /**
   * Navigates to all items (inventory).
   */
  async goToAllItems() {
    await this.openMenu();
    await this.allItemsLink.click();
  }
}

module.exports = { MenuPage }; 