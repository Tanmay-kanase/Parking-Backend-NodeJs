import jwt from "jsonwebtoken";
import {
  generateToken,
  parseToken,
  extractUserId,
  ONE_DAY_MS,
} from "../../src/utils/jwtUtil.js";

describe("jwtUtil", () => {
  describe("generateToken / parseToken", () => {
    it("round-trips the claims it was given", () => {
      const token = generateToken("user-123", "a@b.com", "user");
      const claims = parseToken(token);

      expect(claims.userId).toBe("user-123");
      expect(claims.email).toBe("a@b.com");
      expect(claims.role).toBe("user");
    });

    it("signs with HS256 and a 1-day expiry", () => {
      const token = generateToken("user-123", "a@b.com", "user");
      const decoded = jwt.decode(token, { complete: true });

      expect(decoded.header.alg).toBe("HS256");
      const lifetimeSeconds = decoded.payload.exp - decoded.payload.iat;
      expect(lifetimeSeconds).toBe(Math.floor(ONE_DAY_MS / 1000));
    });

    it("throws a wrapped error for a garbage token", () => {
      expect(() => parseToken("not-a-real-token")).toThrow("Invalid JWT token");
    });

    it("throws for a token signed with a different secret", () => {
      const foreignToken = jwt.sign({ userId: "x" }, "some-other-secret");
      expect(() => parseToken(foreignToken)).toThrow("Invalid JWT token");
    });

    it("throws for an expired token", () => {
      const expired = jwt.sign(
        { userId: "user-123" },
        process.env.JWT_SECRET,
        { expiresIn: -10 } // already expired
      );
      expect(() => parseToken(expired)).toThrow("Invalid JWT token");
    });
  });

  describe("extractUserId", () => {
    it("pulls userId out of a valid token", () => {
      const token = generateToken("user-456", "c@d.com", "admin");
      expect(extractUserId(token)).toBe("user-456");
    });

    it("propagates the parse error for an invalid token", () => {
      expect(() => extractUserId("garbage")).toThrow("Invalid JWT token");
    });
  });
});
