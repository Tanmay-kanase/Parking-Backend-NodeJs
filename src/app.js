import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors.js";
import { authMiddleware, requireAuth } from "./middleware/authMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";

import healthRoutes from "./routes/healthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import parkingHistoryRoutes from "./routes/parkingHistoryRoutes.js";
import parkingLocationRoutes from "./routes/parkingLocationRoutes.js";
import parkingSlotRoutes from "./routes/parkingSlotRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import slotLockRoutes from "./routes/slotLockRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

export function createApp() {
  const app = express();

  app.use(cors(corsOptions));
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.json());
  app.use(express.text({ type: ["text/plain", "application/*+text"] }));
  app.use(cookieParser());

  // Populate req.user from the Authorization header / "token" cookie when
  // present. Does not block requests with no token - see authMiddleware.js.
  app.use(authMiddleware);

  // Equivalent to .requestMatchers("/api/users/**").permitAll()
  app.use("/api/users", userRoutes);

  // Equivalent to .requestMatchers("/api/**").authenticated()
  app.use("/api", requireAuth, healthRoutes);
  app.use("/api/vehicles", requireAuth, vehicleRoutes);
  app.use("/api/feedbacks", requireAuth, feedbackRoutes);
  app.use("/api/parking-history", requireAuth, parkingHistoryRoutes);
  app.use("/api/parking-locations", requireAuth, parkingLocationRoutes);
  app.use("/api/parking-slots", requireAuth, parkingSlotRoutes);
  app.use("/api/payments", requireAuth, paymentRoutes);
  app.use("/api/bookings", requireAuth, bookingRoutes);
  app.use("/api/slots", requireAuth, slotLockRoutes);

  app.use(errorHandler);
  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
  return app;
}
