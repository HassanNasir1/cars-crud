const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Convert email to lowercase
    trim: true, // Remove extra whitespaces
    // match: [
    //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //   "Please provide a valid email",
    // ], // Email format validation
  },
  fullName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
  },
  otp: {
    type: String,
    required: true,
  },
  isOTPUsed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
