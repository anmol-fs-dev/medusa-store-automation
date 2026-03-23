import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
    readonly page: Page;
    readonly joinUsLink: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitRegisterButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // In the login view, the button to switch to register view has data-testid="register-button"
        this.joinUsLink = page.getByTestId('register-button').filter({ hasText: 'Join us' });
        
        // Form inputs in register view
        this.firstNameInput = page.getByTestId('first-name-input');
        this.lastNameInput = page.getByTestId('last-name-input');
        this.emailInput = page.getByTestId('email-input');
        this.passwordInput = page.getByTestId('password-input');
        
        // The submit button in register view also has data-testid="register-button"
        this.submitRegisterButton = page.getByTestId('register-button').filter({ hasText: 'Join' });
    }

    async navigate() {
        await this.page.goto('/');
        await this.page.locator('a[href*="/account"]').first().click();
    }

    async goToRegisterView() {
        await this.joinUsLink.click();
        // Wait for the register form to become visible
        await this.firstNameInput.waitFor({ state: 'visible' });
    }

    async registerUser(firstName: string, lastName: string, email: string, password: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitRegisterButton.click();
    }
}
