import { APIRequestContext } from "@playwright/test";
import { BaseClient } from "./baseClient";

export class CartClient extends BaseClient {
    constructor(request: APIRequestContext, token?: string) {
        super(request, token);
    }

    async createCart() {
        const response = await this.post("/store/carts");
        return response.json();
    }

    async addItem(cartId: string, variantId: string, quantity: number) {
        const response = await this.post(`/store/carts/${cartId}/line-items`, {
            variant_id: variantId,
            quantity,
        });

        return response.json();
    }

    async getCart(cartId: string) {
        const response = await this.get(`/store/carts/${cartId}`);
        return response.json();
    }

    async completeCart(cartId: string) {
        const response = await this.post(`/store/carts/${cartId}/complete`);
        return response.json();
    }
}