const jwt = require('jsonwebtoken');
/**
 * Middleware to authenticate JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to be called.
 * @return {void}
 */
const authenticateToken = (req, res, next) => {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({error: 'No token provided'});
  }

  // Verify the token
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    // replace your_secret_key in a production environment use environment variables
    if (err) {
      return res.status(401).json({error: 'Invalid token'});
    }

    // Token is valid, attach the decoded data to the request
    req.userId = decoded.userId;
    next();
  });
};

module.exports = {authenticateToken};
