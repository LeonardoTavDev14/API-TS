import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporterCreated = nodemailer.createTransport({
  service: `${process.env.SERVICE_MAIL}`,
  auth: {
    user: `${process.env.AUTH_USER}`,
    pass: `${process.env.AUTH_PASS}`,
  },
});

export { transporterCreated };
