import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const establishDatabaseConnection = async () => {
  const dbUrl = process.env.MONGO_URI;
  await mongoose.connect(dbUrl!);
  return;
};
export default establishDatabaseConnection;
