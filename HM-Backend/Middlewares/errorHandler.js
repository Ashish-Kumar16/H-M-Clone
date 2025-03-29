// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate field value entered",
      error: err.message,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      error: Object.values(err.errors).map((val) => val.message),
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token. Please login again",
    });
  }

  // Default to 500 server error
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
};

module.exports = errorHandler;
