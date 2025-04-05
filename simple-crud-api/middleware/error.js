const error = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred",
    stack: err.stack,
  });
};
export default error;
