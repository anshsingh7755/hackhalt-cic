const mongoose = require('mongoose');

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in .env file. Please add your MongoDB Atlas connection string.');
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('\n📌 To fix this:');
    console.error('1. Go to https://www.mongodb.com/cloud/atlas (create free account if needed)');
    console.error('2. Create a new project and cluster');
    console.error('3. Get your connection string from "Connect" button');
    console.error('4. Update MONGODB_URI in .env file with your connection string');
    console.error('5. Replace <password> and database name in the URI');
    console.error('6. Restart the server\n');
    
    // Don't exit process, allow app to run with warning
    console.warn('⚠️  Server running without database. Form submissions will not be saved.');
  }
};

module.exports = connectDB;
