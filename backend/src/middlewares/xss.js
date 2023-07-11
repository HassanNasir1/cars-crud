const xss = require('xss');

/**
 * Middleware function for XSS protection.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to be called.
 * @return {void}
 */
function xssMiddleware(req, res, next) {
  // Sanitize request body
  if (req.body) {
    sanitizeObject(req.body);
  }

  // Sanitize request query parameters
  if (req.query) {
    sanitizeObject(req.query);
  }

  // Sanitize request route parameters
  if (req.params) {
    sanitizeObject(req.params);
  }

  next();
}

/**
 * Helper function to sanitize an object recursively.
 * @param {Object} obj - The object to be sanitized.
 * @return {void}
 */
function sanitizeObject(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      // Recursively sanitize nested objects
      sanitizeObject(value);
    } else if (typeof value === 'string') {
      // Sanitize string values

      obj[key] = xss(value);
    }
  }
}

module.exports = xssMiddleware;
