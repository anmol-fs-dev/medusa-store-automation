import { test as base } from '@playwright/test'

import { ProductClient } from '../clients/productClient'
import { CartClient } from '../clients/cartClient'
import { AuthClient } from '../clients/authClient'
import { AdminClient } from '../clients/adminClient'

type ApiFixtures = {

    productClient: ProductClient

    customerClient: CartClient

    adminClient: AdminClient

}

export const test = base.extend<ApiFixtures>({

    productClient: async ({ request }, use) => {

        const client = new ProductClient(request)

        await use(client)

    },

    customerClient: async ({ request }, use) => {

        const authClient = new AuthClient(request)

        const token = await authClient.loginCustomer(
            process.env.CUSTOMER_EMAIL!,
            process.env.CUSTOMER_PASSWORD!
        )

        const client = new CartClient(request, token)

        await use(client)

    },

    adminClient: async ({ request }, use) => {

        const client = new AdminClient(request)

        await client.loginAdmin(
            process.env.ADMIN_EMAIL!,
            process.env.ADMIN_PASSWORD!
        )

        await use(client)

    }

})

export const expect = test.expect