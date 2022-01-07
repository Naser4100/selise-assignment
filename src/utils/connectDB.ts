import mongoose from 'mongoose';
import config from 'config';

const connectDB = async () => {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    console.info('DB connected');
  } catch (error) {
    console.error('Could not connect to database');
    process.exit(1);
  }
};

export default connectDB;
