// xss.js

const xss = require("xss");
const entities = require("entities");

// Middleware function for XSS protection
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

// Helper function to sanitize an object recursively
function sanitizeObject(obj) {
  console.log(obj);
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      console.log("i am if");

      // Recursively sanitize nested objects
      sanitizeObject(value);
    } else if (typeof value === "string") {
      // Sanitize string values
      console.log("i am else");

      obj[key] = xss(value);
    }
  }
}

module.exports = xssMiddleware;
