import { APIRequestContext } from "@playwright/test";
import { BaseClient } from "./baseClient";

export class ProductClient extends BaseClient {
    constructor(request: APIRequestContext, token?: string) {
        super(request, token);
    }

    async listProducts() {
        const response = await this.get("/store/products");
        return response.json();
    }

    async getProduct(productId: string) {
        const response = await this.get(`/store/products/${productId}`);
        return response.json();
    }
}