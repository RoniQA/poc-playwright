import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { InventoryPage } from '../../Pages/InventoryPage';

test.describe('SauceDemo Inventário - Page Object Model', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

//   test('Ordenar produtos por nome (A-Z)', async ({ page }) => {
//     await inventoryPage.sortByNameAZ();
//     // Verifica apenas se a ordenação foi executada sem erro
//     const productNames = await inventoryPage.getProductNames();
//     expect(productNames.length).toBeGreaterThan(0);
//   });

//   test('Ordenar produtos por nome (Z-A)', async ({ page }) => {
//     await inventoryPage.sortByNameZA();
//     const productNames = await inventoryPage.getProductNames();
//     expect(productNames.length).toBeGreaterThan(0);
//   });

//   test('Ordenar produtos por preço (menor para maior)', async ({ page }) => {
//     await inventoryPage.sortByPriceLowToHigh();
//     const productPrices = await inventoryPage.getProductPrices();
//     expect(productPrices.length).toBeGreaterThan(0);
//   });

//   test('Ordenar produtos por preço (maior para menor)', async ({ page }) => {
//     await inventoryPage.sortByPriceHighToLow();
//     const productPrices = await inventoryPage.getProductPrices();
//     expect(productPrices.length).toBeGreaterThan(0);
//   });

  test('Validar preços dos produtos', async ({ page }) => {
    const productPrices = await inventoryPage.getProductPrices();
    
    // Verifica se todos os produtos têm preços válidos
    productPrices.forEach(price => {
      expect(price).toMatch(/^\$\d+\.\d{2}$/);
    });
  });

  test('Validar imagens dos produtos', async ({ page }) => {
    // Verifica se todas as imagens estão carregadas
    for (let i = 0; i < 6; i++) {
      expect(await inventoryPage.isProductImageLoaded(i)).toBe(true);
    }
  });

  test('Clicar em produto para ver detalhes', async ({ page }) => {
    await inventoryPage.clickProductByIndex(0);
    await expect(page).toHaveURL(/.*\/inventory-item.html/);
  });

  test('Adicionar e remover múltiplos produtos', async ({ page }) => {
    // Adiciona produtos
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await inventoryPage.addItemToCartByIndex(2);
    expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    
    // Remove produtos
    await inventoryPage.removeItemFromCartByIndex(0);
    await inventoryPage.removeItemFromCartByIndex(0);
    await inventoryPage.removeItemFromCartByIndex(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });

  test('Validar quantidade de produtos disponíveis', async ({ page }) => {
    const productNames = await inventoryPage.getProductNames();
    const productPrices = await inventoryPage.getProductPrices();
    
    // Verifica se há 6 produtos (padrão do SauceDemo)
    expect(productNames.length).toBe(6);
    expect(productPrices.length).toBe(6);
  });
}); 