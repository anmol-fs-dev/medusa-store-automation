import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('User Registration UI', () => {
    test('should successfully register a new user via UI', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        const uniqueSuffix = Date.now();
        const email = `uitestuser_${uniqueSuffix}@example.com`;

        await registrationPage.navigate();
        await registrationPage.goToRegisterView();
        
        await registrationPage.registerUser('UIFirst', 'UILast', email, 'Password123!');

        // After successful registration, the user is usually redirected to the profile dashboard.
        // We verify that a typical account dashboard element is visible, like the welcome message or profile navigation.
        // Assuming there is an element with data-testid="profile-page" or we check the URL to contain '/account'.
        await expect(page).toHaveURL(/\/account/);
        
        // Additionally verify that sign in form is no longer visible (we are logged in)
        await expect(page.getByTestId('login-page')).not.toBeVisible();
    });
});
