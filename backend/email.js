const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hasnasir24@gmail.com',
    pass: 'mfijlojkzhadpnmb',
  },
});

module.exports = transporter;
