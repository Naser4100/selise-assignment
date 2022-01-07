import config from 'config';
import app from './app';

// Import database configuration
import connectDB from './utils/connectDB';

// Application port
const PORT = config.get<number>('port');

// Starting server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
