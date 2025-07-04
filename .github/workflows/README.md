# Playwright E2E Tests - SauceDemo

Este projeto contém testes automatizados E2E para o site [SauceDemo](https://www.saucedemo.com/) utilizando [Playwright](https://playwright.dev/) com a estrutura de Page Objects.

## Estrutura do Projeto

saucedemo-playwright/
├── .github/
│ └── workflows/
│ └── playwright.yml
├── package.json
├── playwright.config.ts
├── tests/
│ ├── pages/
│ │ └── LoginPage.ts
│ └── login.spec.ts

- **tests/pages/**: Contém os arquivos de Page Objects. - **tests/login.spec.ts**: Exemplo de teste usando o Page Object. - **.github/workflows/playwright.yml**: Pipeline de CI/CD para rodar os testes no GitHub Actions. ## Pré-requisitos - Node.js >= 16 - npm ## Instalação ```bash npm install npx playwright install

Executando os Testes Localmente

bash

    npx playwright test

Para gerar o relatório HTML:

bash

    npx playwright test --reporter=html

O relatório será gerado na pasta playwright-report/.

CI/CD com GitHub Actions
A cada push ou pull request na branch main, os testes são executados automaticamente e o relatório HTML é disponibilizado como artefato na aba "Actions" do GitHub.

:rocket: Projeto de exemplo para automação de testes E2E com Playwright e Page Objects.