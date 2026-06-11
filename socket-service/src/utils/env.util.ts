import dotenv from "dotenv"
dotenv.config();

export const serverConfig = {
    PORT: process.env.SERVER_PORT
}

export const dbConfig = {
    redis: {
        URL: process.env.DB_REDIS_URL,
        PARTITION: process.env.DB_REDIS_PARTITION ? Number.parseInt(process.env.DB_REDIS_PARTITION) : 0,
    }
}