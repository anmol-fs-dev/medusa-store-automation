import { test, expect } from '../fixtures/apiFixtures';

test.describe('Product Details API', () => {
    test('should fetch details for a specific product', async ({ productClient }) => {
        // Fetch list to get a valid product ID
        const listResponse = await productClient.listProducts('limit=1');
        expect(listResponse.products.length).toBeGreaterThanOrEqual(1);

        const targetProduct = listResponse.products[0];
        const productId = targetProduct.id;

        // Fetch product details
        const detailsResponse = await productClient.getProduct(productId);
        
        expect(detailsResponse.product).toBeDefined();
        expect(detailsResponse.product.id).toBe(productId);
        expect(detailsResponse.product.title).toBe(targetProduct.title);
    });
});

test.describe('Product Filters API', () => {
    test('should filter products correctly using query parameters', async ({ productClient }) => {
        // Test limit filter
        const limitedResponse = await productClient.listProducts('limit=2');
        expect(limitedResponse.products.length).toBeLessThanOrEqual(2);

        // Test sort order filter (if Medusa supports order natively)
        const sortedResponse = await productClient.listProducts('order=created_at');
        expect(sortedResponse.products).toBeDefined();
        expect(Array.isArray(sortedResponse.products)).toBe(true);
    });
});
