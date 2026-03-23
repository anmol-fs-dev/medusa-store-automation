import { test, expect, request as pwRequest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AuthClient } from '../../api/clients/authClient';
import { env } from '../../config/env';

test.describe('User Login UI', () => {
    test('should successfully log in via UI', async ({ page }) => {
        // Create an API context pointing to the backend
        const apiContext = await pwRequest.newContext({
            baseURL: env.apiUrl || 'http://localhost:9000',
            extraHTTPHeaders: {
                'x-publishable-api-key': process.env.PUBLISHABLE_API_KEY || ''
            }
        });
        
        // First, register a new user via API to ensure we have a valid account
        const authClient = new AuthClient(apiContext);
        const uniqueSuffix = Date.now();
        const email = `login_uitest_${uniqueSuffix}@example.com`;
        const password = 'Password123!';

        // Pre-requisite
        await authClient.registerCustomer(email, password);

        // UI Flow
        const loginPage = new LoginPage(page);
        
        await loginPage.navigate();
        await loginPage.loginUser(email, password);

        // Verification: The user should be logged in and redirected to their account page
        await expect(page).toHaveURL(/\/account/);
        
        // The sign in form should no longer be visible
        await expect(page.getByTestId('login-page')).not.toBeVisible();
        
        await apiContext.dispose();
    });
});
