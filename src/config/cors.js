import { env } from "./env.js";

// Mirrors CorsConfig.java: allow the configured frontend origin, standard
// REST methods, all headers, and credentials (cookies) on API routes.
export const corsOptions = {
  origin: env.frontendUrl,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
