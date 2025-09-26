import { Client, Pool } from "pg";
import "dotenv/config"

export const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
})

export const DbController = {
    pool: pool,
}

export async function query (txt, params = []) {
    const client = await DbController.pool.connect();
    try {
        const result = await client.query(txt, params);
        return result
    } finally {
        client.release();
    }
}
