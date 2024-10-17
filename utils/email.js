const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "ibad1657@gmail.com",
    pass: "aimk zlpz jihv wprm",
  },
});

module.exports = transporter;
