import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI: string = String(process.env.MONGO_URI);

console.log('MONGO_URI', MONGO_URI);

const mongodbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Mongodb Atlas connected');
  } catch (error) {
    console.error('Error while connecting to Mongodb Atlas', error);
    process.exit(1);
  }
};

export default mongodbConnect;
