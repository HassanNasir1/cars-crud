const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authService = require('../service/auth');

/**
 * Signup route
 * @name POST /signup
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with message or error
 */
router.post('/signup', async (req, res) => {
  const {email} = req.body;

  try {
    const message = await authService.signup(email);
    res.status(201).json({message});
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/**
 * Login route
 * @name POST /login
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with message, token, and user data or error
 */
router.post('/login', async (req, res) => {
  const {email, otp} = req.body;

  try {
    const {message, token, user} = await authService.login(email, otp);
    res.status(200).json({message, token, user});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(error.code || 500).json({error: error.error || error.message});
  }
});

/**
 * Get user data route
 * @name GET /me
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response object with user data or error
 */
router.get('/me', async (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Decode the token to get the userId
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.userId;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    // Return the complete userData
    res.status(200).json({user});
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({error: 'An error occurred while fetching user data'});
  }
});

module.exports = router;
