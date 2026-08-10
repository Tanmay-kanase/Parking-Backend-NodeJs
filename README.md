# ParkEasy — Node.js/Express Backend

This is a 1:1 conversion of the original Spring Boot backend (`src/main/java/com/example/**`)
to **Node.js + Express**, using **ES Modules** (`"type": "module"`). All existing
**API endpoints, request/response field names, and paths are unchanged**, so the existing
React frontend (`client/`) works against this backend without any modifications.

## Layout

```
backend/
  server.js                # entry point: HTTP server, DB/Redis/websocket wiring, cron job
  src/
    app.js                 # Express app assembly + route mounting + auth rules
    config/                # env, MongoDB, Redis, CORS config
    models/                # Mongoose schemas (1:1 with the Java @Document models)
    controllers/           # thin HTTP layer — parses req, calls services, sends res
    services/               # ALL business logic lives here (imported by controllers)
    routes/                 # Express routers, one per resource, same paths as Spring
    middleware/             # JWT auth (mirrors JwtAuthFilter) + error handling
    utils/                   # JWT, Razorpay signature check, PDF/QR/iCal generation
    ws/                      # minimal STOMP-over-SockJS broker for /ws + /topic/**
```

## Why a custom STOMP broker?

The frontend's `client/src/config/socket.js` connects with `sockjs-client` + `@stomp/stompjs`
to `${VITE_BACKEND_URL}/ws` and subscribes to `/topic/slot-updates` — that's Spring's
`WebSocketConfig` (`STOMP` over `SockJS`, with a "simple broker" on `/topic`). Node has no
built-in equivalent, so `src/ws/stompBroker.js` implements just enough of the STOMP 1.1/1.2
protocol (CONNECT/CONNECTED, SUBSCRIBE/UNSUBSCRIBE, server-pushed MESSAGE frames) to support
this app's actual usage pattern: the server pushes slot lock/unlock/booked events, the client
only ever subscribes. No frontend changes needed.

## ID fields

Spring Data Mongo mapped each Java model's `@Id` field (e.g. `bookingId`, `slotId`,
`histroy_id` — yes, that typo is intentional and preserved) directly onto Mongo's `_id`, and
serialized it back out under that same name. `src/models/idField.js` replicates this with a
`toJSON`/`toObject` transform on every schema, so the JSON your frontend receives is byte-for-byte
compatible with what Spring was sending.

## Setup

```bash
cd backend
cp .env.example .env   # fill in Mongo/Redis/Razorpay/Gmail credentials
npm install
npm start               # or `npm run dev` for auto-restart on changes
```

Required services: MongoDB, Redis (used for the 5-minute slot lock, same as
`SlotLockService.java` + `RedisConfig.java`).

### Environment variables (`.env`)

| Variable | Purpose |
|---|---|
| `PORT` | HTTP port (defaults to 5000, matching the frontend's default `axiosInstance` baseURL) |
| `FRONTEND_URL` | Exact origin allowed by CORS (must match your Vite dev/prod URL) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | HMAC secret for signing/verifying JWTs |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | Gmail SMTP creds for booking-confirmation & OTP emails |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay order creation + payment verification |
| `REDIS_URL` | Redis connection string (`redis://` or `rediss://`) |

## Auth model

Mirrors `SecurityConfig.java` exactly:
- `/api/users/**` — public (signup, login, OTP, etc.)
- every other `/api/**` route — requires a valid JWT, read from either the
  `Authorization: Bearer <token>` header or the `token` cookie (same lookup order as
  `JwtAuthFilter.java`)

## Notes on faithfully-preserved original behavior

A few things in the original Java code look like bugs but were kept as-is for functional
parity (converting behavior, not "fixing" it):
- `getParkingLocationsByCity` never actually uses the fetched slot list to compute
  `bikeSlots`/`sedanSlots`/etc. — they're always 0/`available: false`.
- `GET /api/parking-slots/available-by-time` passes `startTime` twice instead of
  `startTime`/`endTime` to the service.
- `googleLogin` for a brand-new user double-hashes the password (hashes it once itself,
  then `registerUser` hashes it again).

If you'd like any of these actually fixed, just ask.
