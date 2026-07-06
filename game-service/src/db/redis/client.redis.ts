import redis from "redis";
import { redisConfig } from "../../utils/env.util.js";

const client = redis.createClient({
    url: redisConfig.URL!
})

client.on('error', err => { });
client.on('end', () => console.log('Redis Server End'));

async function init() {
    await client.connect();
    console.log("Redis connected");
    await client.select(redisConfig.PARTITION);
    console.log("Redis selected db " + redisConfig.PARTITION);
    // await client.flushDb();
    // console.log("Redis flushed");
}

init();

export default client;