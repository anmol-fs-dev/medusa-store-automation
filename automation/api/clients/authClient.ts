import { APIRequestContext } from "@playwright/test";

export class AuthClient {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async loginCustomer(email: string, password: string): Promise<string> {
        const response = await this.request.post("/auth/customer/emailpass", {
            data: {
                email,
                password,
            },
        });

        const body = await response.json();
        if(!body.token) {
            console.log('Login failed body:', body);
        }
        return body.token;
    }

    async registerCustomer(email: string, password: string) {
        // Step 1: Register auth identity
        const authResponse = await this.request.post("/auth/customer/emailpass/register", {
            data: {
                email,
                password,
            },
        });
        
        const authBody = await authResponse.json();
        const token = authBody.token;

        // Step 2: Create customer record linked to auth identity
        const response = await this.request.post("/store/customers", {
            headers: {
                "x-publishable-api-key": process.env.PUBLISHABLE_API_KEY || "",
                "Authorization": `Bearer ${token}`
            },
            data: {
                email,
                first_name: "Test",
                last_name: "Customer",
            },
        });

        return response.json();
    }
}