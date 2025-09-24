// import mongoose from 'mongoose';
// import { MONGODB_URI } from './env.js';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(MONGODB_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;



// import mongoose from 'mongoose';
// import { MONGODB_URI } from './env.js';

// const connectDB = async () => {
//   try {
//     if (!MONGODB_URI) {
//       console.error('❌ MONGODB_URI is not defined. Check your .env file');
//       throw new Error('MongoDB connection string is required');
//     }

//     const conn = await mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // 5 second timeout
//       socketTimeoutMS: 45000, // 45 second socket timeout
//     });

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
//     // Add event listeners for better debugging
//     mongoose.connection.on('error', (err) => {
//       console.error('❌ MongoDB connection error:', err);
//     });

//     mongoose.connection.on('disconnected', () => {
//       console.log('⚠️ MongoDB disconnected');
//     });

//     mongoose.connection.on('reconnected', () => {
//       console.log('✅ MongoDB reconnected');
//     });

//     return conn;
//   } catch (error) {
//     console.error('❌ Error connecting to MongoDB:', error.message);
    
//     // Provide helpful error messages
//     if (error.name === 'MongoNetworkError') {
//       console.log('\n💡 MongoDB is not running. Please start it with:');
//       console.log('   macOS: brew services start mongodb-community');
//       console.log('   Ubuntu: sudo systemctl start mongodb');
//       console.log('   Windows: net start MongoDB');
//       console.log('   Or use: mongod --dbpath /usr/local/var/mongodb');
//     } else if (error.name === 'MongooseServerSelectionError') {
//       console.log('\n💡 Cannot connect to MongoDB. Check if:');
//       console.log('   1. MongoDB is running');
//       console.log('   2. The connection string is correct');
//       console.log('   3. Your firewall allows connections to port 27017');
//     }
    
//     // Don't crash the app immediately, allow it to start with degraded functionality
//     console.log('⚠️  Application will continue with limited functionality');
//     return null;
//   }
// };

// // Helper function to check connection status
// const checkDBConnection = () => {
//   return mongoose.connection.readyState === 1; // 1 = connected
// };

// export default connectDB;
// export { checkDBConnection }; // Add this line to export the function


import mongoose from 'mongoose';
import { MONGODB_URI } from './env.js';

const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined. Check your .env file');
      throw new Error('MongoDB connection string is required');
    }

    // Simplest connection - mongoose handles everything automatically
    const conn = await mongoose.connect(MONGODB_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    console.log('⚠️  Application will continue with limited functionality');
    return null;
  }
};

// Helper function to check connection status
const checkDBConnection = () => {
  return mongoose.connection.readyState === 1;
};

export default connectDB;
export { checkDBConnection };