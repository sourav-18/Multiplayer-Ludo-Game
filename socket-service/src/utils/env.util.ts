import dotenv from "dotenv"
dotenv.config();

export const serverConfig = {
    PORT: process.env.SERVER_PORT
}

export const dealerConfiguration = {
    DEALER_CODE: process.env.DEALER_CODE
}

export const dbConfig = {
    redis: {
        URL: process.env.DB_REDIS_URL,
    }
}

