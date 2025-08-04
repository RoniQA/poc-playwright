import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com/',
    actionTimeout: 10000,
    navigationTimeout: 10000,
    screenshot: 'only-on-failure',
  },
  retries: 1,
  workers: 1, // Reduzir para 1 worker para evitar interferência
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});