import Redis from "ioredis";
import { env } from "./env.js";

const isTls = env.redisUrl.startsWith("rediss://");

export const redisClient = new Redis(env.redisUrl, {
  tls: isTls ? {} : undefined,
  maxRetriesPerRequest: 3,
});

redisClient.on("connect", () => console.log("✅ Redis connected"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err.message));
