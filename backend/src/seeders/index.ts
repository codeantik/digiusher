import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { initializeMongodb } from './initializeMongodb';

dotenv.config();

const initializeDB = async (): Promise<void> => {
  try {
    const mongoUri: string = String(process.env.MONGO_URI);

    await mongoose.connect(mongoUri);
    await initializeMongodb();
    await mongoose.connection.close();

    // add more db
  } catch (error: any) {
    console.error('Error initializeing db:', error.message);
    process.exit(1);
  }
};

initializeDB();
