import postgres from 'postgres'
import { dbConfig } from '../../utils/env.util.js'

const sql = postgres({
    host: dbConfig.DB_POSTGRES_HOST,
    port: dbConfig.DB_POSTGRES_PORT,
    database: dbConfig.DB_POSTGRES_DB!,
    user: dbConfig.DB_POSTGRES_USER!,
    ssl: {
        rejectUnauthorized: false
    },
    password: dbConfig.DB_POSTGRES_PASSWORD!,
    max: 5
})

export default sql