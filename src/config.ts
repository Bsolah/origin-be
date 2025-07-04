import dotenv from 'dotenv';
dotenv.config();

const config = () => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const MONGODB_URL = process.env.MONGO_URI;
  const PORT = process.env.PORT || '3000';
  
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be provided');
  }
  if (!MONGODB_URL) {
    throw new Error('MONGODB_URL must be provided');
  }
  if (!PORT) {
    throw new Error('PORT must be provided');
  }
  return {
    port: parseInt(PORT),
    jwtSecret: JWT_SECRET,
    mongoDbUrl: MONGODB_URL,
  };
};

export default config;
