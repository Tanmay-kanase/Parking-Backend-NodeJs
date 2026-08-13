import { idField, applyIdTransform } from "../../src/models/idField.js";

describe("idField", () => {
  it("defaults to a v4 UUID string", () => {
    const field = idField();
    expect(field.type).toBe(String);

    const generated = field.default();
    expect(typeof generated).toBe("string");
    // UUID v4 shape: 8-4-4-4-12 hex chars, version nibble "4".
    expect(generated).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it("generates a fresh id on every call", () => {
    const field = idField();
    expect(field.default()).not.toBe(field.default());
  });
});

describe("applyIdTransform", () => {
  // Mongoose schemas expose .set("toJSON", {...}) / .set("toObject", {...}).
  // A minimal fake lets us test the transform logic without needing a real
  // Mongoose connection.
  function fakeSchema() {
    const registered = {};
    return {
      set: (key, config) => {
        registered[key] = config;
      },
      registered,
    };
  }

  it("renames _id to the given field name on toJSON", () => {
    const schema = fakeSchema();
    applyIdTransform(schema, "bookingId");

    const result = schema.registered.toJSON.transform(null, {
      _id: "abc-123",
      status: "ACTIVE",
    });

    expect(result).toEqual({ bookingId: "abc-123", status: "ACTIVE" });
    expect(result._id).toBeUndefined();
  });

  it("does the same rename for toObject", () => {
    const schema = fakeSchema();
    applyIdTransform(schema, "vehicleId");

    const result = schema.registered.toObject.transform(null, {
      _id: "veh-1",
      licensePlate: "MH12AB1234",
    });

    expect(result).toEqual({ vehicleId: "veh-1", licensePlate: "MH12AB1234" });
  });

  it("disables virtuals and the version key", () => {
    const schema = fakeSchema();
    applyIdTransform(schema, "userId");

    expect(schema.registered.toJSON.virtuals).toBe(false);
    expect(schema.registered.toJSON.versionKey).toBe(false);
    expect(schema.registered.toObject.virtuals).toBe(false);
    expect(schema.registered.toObject.versionKey).toBe(false);
  });
});
