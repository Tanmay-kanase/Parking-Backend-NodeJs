import http from "http";
import cron from "node-cron";
import { createApp } from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { env } from "./src/config/env.js";
import { createStompBroker } from "./src/ws/stompBroker.js";
import { setBroadcaster as setBookingBroadcaster } from "./src/services/bookingService.js";
import { setBroadcaster as setSlotLockBroadcaster } from "./src/controllers/slotLockController.js";
import { expireOldBookings } from "./src/services/bookingService.js";
async function main() {
  await connectDB();

  const app = createApp();
  const server = http.createServer(app);

  // SockJS + minimal STOMP broker at /ws, broadcasting on /topic/** -
  // mirrors WebSocketConfig.java so the existing frontend stompjs client
  // keeps working unchanged.
  const { convertAndSend } = createStompBroker(server, { prefix: "/ws" });
  setBookingBroadcaster(convertAndSend);
  setSlotLockBroadcaster(convertAndSend);

  // Equivalent to @Scheduled(fixedRate = 60000) on BookingService#expireOldBookings
  cron.schedule("* * * * *", () => {
    expireOldBookings().catch((e) =>
      console.error("❌ expireOldBookings failed:", e),
    );
  });

  server.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
