import { request, APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApiClient {
  protected baseUrl: string;

  constructor(baseUrl: string = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000') {
    this.baseUrl = baseUrl;
  }

  async getRequest() {
    return await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  }
}
