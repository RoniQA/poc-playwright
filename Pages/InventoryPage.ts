import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButtons: Locator;
  readonly removeFromCartButtons: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator('button[data-test^="add-to-cart-"]');
    this.removeFromCartButtons = page.locator('button[data-test^="remove-"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  /**
   * Adiciona um item ao carrinho pelo índice.
   */
  async addItemToCartByIndex(index: number) {
    await this.addToCartButtons.nth(index).click();
  }

  /**
   * Remove um item do carrinho pelo índice.
   */
  async removeItemFromCartByIndex(index: number) {
    await this.removeFromCartButtons.nth(index).click();
  }

  /**
   * Retorna a quantidade de itens no badge do carrinho.
   */
  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.count() === 0) return 0;
    return parseInt(await this.cartBadge.textContent() || '0', 10);
  }
}