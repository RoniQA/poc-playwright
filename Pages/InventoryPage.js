const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.addToCartButtons = page.locator('button[data-test^="add-to-cart-"]');
    this.removeFromCartButtons = page.locator('button[data-test^="remove-"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.productImages = page.locator('.inventory_item_img');
  }

  /** Adiciona um item ao carrinho pelo índice. */
  async addItemToCartByIndex(index) {
    await this.addToCartButtons.nth(index).click();
  }

  /** Remove um item do carrinho pelo índice. */
  async removeItemFromCartByIndex(index) {
    await this.removeFromCartButtons.nth(index).click();
  }

  /** Retorna a quantidade de itens no badge do carrinho. */
  async getCartBadgeCount() {
    if (await this.cartBadge.count() === 0) return 0;
    return parseInt(await this.cartBadge.textContent() || '0', 10);
  }

  /** Verifica se o dropdown de ordenação está disponível. */
  async isSortDropdownAvailable() {
    try {
      await this.sortDropdown.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // /** Ordena produtos por nome (A-Z). */
  // async sortByNameAZ() {
  //   await this.sortDropdown.selectOption('az');
  //   await this.page.waitForLoadState('domcontentloaded');
  //   await expect(this.productNames.first()).toBeVisible();
  // }

  // /** Ordena produtos por nome (Z-A). */
  // async sortByNameZA() {
  //   await this.sortDropdown.selectOption('za');
  //   await this.page.waitForLoadState('domcontentloaded');
  //   await expect(this.productNames.first()).toBeVisible();
  // }

  // /** Ordena produtos por preço (menor para maior). */
  // async sortByPriceLowToHigh() {
  //   await this.sortDropdown.selectOption('lohi');
  //   await this.page.waitForLoadState('domcontentloaded');
  //   await expect(this.productPrices.first()).toBeVisible();
  // }

  // /** Ordena produtos por preço (maior para menor). */
  // async sortByPriceHighToLow() {
  //   await this.sortDropdown.selectOption('hilo');
  //   await this.page.waitForLoadState('domcontentloaded');
  //   await expect(this.productPrices.first()).toBeVisible();
  // }

  /** Retorna todos os nomes dos produtos. */
  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  /** Retorna todos os preços dos produtos (como string, ex: "$29.99"). */
  async getProductPrices() {
    return await this.productPrices.allTextContents();
  }

  /** Retorna todos os preços dos produtos como número (ex: 29.99). */
  async getProductPricesAsNumbers() {
    const prices = await this.getProductPrices();
    return prices.map(p => parseFloat(p.replace('$', '').replace(',', '.')));
  }

  /** Retorna o preço de um produto específico pelo índice. */
  async getProductPriceByIndex(index) {
    return await this.productPrices.nth(index).textContent() || '';
  }

  /** Clica em um produto para ver seus detalhes. */
  async clickProductByIndex(index) {
    await this.productNames.nth(index).click();
  }

  /** Verifica se a imagem de um produto está carregada. */
  async isProductImageLoaded(index) {
    return await this.productImages.nth(index).isVisible();
  }
}

module.exports = { InventoryPage }; 