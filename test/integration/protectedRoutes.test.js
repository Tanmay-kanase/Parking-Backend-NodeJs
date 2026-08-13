import { createApp } from "../../src/app.js";
import { generateToken } from "../../src/utils/jwtUtil.js";
import request from "supertest";
import {
  connectTestDB,
  clearTestDB,
  disconnectTestDB,
} from "../helpers/db.js";

let app;

beforeAll(async () => {
  await connectTestDB();
  app = createApp();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});

describe("GET /api/health", () => {
  it("requires authentication (mounted with requireAuth in app.js)", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Authentication required");
  });

  it("succeeds with a valid bearer token", async () => {
    const token = generateToken("user-1", "a@b.com", "user");
    const res = await request(app)
      .get("/api/health")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("vehicle routes (authenticated)", () => {
  const token = generateToken("user-1", "a@b.com", "user");

  it("rejects requests with no token", async () => {
    const res = await request(app).get("/api/vehicles/user/user-1");
    expect(res.status).toBe(401);
  });

  it("rejects requests with an invalid token", async () => {
    const res = await request(app)
      .get("/api/vehicles/user/user-1")
      .set("Authorization", "Bearer garbage");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid or expired token");
  });

  it("adds and then lists a vehicle for an authenticated user", async () => {
    const addRes = await request(app)
      .post("/api/vehicles/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: "user-1", licensePlate: "MH12AB1234", vehicleType: "Car" });

    expect(addRes.status).toBe(200);
    expect(addRes.body.vehicleId).toEqual(expect.any(String));

    const listRes = await request(app)
      .get("/api/vehicles/user/user-1")
      .set("Authorization", `Bearer ${token}`);

    expect(listRes.status).toBe(200);
    expect(listRes.body).toHaveLength(1);
    expect(listRes.body[0].licensePlate).toBe("MH12AB1234");
  });

  it("also accepts the token via cookie instead of the Authorization header", async () => {
    const res = await request(app)
      .get("/api/vehicles/user/user-1")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(200);
  });
});
