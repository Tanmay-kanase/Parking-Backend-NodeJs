import { v4 as uuidv4 } from "uuid";

/**
 * Spring Data Mongo maps the Java model's @Id field (e.g. "bookingId",
 * "slotId") straight onto Mongo's _id, and serializes it back out under
 * that same Java field name. To keep the existing frontend working without
 * changes, we do the same thing here: store the id as _id (a UUID string,
 * same as `String` @Id fields in the Java models) but rename it to the
 * expected field name whenever the document is turned into JSON.
 */
export function idField() {
  return {
    type: String,
    default: () => uuidv4(),
  };
}

export function applyIdTransform(schema, idFieldName) {
  schema.set("toJSON", {
    virtuals: false,
    versionKey: false,
    transform: (_doc, ret) => {
      ret[idFieldName] = ret._id;
      delete ret._id;
      return ret;
    },
  });
  schema.set("toObject", {
    virtuals: false,
    versionKey: false,
    transform: (_doc, ret) => {
      ret[idFieldName] = ret._id;
      delete ret._id;
      return ret;
    },
  });
}
