const mongoose = require('mongoose')

/**
 * User Schema
 * @typedef {Object} UserSchema
 * @property {string} email - The email address of the user. Required. Unique.
 * @property {string} fullName - The full name of the user.
 * @property {string} username - The username of the user. Unique.
 * @property {string} role - The role of the user.
 * @property {string} otp - The OTP (One-Time Password) of the user. Required.
 * @property {boolean} isOTPUsed - Indicates if the OTP has been used. Default is false.
 * @property {Date} createdAt - The creation date of the user.
 */

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email']
  },
  fullName: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  role: {
    type: String
  },
  otp: {
    type: String,
    required: true
  },
  isOTPUsed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * User Model
 * @typedef {Object} UserModel
 * @property {Function} find - Find users based on a query.
 * @property {Function} findById - Find a user by its ID.
 * @property {Function} create - Create a new user.
 * @property {Function} updateOne - Update a user based on a query.
 * @property {Function} deleteOne - Delete a user based on a query.
 */

const User = mongoose.model('User', userSchema)

module.exports = User
