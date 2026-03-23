import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/StorePage';

test.describe('Product Listing UI', () => {
    test('should display a list of products on the store page', async ({ page }) => {
        const storePage = new StorePage(page);
        
        // Navigate to the storefront and enter the store
        await storePage.navigate();

        // Assert that there is at least one product displayed
        const productCount = await storePage.productWrappers.count();
        expect(productCount).toBeGreaterThan(0);
        
        // Assert that the first product has a visible title and price
        const firstProduct = storePage.productWrappers.first();
        await expect(firstProduct.getByTestId('product-title')).toBeVisible();
        await expect(firstProduct.getByTestId('price')).toBeVisible();
    });
});
