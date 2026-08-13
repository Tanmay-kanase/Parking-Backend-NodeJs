import { jest } from "@jest/globals";
import {
  asyncHandler,
  errorHandler,
} from "../../src/middleware/errorHandler.js";

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.headersSent = false;
  return res;
}

describe("asyncHandler", () => {
  it("calls through to the wrapped handler on success", async () => {
    const handler = jest.fn().mockResolvedValue(undefined);
    const wrapped = asyncHandler(handler);
    const req = {};
    const res = mockRes();
    const next = jest.fn();

    await wrapped(req, res, next);

    expect(handler).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it("forwards a thrown/rejected error to next() instead of throwing", async () => {
    const boom = new Error("boom");
    const handler = jest.fn().mockRejectedValue(boom);
    const wrapped = asyncHandler(handler);
    const next = jest.fn();

    await wrapped({}, mockRes(), next);

    expect(next).toHaveBeenCalledWith(boom);
  });
});

describe("errorHandler", () => {
  it("responds 500 with the error message when headers haven't been sent", () => {
    const err = new Error("something broke");
    const res = mockRes();
    const next = jest.fn();

    errorHandler(err, {}, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "something broke" });
    expect(next).not.toHaveBeenCalled();
  });

  it("falls back to a generic message when the error has none", () => {
    const res = mockRes();
    errorHandler(new Error(), {}, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });

  it("delegates to next(err) when headers were already sent", () => {
    const err = new Error("too late");
    const res = mockRes();
    res.headersSent = true;
    const next = jest.fn();

    errorHandler(err, {}, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(err);
  });
});
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});
