import { defineConfig } from '@playwright/test'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') })

export default defineConfig({

    testDir: './api/tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    reporter: 'html',

    use: {

        baseURL: process.env.API_URL || 'http://localhost:9000',

        extraHTTPHeaders: {
            'Content-Type': 'application/json'
        }

    }

})