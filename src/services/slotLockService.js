import { redisClient } from "../config/redis.js";

const LOCK_TIME_SECONDS = 300;

function lockKey(slotId) {
  return `lock:slot:${slotId}`;
}

export async function lockSlot(slotId, userId) {
  // "SET key value NX EX seconds" -> returns "OK" if set, null if key already exists
  const result = await redisClient.set(lockKey(slotId), userId, "EX", LOCK_TIME_SECONDS, "NX");
  return result === "OK";
}

export async function unlockSlot(slotId) {
  await redisClient.del(lockKey(slotId));
}

export async function getLockOwner(slotId) {
  return redisClient.get(lockKey(slotId));
}

export async function isLocked(slotId) {
  const exists = await redisClient.exists(lockKey(slotId));
  return exists === 1;
}
