import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitSignInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId('email-input');
        this.passwordInput = page.getByTestId('password-input');
        this.submitSignInButton = page.getByTestId('sign-in-button');
    }

    async navigate() {
        await this.page.goto('/');
        await this.page.locator('a[href*="/account"]').first().click();
        
        // Wait for login form to appear
        await this.emailInput.waitFor({ state: 'visible' });
    }

    async loginUser(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitSignInButton.click();
    }
}
