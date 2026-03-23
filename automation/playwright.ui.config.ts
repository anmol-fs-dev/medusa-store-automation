import { defineConfig, devices } from '@playwright/test'
import { env } from './config/env'

export default defineConfig({

    testDir: './ui/tests',

    timeout: 30 * 1000,

    expect: {
        timeout: 5000
    },

    fullyParallel: false,

    workers: process.env.CI ? 4 : 2,

    retries: process.env.CI ? 2 : 0,

    forbidOnly: !!process.env.CI,

    outputDir: 'test-results',

    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/results.xml' }]
    ],

    use: {

        baseURL: env.storefrontUrl,

        headless: process.env.HEADLESS !== 'false',

        actionTimeout: 10000,

        navigationTimeout: 20000,

        screenshot: 'only-on-failure',

        trace: 'on-first-retry',

        video: 'retain-on-failure'

    },

    projects: [

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }

    ]

})