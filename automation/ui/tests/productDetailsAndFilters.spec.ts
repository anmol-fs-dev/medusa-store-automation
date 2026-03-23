import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/StorePage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

test.describe('Product Details and Filters UI', () => {
    test('should properly filter products by price', async ({ page }) => {
        const storePage = new StorePage(page);
        await storePage.navigate();
        await storePage.sortByLowestPrice();
        
        // Assert URL contains the expected sort parameter
        await expect(page).toHaveURL(/sortBy=price_asc/);
    });

    test('should navigate to product details and display info', async ({ page }) => {
        const storePage = new StorePage(page);
        await storePage.navigate();

        // Click on the first product
        const firstProduct = storePage.productWrappers.first();
        await firstProduct.click();
        
        // Ensure navigation to the product details URL
        await page.waitForURL(/\/products\//);

        // Verify product details page
        const detailsPage = new ProductDetailsPage(page);
        await detailsPage.verifyDetailsVisible();
        await detailsPage.verifyDetailsVisible();
        
        // Ensure the URL matches the product path structure
        await expect(page).toHaveURL(/\/products\//);
    });
});
