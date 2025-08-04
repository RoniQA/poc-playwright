import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com/',
    actionTimeout: 5000,
    screenshot: 'only-on-failure',
  },
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});