const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const transporter = require("../email");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Signup route
router.post(
  "/signup",
  [
    body("email").isEmail().normalizeEmail(),

    // Add more validation rules as per your requirements
  ],
  async (req, res) => {
    const { email } = req.body;

    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Generate a random OTP
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Check if the user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        // User already exists, send the OTP for login
        // Send login OTP email
        const hashedOTP = await bcrypt.hash(otp.toString(), 10);
        existingUser.isOTPUsed = false;
        existingUser.otp = hashedOTP;
        existingUser.save();
        const mailOptions = {
          from: "merntask@gmail.com",
          to: email,
          subject: "Login OTP",
          text: `Your login OTP is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Login OTP sent");

        res.status(200).json({ message: "Login OTP sent" });
      } else {
        // User does not exist, create a new account with the OTP
        // Hash the OTP
        const hashedOTP = await bcrypt.hash(otp.toString(), 10);

        // Save the user to the database with the hashed OTP
        const newUser = new User({
          email,
          otp: hashedOTP,
          username: email,
          fullName: email.split("@")[0],
          role: "admin",
        });
        await newUser.save();

        // Send welcome email with OTP
        const mailOptions = {
          from: "merntask@gmail.com",
          to: email,
          subject: "Welcome to our App",
          text: `Welcome, ${email}! Thank you for signing up. Your OTP is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent");

        res.status(201).json({ message: "User signed up successfully" });
      }
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ error: "An error occurred while signing up" });
    }
  }
);

// Login route
router.post("/login", async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the OTP has already been used
    if (user.isOTPUsed) {
      return res.status(401).json({ error: "OTP has already been used" });
    }

    // Compare the provided OTP with the hashed OTP in the database
    const isOTPValid = await bcrypt.compare(otp.toString(), user.otp);

    if (!isOTPValid) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // Mark the OTP as used
    user.isOTPUsed = true;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

module.exports = router;
