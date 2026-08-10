import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const ONE_DAY_MS = 86400000;

export function generateToken(userId, email, role) {
  return jwt.sign({ userId, email, role }, env.jwtSecret, {
    algorithm: "HS256",
    expiresIn: Math.floor(ONE_DAY_MS / 1000),
  });
}

export function parseToken(token) {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch (e) {
    const err = new Error("Invalid JWT token");
    err.cause = e;
    throw err;
  }
}

export function extractUserId(token) {
  const claims = parseToken(token);
  return claims.userId;
}
