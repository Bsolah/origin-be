import dotenv from 'dotenv';
dotenv.config();

const config = () => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const MONGODB_URL = process.env.MONGO_URI;
  const PORT = process.env.PORT || '3000';
  const ANCHOR_BASE_URL = process.env.ANCHOR_BASE_URL;
  const ANCHOR_API_KEY = process.env.ANCHOR_API_KEY;

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be provided');
  }
  if (!MONGODB_URL) {
    throw new Error('MONGODB_URL must be provided');
  }
  if (!PORT) {
    throw new Error('PORT must be provided');
  }
  if (!ANCHOR_BASE_URL) {
    throw new Error('ANCHOR_BASE_URL must be provided');
  }
  if (!ANCHOR_API_KEY) {
    throw new Error('ANCHOR_API_KEY must be provided');
  }
  return {
    port: parseInt(PORT),
    jwtSecret: JWT_SECRET,
    mongoDbUrl: MONGODB_URL,
    anchorBaseUrl: ANCHOR_BASE_URL,
    anchorApiKey: ANCHOR_API_KEY,
  };
};

export default config;
