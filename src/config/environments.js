import "dotenv/config";
export const env = {
  MONGODB_URL: process.env.MONGODB_URL,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  BUILD_MODE: process.env.BUILD_MODE,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER,
  FIREBASE_TYPE: process.env.FIREBASE_TYPE,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
  FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
  FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
  FIREBASE_AUTH_PROVIDER_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  FIREBASE_CLIENT_CERT_URL: process.env.FIREBASE_CLIENT_CERT_URL,
  FIREBASE_UNIVERSE_DOMAIN: process.env.FIREBASE_UNIVERSE_DOMAIN,
  FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
  FIREBASE_CREDENTIALS: process.env.FIREBASE_CREDENTIALS,
};
