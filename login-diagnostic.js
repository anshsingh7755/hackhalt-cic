// Comprehensive login diagnostic script
// Usage: node login-diagnostic.js

require('dotenv').config();
const mongoose = require('mongoose');

async function runDiagnostics() {
  console.log('\n' + '='.repeat(60));
  console.log('🔍 LOGIN ISSUE DIAGNOSTIC');
  console.log('='.repeat(60) + '\n');

  // Check 1: Environment Variables
  console.log('1️⃣  ENVIRONMENT VARIABLES CHECK');
  console.log('-'.repeat(60));
  
  const mongoUri = process.env.MONGODB_URI;
  const jwtSecret = process.env.JWT_SECRET;
  const nodeEnv = process.env.NODE_ENV;

  console.log(`MONGODB_URI: ${mongoUri ? '✅ Set' : '❌ MISSING'}`);
  if (mongoUri) console.log(`             (${mongoUri.substring(0, 50)}...)`);
  
  console.log(`JWT_SECRET:  ${jwtSecret ? '✅ Set' : '❌ MISSING'}`);
  if (jwtSecret) console.log(`             (${jwtSecret.substring(0, 30)}...)`);
  
  console.log(`NODE_ENV:    ${nodeEnv ? `✅ ${nodeEnv}` : '❌ MISSING'}`);

  if (!mongoUri) {
    console.error('\n❌ MONGODB_URI is not set! Cannot proceed.');
    process.exit(1);
  }

  // Check 2: MongoDB Connection
  console.log('\n\n2️⃣  MONGODB CONNECTION CHECK');
  console.log('-'.repeat(60));

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error(`   Error: ${error.message}`);
    console.error('\n   Fix: Check MongoDB URI and IP whitelist at https://cloud.mongodb.com/');
    process.exit(1);
  }

  // Check 3: Admin User in Database
  console.log('\n\n3️⃣  ADMIN USER CHECK');
  console.log('-'.repeat(60));

  try {
    const Admin = require('./models/Admin');
    const admin = await Admin.findOne({ username: 'admin' }).select('+password');

    if (!admin) {
      console.error('❌ Admin user NOT FOUND in database');
      console.error('\n   Fix: Run this command:');
      console.error('   node force-create-admin.js\n');
      
      // List all admins if any exist
      const allAdmins = await Admin.find().select('username email');
      if (allAdmins.length > 0) {
        console.log('   Existing users in database:');
        allAdmins.forEach(a => console.log(`   - ${a.username} (${a.email})`));
      } else {
        console.log('   No admin users exist in database at all.');
      }
      process.exit(1);
    }

    console.log('✅ Admin user found');
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Active: ${admin.isActive}`);
    console.log(`   Password hash: ${admin.password.substring(0, 30)}...`);

    // Check 4: Password Verification
    console.log('\n\n4️⃣  PASSWORD VERIFICATION');
    console.log('-'.repeat(60));

    const testPassword = 'HackHalt@2025';
    
    try {
      const passwordMatch = await admin.comparePassword(testPassword);
      
      if (passwordMatch) {
        console.log(`✅ Password "${testPassword}" is CORRECT`);
        console.log('\n   ✨ Everything looks good! The issue might be:');
        console.log('      1. Frontend not sending request correctly');
        console.log('      2. CORS headers blocking the request');
        console.log('      3. Vercel environment variables not set');
        console.log('      4. Browser cache issue');
      } else {
        console.error(`❌ Password "${testPassword}" does NOT match`);
        console.error('\n   Fix: Recreate admin user:');
        console.error('   node force-create-admin.js\n');
      }
    } catch (error) {
      console.error('❌ Password verification failed with error:');
      console.error(`   ${error.message}`);
    }

    // Check 5: JWT Secret
    console.log('\n\n5️⃣  JWT CONFIGURATION');
    console.log('-'.repeat(60));
    
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    
    try {
      const token = jwt.sign(
        { 
          id: admin._id, 
          username: admin.username,
          email: admin.email,
          role: admin.role 
        },
        process.env.JWT_SECRET || 'hackhalt_secret_key_2026',
        { expiresIn: '7d' }
      );
      console.log('✅ JWT token generation works');
      console.log(`   Token: ${token.substring(0, 50)}...`);
      
      // Verify we can decode it
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hackhalt_secret_key_2026');
      console.log('✅ JWT token verification works');
      console.log(`   Decoded: ${JSON.stringify(decoded)}`);
    } catch (error) {
      console.error('❌ JWT error:');
      console.error(`   ${error.message}`);
    }

  } catch (error) {
    console.error('❌ Unexpected error:');
    console.error(error.message);
  }

  console.log('\n' + '='.repeat(60));
  console.log('📋 SUMMARY');
  console.log('='.repeat(60));
  console.log('If all checks passed (✅), the issue is likely:');
  console.log('- Frontend sending wrong data format');
  console.log('- CORS configuration issue');
  console.log('- Vercel not using updated environment variables');
  console.log('\nIf on Vercel: Try redeploying or clearing cache\n');

  process.exit(0);
}

runDiagnostics().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
