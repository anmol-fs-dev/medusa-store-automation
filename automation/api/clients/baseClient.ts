import { APIRequestContext, APIResponse } from "@playwright/test";

export class BaseClient {
    protected request: APIRequestContext;
    protected token?: string;

    constructor(request: APIRequestContext, token?: string) {
        this.request = request;
        this.token = token;
    }

    protected getHeaders() {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "x-publishable-api-key": process.env.PUBLISHABLE_API_KEY || ""
        };

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        return headers;
    }

    protected async get(url: string): Promise<APIResponse> {
        return this.request.get(url, {
            headers: this.getHeaders(),
        });
    }

    protected async post(url: string, data?: any): Promise<APIResponse> {
        return this.request.post(url, {
            headers: this.getHeaders(),
            data,
        });
    }

    protected async put(url: string, data?: any): Promise<APIResponse> {
        return this.request.put(url, {
            headers: this.getHeaders(),
            data,
        });
    }

    protected async delete(url: string): Promise<APIResponse> {
        return this.request.delete(url, {
            headers: this.getHeaders(),
        });
    }
}