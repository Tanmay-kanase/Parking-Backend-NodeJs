import { jest } from "@jest/globals";

// config/redis.js opens a real TCP connection to Redis as soon as it's
// imported, so it's mocked here rather than in src/services/slotLockService
// directly - that keeps these tests fast and network-free.
const redisClient = {
  set: jest.fn(),
  del: jest.fn(),
  get: jest.fn(),
  exists: jest.fn(),
};
jest.unstable_mockModule("../../src/config/redis.js", () => ({ redisClient }));

const slotLockService = await import("../../src/services/slotLockService.js");

describe("slotLockService", () => {
  it("lockSlot uses SET NX EX and returns true on success", async () => {
    redisClient.set.mockResolvedValue("OK");

    const result = await slotLockService.lockSlot("slot-1", "user-1");

    expect(redisClient.set).toHaveBeenCalledWith(
      "lock:slot:slot-1",
      "user-1",
      "EX",
      300,
      "NX",
    );
    expect(result).toBe(true);
  });

  it("lockSlot returns false when the slot is already locked", async () => {
    redisClient.set.mockResolvedValue(null); // NX conflict -> ioredis returns null

    const result = await slotLockService.lockSlot("slot-1", "user-2");

    expect(result).toBe(false);
  });

  it("unlockSlot deletes the lock key", async () => {
    redisClient.del.mockResolvedValue(1);

    await slotLockService.unlockSlot("slot-1");

    expect(redisClient.del).toHaveBeenCalledWith("lock:slot:slot-1");
  });

  it("getLockOwner returns whatever value is stored under the lock key", async () => {
    redisClient.get.mockResolvedValue("user-1");

    const owner = await slotLockService.getLockOwner("slot-1");

    expect(redisClient.get).toHaveBeenCalledWith("lock:slot:slot-1");
    expect(owner).toBe("user-1");
  });

  it("getLockOwner returns null for an unlocked slot", async () => {
    redisClient.get.mockResolvedValue(null);
    await expect(slotLockService.getLockOwner("slot-9")).resolves.toBeNull();
  });

  it("isLocked maps redis EXISTS 1 to true", async () => {
    redisClient.exists.mockResolvedValue(1);
    await expect(slotLockService.isLocked("slot-1")).resolves.toBe(true);
  });

  it("isLocked maps redis EXISTS 0 to false", async () => {
    redisClient.exists.mockResolvedValue(0);
    await expect(slotLockService.isLocked("slot-1")).resolves.toBe(false);
  });
});
