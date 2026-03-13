import { BaseApiClient } from './BaseApiClient';

export class AuthApiClient extends BaseApiClient {
  async login(email: string, pass: string) {
    const context = await this.getRequest();
    return await context.post('/auth/user/emailpass', {
      data: {
        email,
        password: pass,
      },
    });
  }
}
