# poc-playwright

Este projeto é uma prova de conceito usando Playwright com estrutura organizada seguindo as melhores práticas, implementado em **JavaScript**.

## 📁 Estrutura do Projeto

```
poc-playwright/
├── tests/                    # Pasta para todos os testes
│   ├── e2e/                 # Testes end-to-end
│   │   ├── login.spec.js
│   │   ├── inventory.spec.js
│   │   ├── cart.spec.js
│   │   ├── checkout.spec.js
│   │   ├── menu.spec.js
│   │   ├── inventory-optimized.spec.js    # Exemplo otimizado
│   │   ├── cart-optimized.spec.js         # Exemplo otimizado
│   │   └── checkout-optimized.spec.js     # Exemplo otimizado
│   ├── fixtures/            # Fixtures compartilhadas
│   │   ├── global.fixture.js              # Fixtures para todas as páginas
│   │   ├── auth.fixture.js                # Fixture de autenticação
│   │   └── complete.fixture.js            # Fixture completa (recomendada)
│   └── README.md
├── Pages/                   # Page Objects
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── MenuPage.js
├── playwright.config.js     # Configuração do Playwright
└── package.json
```

## 💻 Instalação

```bash
npm install
```

## 🚀 Rodar os testes

```bash
# Executar todos os testes
npm run test

# Executar testes específicos
npx playwright test tests/e2e/login.spec.js

# Executar testes otimizados
npx playwright test tests/e2e/*-optimized.spec.js

# Executar em modo headed (com navegador visível)
npm run test:headed

# Executar em modo UI
npx playwright test --ui
```

## 📊 Relatórios

Após rodar os testes, um relatório HTML será gerado em `playwright-report`.
Para abrir o relatório, execute:

```bash
npm run report
```

## 🔒 Boas práticas implementadas

- ✅ **Estrutura organizada**: Testes separados em pasta dedicada
- ✅ **Page Object Model**: Cada página tem sua classe correspondente
- ✅ **Fixtures compartilhadas**: Código reutilizável para autenticação
- ✅ **Configuração otimizada**: Timeouts, retries e relatórios configurados
- ✅ **Separação por funcionalidade**: Testes organizados por domínio
- ✅ **Documentação**: README específico para a estrutura de testes
- ✅ **Otimização com beforeAll/afterAll**: Setup e teardown eficientes
- ✅ **Isolamento de testes**: Limpeza automática do estado entre testes
- ✅ **Fixture completa**: Máxima otimização com setup automático
- ✅ **JavaScript puro**: Sem dependências de TypeScript

## ⚡ Otimizações de Performance

### Fixtures Globais
- Instâncias de páginas reutilizáveis
- Redução de código duplicado
- Melhor legibilidade

### Autenticação Otimizada
- Login executado uma vez por suite de testes
- Limpeza automática do estado após cada teste
- Redução significativa no tempo de execução

### Fixture Completa ⭐ **RECOMENDADA**
- Combina autenticação automática com todas as páginas
- Setup e teardown automáticos
- Máxima otimização de performance
- Fácil de usar em qualquer teste

### Hooks Estratégicos
- `beforeAll`: Setup global para suite de testes
- `afterAll`: Limpeza final após todos os testes
- `beforeEach`: Setup individual quando necessário
- `afterEach`: Limpeza individual quando necessário

## 🎯 Exemplos de Uso

### Teste Otimizado (Recomendado)
```javascript
const { test, expect } = require('../fixtures/complete.fixture');

test('Meu teste', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  // Teste já começa logado, limpo e com todas as páginas disponíveis
  await inventoryPage.addItemToCartByIndex(0);
  await cartPage.goto();
});
```

## ⚙️ Tecnologias

- Playwright
- Node.js
- JavaScript

## 👤 Autor

RoniQA
