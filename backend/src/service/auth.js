const bcrypt = require('bcrypt');
const transporter = require('../email');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (email) => {
  try {
    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Check if the user already exists
    const existingUser = await User.findOne({email});

    if (existingUser) {
      // User already exists, send the OTP for login
      // Send login OTP email
      const hashedOTP = await bcrypt.hash(otp.toString(), 10);
      existingUser.isOTPUsed = false;
      existingUser.otp = hashedOTP;
      existingUser.save();
      const mailOptions = {
        from: 'merntask@gmail.com',
        to: email,
        subject: 'Login OTP',
        text: `Your login OTP is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);


      return 'Login OTP sent';
    } else {
      // User does not exist, create a new account with the OTP
      // Hash the OTP
      const hashedOTP = await bcrypt.hash(otp.toString(), 10);

      // Save the user to the database with the hashed OTP
      const newUser = new User({
        email,
        otp: hashedOTP,
        username: email,
        fullName: email.split('@')[0],
        role: 'admin',
      });
      await newUser.save();

      // Send welcome email with OTP
      const mailOptions = {
        from: 'merntask@gmail.com',
        to: email,
        subject: 'Welcome to our App',
        text:
        `Welcome, ${email}! Thank you for signing up. Your OTP is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      return 'User signed up successfully';
    }
  } catch (error) {
    throw error;
  }
};

const login = async (email, otp) => {
  try {
    // Find the user in the database
    const user = await User.findOne({email});

    if (!user) {
      throw new Error({code: 404, error: 'User not found'});
    }

    // Check if the OTP has already been used
    if (user.isOTPUsed) {
      throw new Error({code: 401, error: 'OTP has already been used'});
    }

    // Compare the provided OTP with the hashed OTP in the database
    const isOTPValid = await bcrypt.compare(otp.toString(), user.otp);

    if (!isOTPValid) {
      throw new Error({code: 401, error: 'Invalid OTP'});
    }

    // Mark the OTP as used
    user.isOTPUsed = true;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({userId: user._id}, 'your_secret_key', {
      expiresIn: '24h',
    });

    return {message: 'Login successful', token, user};
  } catch (error) {
    throw error;
  }
};

const me = async (token) => {
  try {
    // Decode the token to get the userId
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.userId;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error({code: 404, error: 'User not found'});
    }

    // Return the complete userData
    return user;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  signup, login, me,
};
