class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('button[id*="remove"]');
  }

  /**
   * Navigates to cart by clicking the cart icon.
   */
  async goto() {
    await this.cartIcon.click();
    await this.page.waitForURL('**/cart.html');
  }

  /**
   * Returns the number of items in cart.
   */
  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  /**
   * Removes all items from cart.
   */
  async removeAllItems() {
    let itemCount = await this.cartItems.count();
    while (itemCount > 0) {
      // Remove the first item (index 0)
      await this.removeButtons.first().click();
      // Wait for page to update
      await this.page.waitForTimeout(500);
      // Update the count
      itemCount = await this.cartItems.count();
    }
  }

  /**
   * Clicks the checkout button.
   */
  async checkout() {
    await this.checkoutButton.click();
  }

  /**
   * Clicks the continue shopping button.
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

module.exports = { CartPage }; 