import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.REACT_APP_EMAIL_HOST,
  port: process.env.REACT_APP_EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.REACT_APP_EMAIL_USER,
    pass: process.env.REACT_APP_EMAIL_PASS
  }
});

export default transporter;
