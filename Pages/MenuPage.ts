import { Page, Locator } from '@playwright/test';

export class MenuPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly aboutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly allItemsLink: Locator;
  readonly closeMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
  }

  /**
   * Abre o menu hambúrguer.
   */
  async openMenu() {
    await this.menuButton.click();
  }

  /**
   * Fecha o menu hambúrguer.
   */
  async closeMenu() {
    await this.closeMenuButton.click();
  }

  /**
   * Realiza logout da aplicação.
   */
  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  /**
   * Reseta o estado da aplicação (limpa carrinho, etc.).
   */
  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }

  /**
   * Navega para a página "About".
   */
  async goToAbout() {
    await this.openMenu();
    await this.aboutLink.click();
  }

  /**
   * Navega para todos os itens (inventário).
   */
  async goToAllItems() {
    await this.openMenu();
    await this.allItemsLink.click();
  }
} 