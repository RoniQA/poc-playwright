class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryInfo = page.locator('.summary_info');
    this.completeHeader = page.locator('.complete-header');
  }

  /**
   * Preenche as informações de checkout.
   */
  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Continua para a próxima etapa do checkout.
   */
  async continue() {
    await this.continueButton.click();
  }

  /**
   * Finaliza a compra.
   */
  async finish() {
    await this.finishButton.click();
  }

  /**
   * Cancela o checkout.
   */
  async cancel() {
    await this.cancelButton.click();
  }

  /**
   * Completa todo o processo de checkout.
   */
  async completeCheckout(firstName, lastName, postalCode) {
    await this.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.continue();
    await this.finish();
  }

  /**
   * Retorna a mensagem de erro, se houver.
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Verifica se o checkout foi completado com sucesso.
   */
  async isCheckoutComplete() {
    return await this.completeHeader.isVisible();
  }
}

module.exports = { CheckoutPage }; 