import {defineConfig, devices} from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never'
      }
    ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://www.yavlena.com',
    trace: 'retain-on-failure',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    }
  },

  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']}
    },

    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']}
    },

    {
      name: 'webkit',
      use: {...devices['Desktop Safari']}
    }
  ]
})
