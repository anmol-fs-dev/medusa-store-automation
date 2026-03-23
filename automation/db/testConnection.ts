import { Client } from "pg"

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "admin",
    database: "medusa-medusa-ecomm-store"
})

async function testDB() {

    await client.connect()

    const res = await client.query("SELECT * FROM product LIMIT 3")

    console.log(res.rows)

    await client.end()
}

testDB()