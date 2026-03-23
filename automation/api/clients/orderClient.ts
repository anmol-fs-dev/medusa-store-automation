import { APIRequestContext } from "@playwright/test";
import { BaseClient } from "./baseClient";

export class OrderClient extends BaseClient {
    constructor(request: APIRequestContext, token?: string) {
        super(request, token);
    }

    async getOrder(orderId: string) {
        const response = await this.get(`/store/orders/${orderId}`);
        return response.json();
    }

    async listOrders() {
        const response = await this.get("/store/orders");
        return response.json();
    }
}