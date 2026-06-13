import { beforeAll, afterAll, afterEach } from "vitest";
import { createClient, RedisClientType } from "redis";
import { RedisMemoryServer } from "redis-memory-server";

let redisServer: RedisMemoryServer;
let redisClient: RedisClientType;

beforeAll(async () => {
  redisServer = await RedisMemoryServer.create();

  const host = await redisServer.getHost();
  const port = await redisServer.getPort();
  const redisUrl = `redis://${host}:${port}`;

  redisClient = createClient({ url: redisUrl });

  await redisClient.connect();
});

afterEach(async () => {
  // Optional: clear DB between tests
  if (redisClient) {
    await redisClient.flushAll();
  }
});

afterAll(async () => {
  if (redisClient) {
    await redisClient.disconnect();
  }

  if (redisServer) {
    await redisServer.stop();
  }
});