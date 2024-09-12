import { connectDB } from './DB/index.js';
import app from './app.js';
import nodemailer from 'nodemailer';

let transporter;

export const initializeTransporter = async () => {
  try {
    if (!transporter) {
      transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: process.env.NODEMAILER_AUTH_USER,
          pass: process.env.NODEMAILER_AUTH_PASSWORD,
        },
      });
      console.log('Mail transporter created successfully');
    }
  } catch (error) {
    console.error('Error creating mail transporter:', error);
    transporter = null;
  }
};

export const getTransporter = () => {
  if (!transporter) {
    throw new Error('Transporter not initialized');
  }
  return transporter;
};

const startServer = async () => {
  // await initializeTransporter();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

connectDB()
  .then(async () => {
   
    startServer();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit if database connection fails
  });
