import { test, expect } from '../fixtures/apiFixtures';
import { AuthClient } from '../clients/authClient';

test.describe('User Registration', () => {
    test('should successfully register a new customer', async ({ request }) => {
        const authClient = new AuthClient(request);
        const uniqueNumber = Date.now();
        const email = `testuser_${uniqueNumber}@example.com`;
        const password = 'Password123!';

        const response = await authClient.registerCustomer(email, password);
        console.log('Registration Response:', response);

        expect(response.customer).toBeDefined();
        expect(response.customer.email).toBe(email);
        expect(response.customer.has_account).toBe(true);
    });
});
