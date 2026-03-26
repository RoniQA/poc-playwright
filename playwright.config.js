const { defineConfig } = require('@playwright/test');

const isCI = !!process.env.CI;

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
  // CI: github = anotações no PR; line = log compacto. Local: list detalhado.
  reporter: isCI
    ? [
        ['github'],
        ['line'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }],
      ]
    : [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }],
      ],
  outputDir: 'test-results/',
  timeout: 30000,
}); 