import { jest } from "@jest/globals";

// jwtUtil is mocked so we can test authMiddleware's branching logic
// (missing token / valid token / invalid token) without generating real
// JWTs. Because the project uses native ESM, mocking must happen via
// jest.unstable_mockModule *before* the module under test is imported.
const parseToken = jest.fn();
jest.unstable_mockModule("../../src/utils/jwtUtil.js", () => ({
  parseToken,
}));

const { authMiddleware, requireAuth } = await import(
  "../../src/middleware/authMiddleware.js"
);

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe("authMiddleware", () => {
  it("calls next() with no req.user when there is no token", () => {
    const req = { headers: {}, cookies: {} };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(req.user).toBeUndefined();
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("prefers the Authorization header over the cookie", () => {
    parseToken.mockReturnValue({ userId: "u1", email: "a@b.com", role: "user" });
    const req = {
      headers: { authorization: "Bearer header-token" },
      cookies: { token: "cookie-token" },
    };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(parseToken).toHaveBeenCalledWith("header-token");
    expect(req.user).toEqual({ userId: "u1", email: "a@b.com", role: "user" });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("falls back to the token cookie when there's no Authorization header", () => {
    parseToken.mockReturnValue({ userId: "u2", email: "c@d.com", role: "admin" });
    const req = { headers: {}, cookies: { token: "cookie-token" } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(parseToken).toHaveBeenCalledWith("cookie-token");
    expect(req.user.userId).toBe("u2");
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("returns 401 when a token is present but invalid, and does not call next()", () => {
    parseToken.mockImplementation(() => {
      throw new Error("Invalid JWT token");
    });
    const req = { headers: { authorization: "Bearer bad" }, cookies: {} };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid or expired token" });
    expect(next).not.toHaveBeenCalled();
  });

  it("ignores an Authorization header that isn't a Bearer token", () => {
    const req = {
      headers: { authorization: "Basic somecreds" },
      cookies: {},
    };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(parseToken).not.toHaveBeenCalled();
    expect(req.user).toBeUndefined();
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("requireAuth", () => {
  it("calls next() when req.user is set", () => {
    const req = { user: { userId: "u1" } };
    const res = mockRes();
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("returns 401 when req.user is missing", () => {
    const req = {};
    const res = mockRes();
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Authentication required" });
    expect(next).not.toHaveBeenCalled();
  });
});
