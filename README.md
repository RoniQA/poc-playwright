# poc-playwright

Este projeto é uma prova de conceito usando Playwright com estrutura organizada seguindo as melhores práticas.

## 📁 Estrutura do Projeto

```
poc-playwright/
├── tests/                    # Pasta para todos os testes
│   ├── e2e/                 # Testes end-to-end
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   ├── cart.spec.ts
│   │   ├── checkout.spec.ts
│   │   ├── menu.spec.ts
│   │   ├── inventory-optimized.spec.ts    # Exemplo otimizado
│   │   ├── cart-optimized.spec.ts         # Exemplo otimizado
│   │   └── checkout-optimized.spec.ts     # Exemplo otimizado
│   ├── fixtures/            # Fixtures compartilhadas
│   │   ├── global.fixture.ts              # Fixtures para todas as páginas
│   │   ├── auth.fixture.ts                # Fixture de autenticação
│   │   └── complete.fixture.ts            # Fixture completa (recomendada)
│   └── README.md
├── Pages/                   # Page Objects
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── MenuPage.ts
├── playwright.config.ts     # Configuração do Playwright
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
npx playwright test tests/e2e/login.spec.ts

# Executar testes otimizados
npx playwright test tests/e2e/*-optimized.spec.ts

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
```typescript
import { test, expect } from '../fixtures/complete.fixture';

test('Meu teste', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  // Teste já começa logado, limpo e com todas as páginas disponíveis
  await inventoryPage.addItemToCartByIndex(0);
  await cartPage.goto();
});
```

## ⚙️ Tecnologias

- Playwright
- Node.js
- TypeScript

## 👤 Autor

RoniQA
