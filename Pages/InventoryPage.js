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

  /** Adds an item to cart by index. */
  async addItemToCartByIndex(index) {
    await this.addToCartButtons.nth(index).click();
  }

  /** Removes an item from cart by index. */
  async removeItemFromCartByIndex(index) {
    await this.removeFromCartButtons.nth(index).click();
  }

  /** Returns the quantity of items in cart badge. */
  async getCartBadgeCount() {
    if (await this.cartBadge.count() === 0) return 0;
    return parseInt(await this.cartBadge.textContent() || '0', 10);
  }

  /** Checks if the sort dropdown is available. */
  async isSortDropdownAvailable() {
    try {
      await this.sortDropdown.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // /** Sorts products by name (A-Z). */
  // async sortByNameAZ() {
  //   await this.sortDropdown.selectOption('az');
  //   await this.page.waitForLoadState('domcontentloaded');
  //   await expect(this.productNames.first()).toBeVisible();
  // }

  // /** Sorts products by name (Z-A). */
  // async sortByNameZA() {
  //   await this.sortDropdown.selectOption('za');
  //   await this.page.waitForLoadState('domcontentloaded');
  //   await expect(this.productNames.first()).toBeVisible();
  // }

  // /** Sorts products by price (low to high). */
  // async sortByPriceLowToHigh() {
  //   await this.sortDropdown.selectOption('lohi');
  //   await this.page.waitForLoadState('domcontentloaded');
  //   await expect(this.productPrices.first()).toBeVisible();
  // }

  // /** Sorts products by price (high to low). */
  // async sortByPriceHighToLow() {
  //   await this.sortDropdown.selectOption('hilo');
  //   await this.page.waitForLoadState('domcontentloaded');
  //   await expect(this.productPrices.first()).toBeVisible();
  // }

  /** Returns all product names. */
  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  /** Returns all product prices (as string, e.g. "$29.99"). */
  async getProductPrices() {
    return await this.productPrices.allTextContents();
  }

  /** Returns all product prices as numbers (e.g. 29.99). */
  async getProductPricesAsNumbers() {
    const prices = await this.getProductPrices();
    return prices.map(p => parseFloat(p.replace('$', '').replace(',', '.')));
  }

  /** Returns the price of a specific product by index. */
  async getProductPriceByIndex(index) {
    return await this.productPrices.nth(index).textContent() || '';
  }

  /** Clicks on a product to view its details. */
  async clickProductByIndex(index) {
    await this.productNames.nth(index).click();
  }

  /** Checks if a product image is loaded. */
  async isProductImageLoaded(index) {
    return await this.productImages.nth(index).isVisible();
  }
}

module.exports = { InventoryPage }; 