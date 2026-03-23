import { test, expect } from '../fixtures/apiFixtures';
import { AuthClient } from '../clients/authClient';

test.describe('User Login API', () => {
    test('should successfully log in an existing customer', async ({ request }) => {
        const authClient = new AuthClient(request);
        const uniqueNumber = Date.now();
        const email = `login_testuser_${uniqueNumber}@example.com`;
        const password = 'Password123!';

        // Pre-requisite: ensure the user exists
        await authClient.registerCustomer(email, password);

        // Action: log the user in
        const token = await authClient.loginCustomer(email, password);

        // Assertion: valid token should be returned
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        expect(token.length).toBeGreaterThan(10);
    });
});
