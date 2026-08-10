// Wraps an async controller so thrown errors/rejections reach Express's
// error handler instead of crashing the request.
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error("❌ Unhandled error:", err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: err.message || "Internal server error" });
}
