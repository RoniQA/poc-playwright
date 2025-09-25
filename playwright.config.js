const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com/',
    actionTimeout: 10000,
    navigationTimeout: 10000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  retries: 1,
  workers: 1, // Reduce to 1 worker to avoid interference
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  outputDir: 'test-results/',
  timeout: 30000,
}); 