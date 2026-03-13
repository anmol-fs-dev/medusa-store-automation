import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Tests', () => {
  test('Should navigate to login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('/account/login');
    // Basic verification to ensure page loaded
    await expect(page).toHaveURL(/.*login/);
  });

  test('Should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('/account/login');
    await loginPage.login('invalid@example.com', 'wrongpassword');
    // Since we don't know the exact test IDs of the starter yet, we'll refine this later
    // This is a placeholder for the flow validation
  });
});
