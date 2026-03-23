import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('#product-info').getByTestId('product-title');
        this.productPrice = page.getByTestId('product-price');
        this.addToCartButton = page.getByTestId('add-product-button');
    }

    async verifyDetailsVisible() {
        await this.productTitle.waitFor({ state: 'visible' });
    }
}
