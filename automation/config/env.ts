import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve(process.cwd(), '.env')
})

export const env = {
    storefrontUrl: process.env.STOREFRONT_URL || 'http://localhost:8000',
    apiUrl: process.env.API_URL || 'http://localhost:9000',

    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,

    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
}