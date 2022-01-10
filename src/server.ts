import config from 'config';
import app from './app';

import dotenv from 'dotenv';
dotenv.config();

// Import database configuration
import connectDB from './utils/connectDB';

// Application port
const PORT = process.env.PORT || 4500;

console.log(process.env.PORT);

// Starting server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
