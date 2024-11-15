// src/middleware/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  if (err.name === 'ZodError') {
    // Handle Zod validation errors
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors.map((error) => error.message),
    });
  }

  // Handle other errors
  res.status(err.statusCode || 500).json({
    message: err.message || 'Something went wrong!',
  });
};

export default errorMiddleware;
