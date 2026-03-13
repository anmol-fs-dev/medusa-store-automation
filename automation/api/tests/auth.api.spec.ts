import { test, expect } from '@playwright/test';
import { AuthApiClient } from '../clients/AuthApiClient';

test.describe('Admin Auth API Tests', () => {
  const authClient = new AuthApiClient();

  test('Should fail login with invalid credentials', async () => {
    const response = await authClient.login('invalid@example.com', 'wrongpassword');
    expect(response.status()).toBe(401);
  });
});
