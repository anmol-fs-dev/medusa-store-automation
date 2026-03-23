import { APIRequestContext } from "@playwright/test";
import { BaseClient } from "./baseClient";

export class AdminClient extends BaseClient {
    constructor(request: APIRequestContext, token?: string) {
        super(request, token);
    }

    async loginAdmin(email: string, password: string): Promise<string> {
        const response = await this.request.post("/admin/auth", {
            data: {
                email,
                password,
            },
        });

        const body = await response.json();
        this.token = body.token;

        return this.token;
    }

    async createProduct(productData: any) {
        const response = await this.post("/admin/products", productData);
        return response.json();
    }

    async deleteProduct(productId: string) {
        const response = await this.delete(`/admin/products/${productId}`);
        return response.json();
    }
}