import { test, expect } from '../fixtures/complete.fixture';

test.describe('SauceDemo Inventário - Otimizado com Complete Fixture', () => {
  
  test('Validar preços dos produtos', async ({ authenticatedPage, inventoryPage }) => {
    const productPrices = await inventoryPage.getProductPrices();
    
    // Verifica se todos os produtos têm preços válidos
    productPrices.forEach(price => {
      expect(price).toMatch(/^\$\d+\.\d{2}$/);
    });
  });

  test('Validar imagens dos produtos', async ({ authenticatedPage, inventoryPage }) => {
    // Verifica se todas as imagens estão carregadas
    for (let i = 0; i < 6; i++) {
      expect(await inventoryPage.isProductImageLoaded(i)).toBe(true);
    }
  });

  test('Clicar em produto para ver detalhes', async ({ authenticatedPage, inventoryPage }) => {
    await inventoryPage.clickProductByIndex(0);
    await expect(authenticatedPage).toHaveURL(/.*\/inventory-item.html/);
  });

  test('Adicionar e remover múltiplos produtos', async ({ authenticatedPage, inventoryPage }) => {
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

  test('Validar quantidade de produtos disponíveis', async ({ authenticatedPage, inventoryPage }) => {
    const productNames = await inventoryPage.getProductNames();
    const productPrices = await inventoryPage.getProductPrices();
    
    // Verifica se há 6 produtos (padrão do SauceDemo)
    expect(productNames.length).toBe(6);
    expect(productPrices.length).toBe(6);
  });
}); 