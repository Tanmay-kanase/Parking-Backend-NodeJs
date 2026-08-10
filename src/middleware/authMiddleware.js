import { parseToken } from "../utils/jwtUtil.js";

// Reads the token from the Authorization header first, then falls back to
// the "token" cookie - same order as JwtAuthFilter.java.
function extractToken(req) {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
}

// Populates req.user when a valid token is present. Only rejects the
// request when a token WAS provided but is invalid/expired - a missing
// token is allowed through (matches the Spring filter, which never blocks
// on a missing token; route-level authorization is applied separately).
export function authMiddleware(req, res, next) {
  const token = extractToken(req);

  if (token) {
    try {
      const claims = parseToken(token);
      req.user = { userId: claims.userId, email: claims.email, role: claims.role };
    } catch (e) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  next();
}

// Blocks the request unless a valid user was attached by authMiddleware -
// equivalent to Spring's `.requestMatchers("/api/**").authenticated()`.
export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}
