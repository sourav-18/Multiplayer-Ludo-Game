import dotenv from "dotenv"
dotenv.config();

export const serverConfig = {
    PORT: process.env.SERVER_PORT
}


export const dbConfig = {
    DB_POSTGRES_HOST: process.env.DB_POSTGRES_HOST,
    DB_POSTGRES_PORT: Number(process.env.DB_POSTGRES_PORT),
    DB_POSTGRES_DB: process.env.DB_POSTGRES_DB,
    DB_POSTGRES_USER: process.env.DB_POSTGRES_USER,
    DB_POSTGRES_PASSWORD: process.env.DB_POSTGRES_PASSWORD,
}

export const redisConfig = {
    URL: process.env.DB_REDIS_URL,
    PARTITION: process.env.DB_REDIS_PARTITION ? Number.parseInt(process.env.DB_REDIS_PARTITION) : 0,
}


