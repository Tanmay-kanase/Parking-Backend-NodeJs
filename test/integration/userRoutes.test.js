import { jest } from "@jest/globals";
import request from "supertest";
import { connectTestDB, clearTestDB, disconnectTestDB } from "../helpers/db.js";

// emailService (imported transitively by userController, for /send-otp)
// creates a real nodemailer transporter at module load time and would try
// to hit smtp.gmail.com over the network. Mock nodemailer itself so that's
// never attempted, regardless of which route a given test hits.
const sendMail = jest.fn().mockResolvedValue({ messageId: "test" });
jest.unstable_mockModule("nodemailer", () => ({
  default: { createTransport: () => ({ sendMail }) },
}));

const { createApp } = await import("../../src/app.js");

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

const newUser = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  password: "correct-horse-battery-staple",
  role: "user",
  phone: "9999999999",
};

describe("GET /api/users/hello", () => {
  it("is public and returns a greeting", async () => {
    const res = await request(app).get("/api/users/hello");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello from Spring Boot!");
  });
});

describe("POST /api/users/signup", () => {
  it("creates a user, sets the auth cookie, and never returns the token in the body", async () => {
    const res = await request(app).post("/api/users/signup").send(newUser);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(newUser.email);
    expect(res.body.token).toBeUndefined(); // stripped from body, only in cookie
    expect(res.body.user.password).not.toBe(newUser.password); // hashed

    const setCookie = res.headers["set-cookie"]?.[0] || "";
    expect(setCookie).toMatch(/^token=/);
    expect(setCookie).toMatch(/HttpOnly/i);
  });

  it("rejects a signup missing email or password with 400", async () => {
    const res = await request(app)
      .post("/api/users/signup")
      .send({ name: "No Email" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email and password are required");
  });

  it("rejects a duplicate email with 409", async () => {
    await request(app).post("/api/users/signup").send(newUser);
    const res = await request(app).post("/api/users/signup").send(newUser);

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("User already exists");
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await request(app).post("/api/users/signup").send(newUser);
  });

  it("logs in with correct credentials and sets the auth cookie", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: newUser.email, password: newUser.password });

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(newUser.email);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.headers["set-cookie"]?.[0]).toMatch(/^token=/);
  });

  it("rejects a wrong password with 401", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: newUser.email, password: "totally-wrong" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Wrong password");
  });

  it("rejects an unknown email with 401", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "nobody@example.com", password: "whatever" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("User not found");
  });
});

describe("GET /api/users/me", () => {
  it("returns the current user (password nulled out) for a valid cookie", async () => {
    const signupRes = await request(app)
      .post("/api/users/signup")
      .send(newUser);
    const cookie = signupRes.headers["set-cookie"][0];

    const res = await request(app).get("/api/users/me").set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(newUser.email);
    expect(res.body.password).toBeNull();
  });

  it("returns 401 when there is no token cookie", async () => {
    const res = await request(app).get("/api/users/me");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("returns 401 for a garbage token cookie", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Cookie", "token=not-a-real-jwt");

    expect(res.status).toBe(401);
  });
});

describe("POST /api/users/logout", () => {
  it("clears the token cookie", async () => {
    const res = await request(app).post("/api/users/logout");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Logged out successfully");
    const setCookie = res.headers["set-cookie"]?.[0] || "";
    expect(setCookie).toMatch(/^token=;/);
  });
});

describe("user CRUD routes", () => {
  async function signupAndGetUser() {
    const res = await request(app).post("/api/users/signup").send(newUser);
    return res.body.user;
  }

  it("GET /api/users/getAllUsers lists everyone", async () => {
    await signupAndGetUser();
    const res = await request(app).get("/api/users/getAllUsers");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].email).toBe(newUser.email);
  });

  it("GET /api/users/email/:email finds a user by email", async () => {
    await signupAndGetUser();
    const res = await request(app).get(
      `/api/users/email/${encodeURIComponent(newUser.email)}`,
    );
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(newUser.email);
  });

  it("GET /api/users/email/:email returns null for a non-existent email", async () => {
    const res = await request(app).get("/api/users/email/nobody@example.com");
    expect(res.status).toBe(200);
    expect(res.body).toBeNull();
  });

  it("GET /api/users/:userId fetches a single user", async () => {
    const user = await signupAndGetUser();
    const res = await request(app).get(`/api/users/${user.userId}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(newUser.email);
  });

  it("PUT /api/users/:userId updates name/email/phone/role", async () => {
    const user = await signupAndGetUser();
    const res = await request(app).put(`/api/users/${user.userId}`).send({
      name: "New Name",
      email: user.email,
      phone: "1111111111",
      role: "user",
    });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("New Name");
    expect(res.body.phone).toBe("1111111111");
  });

  it("PUT /api/users/make-admin/:userId promotes a user", async () => {
    const user = await signupAndGetUser();
    const res = await request(app).put(`/api/users/make-admin/${user.userId}`);
    expect(res.status).toBe(200);

    const check = await request(app).get(`/api/users/${user.userId}`);
    expect(check.body.role).toBe("admin");
  });

  it("DELETE /api/users/delete/:userId removes the user", async () => {
    const user = await signupAndGetUser();
    const del = await request(app).delete(`/api/users/delete/${user.userId}`);
    expect(del.status).toBe(200);

    const all = await request(app).get("/api/users/getAllUsers");
    expect(all.body).toHaveLength(0);
  });

  it("GET /api/users/:userId/email returns the email string", async () => {
    const user = await signupAndGetUser();
    const res = await request(app).get(`/api/users/${user.userId}/email`);
    expect(res.status).toBe(200);
    expect(res.body).toBe(newUser.email);
  });

  it("GET /api/users/:userId/email 404s for an unknown id", async () => {
    const res = await request(app).get(
      "/api/users/00000000-0000-4000-8000-000000000000/email",
    );
    expect(res.status).toBe(404);
  });
});

describe("OTP routes", () => {
  it("POST /api/users/send-otp sends and returns an OTP", async () => {
    const res = await request(app)
      .post("/api/users/send-otp")
      .send({ email: "otp@example.com" });

    expect(res.status).toBe(200);
    expect(res.body.otp).toMatch(/^\d{6}$/);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("POST /api/users/send-otp requires an email", async () => {
    const res = await request(app).post("/api/users/send-otp").send({});
    expect(res.status).toBe(400);
  });

  it("POST /api/users/verify-otp accepts the OTP that was just sent", async () => {
    const sendRes = await request(app)
      .post("/api/users/send-otp")
      .send({ email: "otp2@example.com" });

    const res = await request(app)
      .post("/api/users/verify-otp")
      .send({ email: "otp2@example.com", otp: sendRes.body.otp });

    expect(res.status).toBe(200);
    expect(res.body.verified).toBe(true);
  });

  it("POST /api/users/verify-otp rejects a wrong OTP", async () => {
    await request(app)
      .post("/api/users/send-otp")
      .send({ email: "otp3@example.com" });

    const res = await request(app)
      .post("/api/users/verify-otp")
      .send({ email: "otp3@example.com", otp: "000000" });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
