import { test, expect, request as pwRequest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AuthClient } from '../../api/clients/authClient';
import { env } from '../../config/env';

test.describe('Session Persistence', () => {
    test('should keep the user logged in after page reload', async ({ page }) => {
        // Create an API context pointing to the backend
        const apiContext = await pwRequest.newContext({
            baseURL: env.apiUrl || 'http://localhost:9000',
            extraHTTPHeaders: {
                'x-publishable-api-key': process.env.PUBLISHABLE_API_KEY || ''
            }
        });
        
        // Register a new user via API to ensure we have a valid account
        const authClient = new AuthClient(apiContext);
        const uniqueSuffix = Date.now();
        const email = `session_uitest_${uniqueSuffix}@example.com`;
        const password = 'Password123!';

        // Pre-requisite
        await authClient.registerCustomer(email, password);

        // Map the LoginPage
        const loginPage = new LoginPage(page);
        
        // Navigate to storefront and log in
        await loginPage.navigate();
        await loginPage.loginUser(email, password);

        // Verify initial login success
        await expect(page).toHaveURL(/\/account/);
        await expect(page.getByTestId('login-page')).not.toBeVisible();
        
        // Action: Perform a full page reload
        await page.reload();
        
        // Wait and ensure we are still on the account dashboard page
        await expect(page).toHaveURL(/\/account/);
        await expect(page.getByTestId('login-page')).not.toBeVisible();

        // Secondary Action: Navigate away and return to Account
        await page.goto('/');
        await page.locator('a[href*="/account"]').first().click();
        
        // Wait and assure the login form is bypassed automatically
        await expect(page).toHaveURL(/\/account/);
        await expect(page.getByTestId('login-page')).not.toBeVisible();

        await apiContext.dispose();
    });
});
