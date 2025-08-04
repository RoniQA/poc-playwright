# poc-playwright

Este projeto é uma prova de conceito usando Playwright.

## 💻 Instalação

```bash
npm install
```

## 🚀 Rodar os testes

```bash
npm run test           # Executa os testes em modo headless
npm run test:headed    # Executa os testes com navegador visível
```

## 📊 Relatórios

Após rodar os testes, um relatório HTML será gerado em `playwright-report`.
Para abrir o relatório, execute:

```bash
npm run report
```

## 🔒 Boas práticas

- Não coloque usuários/senhas reais no código. Use variáveis de ambiente se necessário.
- Organize os testes em subpastas conforme o projeto crescer.
- Utilize Page Objects para cada página/fluxo relevante.
- Consulte os comentários nos arquivos para entender o funcionamento dos métodos principais.

## ⚙️ Tecnologias

- Playwright
- Node.js
- TypeScript

## 👤 Autor

RoniQA
