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
   * Fills checkout information.
   */
  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Continues to the next checkout step.
   */
  async continue() {
    await this.continueButton.click();
  }

  /**
   * Finishes the purchase.
   */
  async finish() {
    await this.finishButton.click();
  }

  /**
   * Cancels the checkout.
   */
  async cancel() {
    await this.cancelButton.click();
  }

  /**
   * Completes the entire checkout process.
   */
  async completeCheckout(firstName, lastName, postalCode) {
    await this.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.continue();
    await this.finish();
  }

  /**
   * Returns the error message, if any.
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Checks if checkout was completed successfully.
   */
  async isCheckoutComplete() {
    return await this.completeHeader.isVisible();
  }
}

module.exports = { CheckoutPage }; 