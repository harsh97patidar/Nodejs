const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail({ to, subject, text }) {
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: to,
      subject: subject,
      text: text,
    });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error(`Error sending email: ${err}`);
  }
}

sendEmail({
  to: "",
  subject: "testing email service",
  text: "sample text",
}).catch(console.error);
