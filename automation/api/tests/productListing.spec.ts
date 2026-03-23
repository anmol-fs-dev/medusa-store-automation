import { test, expect } from '../fixtures/apiFixtures';

test.describe('Product Listing API', () => {
    test('should successfully fetch a list of products', async ({ productClient }) => {
        const responseData = await productClient.listProducts();

        // Ensure products array is returned
        expect(responseData.products).toBeDefined();
        expect(Array.isArray(responseData.products)).toBe(true);
        expect(responseData.products.length).toBeGreaterThanOrEqual(1);

        // Basic property checks on the first product
        const firstProduct = responseData.products[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('title');
        expect(firstProduct).toHaveProperty('handle');
    });
});
