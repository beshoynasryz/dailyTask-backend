const errorHandler = (err, req, res, next) => {
    // Default error status and message
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
  
    // Send error response
    res.json({
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
      errors: err.errors || null, // Include validation errors if provided
    });
  };
  
  export default errorHandler;
  