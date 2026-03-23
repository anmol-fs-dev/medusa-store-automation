import { Page, Locator } from '@playwright/test';

export class StorePage {
    readonly page: Page;
    readonly productWrappers: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productWrappers = page.getByTestId('product-wrapper');
    }

    async navigate() {
        await this.page.goto('/store');
        
        // Wait for at least one product wrapper to be visible
        await this.productWrappers.first().waitFor({ state: 'visible' });
    }
}
