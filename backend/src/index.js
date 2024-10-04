import { connectDB } from './DB/index.js';
import app from './app.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { initializeEmailResources } from './controller/Promotional.controller.js';

let transporter;
const OAuth2 = google.auth.OAuth2;

const createOAuth2Client = () => {
  return new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );
};

const getAccessToken = async (oauth2Client) => {
  try {
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });
    const { token } = await oauth2Client.getAccessToken();
    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to get access token');
  }
};

const createTransporter = async () => {
  try {
    const oauth2Client = createOAuth2Client();
    const accessToken = await getAccessToken(oauth2Client);

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    // Verify the transporter
    await transport.verify();
    console.log('Mail transporter created and verified successfully');
    return transport;
  } catch (error) {
    console.error('Error creating mail transporter:', error);
    throw error;
  }
};

export const initializeTransporter = async () => {
  try {
    if (!transporter) {
      transporter = await createTransporter();
    }
  } catch (error) {
    console.error('Error initializing transporter:', error);
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
  await initializeTransporter();
  await initializeEmailResources()
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

connectDB()
  .then(async () => {
    await startServer();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });