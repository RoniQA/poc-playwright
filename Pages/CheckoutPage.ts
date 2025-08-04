import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly summaryInfo: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
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
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
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
  async completeCheckout(firstName: string, lastName: string, postalCode: string) {
    await this.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.continue();
    await this.finish();
  }

  /**
   * Retorna a mensagem de erro, se houver.
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Verifica se o checkout foi completado com sucesso.
   */
  async isCheckoutComplete(): Promise<boolean> {
    return await this.completeHeader.isVisible();
  }
} 