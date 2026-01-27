// Update admin password
// Usage: node update-admin-password.js

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || '';
const NEW_PASSWORD = 'Hackhalt@2025'; // Change this to your desired password

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI environment variable is not set');
  console.log('Please add your MongoDB connection string to the .env file');
  process.exit(1);
}

async function updateAdminPassword() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find admin user
    const admin = await Admin.findOne({ username: 'admin' });
    if (!admin) {
      console.error('❌ Admin user not found');
      await mongoose.disconnect();
      process.exit(1);
    }

    // Update password (will be hashed by the model's pre-save hook)
    admin.password = NEW_PASSWORD;
    await admin.save();

    console.log('✅ Admin password updated successfully!');
    console.log('');
    console.log('📋 Updated Admin Credentials:');
    console.log('Username: admin');
    console.log(`Password: ${NEW_PASSWORD}`);
    console.log('');
    console.log('🔗 Login at: http://localhost:5000/admin-login');
    console.log('');

    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error updating password:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

updateAdminPassword();
