import redis from "redis";
import { dbConfig } from "../../utils/env.util.js";

const client = redis.createClient({
    url: dbConfig.redis.URL!
})

client.on('error', err => { });
client.on('end', () => console.log('Redis Server End'));

async function init() {
    await client.connect();
    console.log("Redis connected");
    await client.select(dbConfig.redis.PARTITION);
    console.log("Redis selected db " + dbConfig.redis.PARTITION);
    // await client.flushDb();
    // console.log("Redis flushed");
}

init();

export default client;