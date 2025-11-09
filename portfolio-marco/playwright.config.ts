import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright pour les tests E2E
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  
  /* Durée maximale d'un test */
  timeout: 30 * 1000,
  
  /* Paramètres expect */
  expect: {
    timeout: 5000
  },
  
  /* Exécuter les tests en parallèle */
  fullyParallel: true,
  
  /* Fail le build si des tests sont laissés en .only */
  forbidOnly: !!process.env.CI,
  
  /* Retry en cas d'échec en CI */
  retries: process.env.CI ? 2 : 0,
  
  /* Nombre de workers */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter à utiliser */
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  /* Configuration partagée pour tous les projets */
  use: {
    /* URL de base */
    baseURL: 'http://localhost:3000',
    
    /* Collecter les traces en cas d'échec */
    trace: 'on-first-retry',
    
    /* Screenshots en cas d'échec */
    screenshot: 'only-on-failure',
    
    /* Vidéos en cas d'échec */
    video: 'retain-on-failure',
  },

  /* Configuration des projets pour différents navigateurs */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Tests mobile */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Démarrer le serveur de dev avant les tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

