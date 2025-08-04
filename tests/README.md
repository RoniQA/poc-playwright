# Estrutura de Testes

Esta pasta contém todos os testes automatizados do projeto, implementados em **JavaScript**.

## Organização

```
tests/
├── e2e/           # Testes end-to-end
│   ├── login.spec.js
│   ├── inventory.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── menu.spec.js
│   ├── inventory-optimized.spec.js    # Exemplo otimizado
│   ├── cart-optimized.spec.js         # Exemplo otimizado
│   └── checkout-optimized.spec.js     # Exemplo otimizado
├── fixtures/      # Fixtures compartilhadas
│   ├── global.fixture.js              # Fixtures para todas as páginas
│   ├── auth.fixture.js                # Fixture de autenticação
│   └── complete.fixture.js            # Fixture completa (recomendada)
└── README.md      # Este arquivo
```

## Tipos de Testes

### E2E (End-to-End)
Testes que simulam o comportamento completo do usuário, desde o login até a finalização de compras.

### Fixtures
Fixtures compartilhadas que podem ser reutilizadas em múltiplos testes para evitar duplicação de código.

## Otimizações Implementadas

### 1. Fixtures Globais (`global.fixture.js`)
- Fornece instâncias de todas as páginas (LoginPage, InventoryPage, etc.)
- Evita criação repetitiva de objetos
- Melhora a legibilidade dos testes

### 2. Fixture de Autenticação (`auth.fixture.js`)
- **beforeAll**: Login automático antes dos testes
- **afterAll**: Limpeza automática do estado após cada teste
- Reduz significativamente o tempo de execução
- Garante isolamento entre testes

### 3. Fixture Completa (`complete.fixture.js`) ⭐ **RECOMENDADA**
- Combina autenticação automática com todas as páginas
- Setup e teardown automáticos
- Máxima otimização de performance
- Fácil de usar em qualquer teste

### 4. Hooks de Setup/Teardown
- `test.beforeAll()`: Executa uma vez antes de todos os testes do describe
- `test.afterAll()`: Executa uma vez após todos os testes do describe
- `test.beforeEach()`: Executa antes de cada teste individual
- `test.afterEach()`: Executa após cada teste individual

## Exemplos de Uso

### Teste Tradicional (sem otimização)
```javascript
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});
```

### Teste Otimizado (com fixture completa) ⭐ **RECOMENDADO**
```javascript
const { test, expect } = require('../fixtures/complete.fixture');

test('Meu teste', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  // Teste já começa logado, limpo e com todas as páginas disponíveis
  await inventoryPage.addItemToCartByIndex(0);
  await cartPage.goto();
});
```

### Teste com beforeAll/afterAll
```javascript
const { test, expect } = require('../fixtures/global.fixture');

test.beforeAll(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test.afterAll(async ({ menuPage }) => {
  await menuPage.resetAppState();
});
```

## Executando os Testes

```bash
# Executar todos os testes
npx playwright test

# Executar testes específicos
npx playwright test tests/e2e/login.spec.js

# Executar testes otimizados
npx playwright test tests/e2e/*-optimized.spec.js

# Executar em modo UI
npx playwright test --ui

# Executar em modo headed (com navegador visível)
npx playwright test --headed
```

## Convenções

- Todos os arquivos de teste devem terminar com `.spec.js`
- Use Page Object Model para organizar os seletores e métodos
- Mantenha os testes independentes e isolados
- Use fixtures para código compartilhado
- **Prefira `complete.fixture.js` para novos testes**
- Use `beforeAll`/`afterAll` para setup/teardown global
- Use `beforeEach`/`afterEach` apenas quando necessário 