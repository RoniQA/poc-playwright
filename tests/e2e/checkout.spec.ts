import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { InventoryPage } from '../../Pages/InventoryPage';
import { CartPage } from '../../Pages/CartPage';
import { CheckoutPage } from '../../Pages/CheckoutPage';

test.describe('SauceDemo Checkout - Page Object Model', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Checkout completo com sucesso', async ({ page }) => {
    // Adiciona item ao carrinho
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Preenche informações e finaliza
    await checkoutPage.completeCheckout('João', 'Silva', '12345-678');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('Checkout com campos obrigatórios vazios', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Tenta continuar sem preencher
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
  });

  test('Checkout com apenas primeiro nome preenchido', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Preenche apenas o primeiro nome
    await checkoutPage.firstNameInput.fill('João');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
  });

  test('Checkout com apenas nome e sobrenome preenchidos', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Preenche nome e sobrenome
    await checkoutPage.firstNameInput.fill('João');
    await checkoutPage.lastNameInput.fill('Silva');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
  });

  test('Cancelar checkout', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Cancela o checkout
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart.html/);
  });

  test('Validar informações do checkout', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await cartPage.goto();
    await cartPage.checkout();
    
    // Preenche informações
    await checkoutPage.fillCheckoutInfo('João', 'Silva', '12345-678');
    await checkoutPage.continue();
    
    // Verifica se está na página de resumo
    await expect(checkoutPage.summaryInfo).toBeVisible();
    await expect(checkoutPage.finishButton).toBeVisible();
  });

  test('Checkout com múltiplos itens', async ({ page }) => {
    // Adiciona múltiplos itens
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await inventoryPage.addItemToCartByIndex(2);
    
    await cartPage.goto();
    expect(await cartPage.getCartItemsCount()).toBe(3);
    
    await cartPage.checkout();
    await checkoutPage.completeCheckout('João', 'Silva', '12345-678');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
}); 