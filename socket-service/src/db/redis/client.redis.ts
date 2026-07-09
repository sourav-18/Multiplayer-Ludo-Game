import { dbConfig } from "../../utils/env.util.js";
import Redlock from "redlock";
import { Redis } from "ioredis";

const client = new Redis({ host: "localhost", db: dbConfig.redis.PARTITION });
client.on("connect", () => {
    console.log("Redis connected");
})

export const redlock = new Redlock([client as any], {
    retryCount: 20,
    retryDelay: 100,
});


export default client;