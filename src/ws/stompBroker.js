import sockjs from "sockjs";

/**
 * A minimal STOMP broker running over SockJS, replicating the behavior of
 * Spring's WebSocketConfig:
 *   - endpoint: /ws (SockJS)
 *   - simple broker prefix: /topic
 * The React frontend only SUBSCRIBEs to /topic/slot-updates and the server
 * only publishes to it (no client -> /app messages are used in this app),
 * so we implement just enough of the STOMP 1.1/1.2 protocol for that:
 * CONNECT, SUBSCRIBE, UNSUBSCRIBE, DISCONNECT, and server-pushed MESSAGE
 * frames.
 */

const NULL_BYTE = "\u0000";

function parseFrame(raw) {
  const data = raw.replace(/\u0000$/, "");
  const [headerPart, ...bodyParts] = data.split("\n\n");
  const lines = headerPart.split("\n");
  const command = lines[0];
  const headers = {};
  for (let i = 1; i < lines.length; i++) {
    const idx = lines[i].indexOf(":");
    if (idx > -1) {
      headers[lines[i].slice(0, idx)] = lines[i].slice(idx + 1);
    }
  }
  return { command, headers, body: bodyParts.join("\n\n") };
}

function buildFrame(command, headers = {}, body = "") {
  const headerLines = Object.entries(headers)
    .map(([k, v]) => `${k}:${v}`)
    .join("\n");
  return `${command}\n${headerLines}\n\n${body}${NULL_BYTE}`;
}

export function createStompBroker(httpServer, { prefix = "/ws" } = {}) {
  const sockjsServer = sockjs.createServer({ prefix, log: () => {} });

  // connectionId -> { conn, subscriptions: Map<subscriptionId, destination> }
  const connections = new Map();

  sockjsServer.on("connection", (conn) => {
    connections.set(conn.id, { conn, subscriptions: new Map() });

    conn.on("data", (message) => {
      let frame;
      try {
        frame = parseFrame(message);
      } catch (e) {
        return;
      }

      const state = connections.get(conn.id);
      if (!state) return;

      switch (frame.command) {
        case "CONNECT":
        case "STOMP": {
          conn.write(
            buildFrame("CONNECTED", {
              version: "1.1",
              "heart-beat": "0,0",
            })
          );
          break;
        }
        case "SUBSCRIBE": {
          const { id, destination } = frame.headers;
          if (id && destination) {
            state.subscriptions.set(id, destination);
          }
          break;
        }
        case "UNSUBSCRIBE": {
          const { id } = frame.headers;
          if (id) state.subscriptions.delete(id);
          break;
        }
        case "DISCONNECT": {
          if (frame.headers.receipt) {
            conn.write(buildFrame("RECEIPT", { "receipt-id": frame.headers.receipt }));
          }
          conn.close();
          break;
        }
        default:
          break;
      }
    });

    conn.on("close", () => {
      connections.delete(conn.id);
    });
  });

  sockjsServer.installHandlers(httpServer, { prefix });

  /**
   * Equivalent to SimpMessagingTemplate.convertAndSend(destination, payload).
   * payload can be a string or an object (will be JSON.stringify-ed).
   */
  function convertAndSend(destination, payload) {
    const body = typeof payload === "string" ? payload : JSON.stringify(payload);

    for (const { conn, subscriptions } of connections.values()) {
      for (const [subId, dest] of subscriptions.entries()) {
        if (dest === destination) {
          conn.write(
            buildFrame("MESSAGE", {
              destination,
              subscription: subId,
              "message-id": `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              "content-type": "application/json",
            }, body)
          );
        }
      }
    }
  }

  return { convertAndSend };
}
