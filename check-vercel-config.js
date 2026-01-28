// Quick Vercel Diagnostic - Check what's failing
// Run locally with: node check-vercel-config.js

require('dotenv').config();

console.log('🔍 VERCEL CONFIGURATION DIAGNOSTIC\n');
console.log('=' .repeat(50));

// 1. Check environment variables
console.log('\n📋 ENVIRONMENT VARIABLES:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ SET' : '❌ NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ SET' : '❌ NOT SET');

// 2. Check if MONGODB_URI is valid
if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI;
  const hasPassword = uri.includes(':');
  const hasCluster = uri.includes('@');
  const hasProtocol = uri.includes('mongodb+srv://');
  
  console.log('\n🔐 MONGODB_URI VALIDATION:');
  console.log('Has protocol (mongodb+srv://):', hasProtocol ? '✅' : '❌');
  console.log('Has credentials (username:password):', hasPassword ? '✅' : '❌');
  console.log('Has cluster (@):', hasCluster ? '✅' : '❌');
  
  if (hasProtocol && hasPassword && hasCluster) {
    console.log('Overall:', '✅ URI looks valid');
  } else {
    console.log('Overall:', '❌ URI format issue detected');
  }
}

// 3. Test MongoDB connection
console.log('\n🧪 TESTING MONGODB CONNECTION...');
const mongoose = require('mongoose');

async function testConnection() {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not set - cannot test');
      return;
    }

    console.log('⏳ Attempting connection...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      family: 4
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('   Host:', conn.connection.host);
    console.log('   Database:', conn.connection.name);
    
    // Test Admin collection
    const Admin = require('./models/Admin');
    const adminCount = await Admin.countDocuments();
    console.log('   Admin users found:', adminCount);
    
    await mongoose.disconnect();
  } catch (error) {
    console.log('❌ MongoDB connection failed');
    console.log('   Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('   Fix: Check MongoDB Atlas Network Access whitelist');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('   Fix: Check cluster URL in MONGODB_URI');
    } else if (error.message.includes('authentication failed')) {
      console.log('   Fix: Check username/password in MONGODB_URI');
    }
  }
}

testConnection();

// 4. Check Vercel deployment detection
console.log('\n🚀 VERCEL DEPLOYMENT DETECTION:');
console.log('VERCEL:', process.env.VERCEL ? '✅ Running on Vercel' : '❌ Not running on Vercel');
console.log('VERCEL_URL:', process.env.VERCEL_URL || 'NOT SET');

console.log('\n' + '='.repeat(50));
console.log('NEXT STEPS:');
console.log('1. Verify MONGODB_URI is set in Vercel environment variables');
console.log('2. Whitelist MongoDB IP: https://cloud.mongodb.com/');
console.log('3. Go to Network Access and allow 0.0.0.0/0');
console.log('4. Redeploy on Vercel');
console.log('5. Check Vercel runtime logs for connection errors');
