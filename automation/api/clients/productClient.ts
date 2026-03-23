import { APIRequestContext } from "@playwright/test";
import { BaseClient } from "./baseClient";

export class ProductClient extends BaseClient {
    constructor(request: APIRequestContext, token?: string) {
        super(request, token);
    }

    async listProducts(queryParams?: string) {
        const url = queryParams ? `/store/products?${queryParams}` : "/store/products";
        const response = await this.get(url);
        return response.json();
    }

    async getProduct(productId: string) {
        const response = await this.get(`/store/products/${productId}`);
        return response.json();
    }
}