import * as slotLockService from "../services/slotLockService.js";

let broadcaster = null;
export function setBroadcaster(fn) {
  broadcaster = fn;
}

export async function lockSlot(req, res) {
  const { slotId, userId } = req.body;

  const locked = await slotLockService.lockSlot(slotId, userId);

  if (!locked) {
    return res.json({ success: false, message: "Slot already locked" });
  }

  if (broadcaster) {
    broadcaster("/topic/slot-updates", { slotId, userId, status: "LOCKED" });
  }

  res.json({ success: true, message: "Slot locked successfully" });
}

export async function unlockSlot(req, res) {
  const { slotId, userId } = req.body;

  const owner = await slotLockService.getLockOwner(slotId);

  if (!owner || owner !== userId) {
    return res.json({ success: false, message: "You are not lock owner" });
  }

  await slotLockService.unlockSlot(slotId);

  if (broadcaster) {
    broadcaster("/topic/slot-updates", { slotId, userId, status: "UNLOCKED" });
  }

  res.json({ success: true, message: "Slot unlocked" });
}
