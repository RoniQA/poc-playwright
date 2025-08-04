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
   * Navega para o carrinho clicando no ícone do carrinho.
   */
  async goto() {
    await this.cartIcon.click();
    await this.page.waitForURL('**/cart.html');
  }

  /**
   * Retorna a quantidade de itens no carrinho.
   */
  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  /**
   * Remove todos os itens do carrinho.
   */
  async removeAllItems() {
    let itemCount = await this.cartItems.count();
    while (itemCount > 0) {
      // Remove o primeiro item (índice 0)
      await this.removeButtons.first().click();
      // Aguarda a página atualizar
      await this.page.waitForTimeout(500);
      // Atualiza a contagem
      itemCount = await this.cartItems.count();
    }
  }

  /**
   * Clica no botão de checkout.
   */
  async checkout() {
    await this.checkoutButton.click();
  }

  /**
   * Clica no botão de continuar comprando.
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

module.exports = { CartPage }; 