import { Page, Locator } from '@playwright/test';

export class StorePage {
    readonly page: Page;
    readonly productWrappers: Locator;

    readonly sortByLowToHigh: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productWrappers = page.getByTestId('product-wrapper');
        this.sortByLowToHigh = page.getByText('Price: Low -> High'); // Use getByText since it's a label for the radio.
    }

    async navigate() {
        await this.page.goto('/store');
        
        // Wait for at least one product wrapper to be visible
        await this.productWrappers.first().waitFor({ state: 'visible' });
    }

    async sortByLowestPrice() {
        await this.sortByLowToHigh.click();
        await this.page.waitForURL(/sortBy=price_asc/);
        // Ensure products reload after sorting
        await this.productWrappers.first().waitFor({ state: 'visible' });
    }
}
