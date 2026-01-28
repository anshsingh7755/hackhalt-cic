// Test API login directly
// Usage: node test-vercel-login.js https://your-vercel-domain.vercel.app

const domain = process.argv[2];

if (!domain) {
  console.error('Usage: node test-vercel-login.js <vercel-domain>');
  console.error('Example: node test-vercel-login.js https://hackhalt-cic.vercel.app');
  process.exit(1);
}

async function testLogin() {
  console.log('\n' + '='.repeat(60));
  console.log('🧪 TESTING LOGIN API ON VERCEL');
  console.log('='.repeat(60) + '\n');

  console.log(`📍 Target: ${domain}/api/admin/login\n`);

  try {
    console.log('📤 Sending login request...\n');
    
    const response = await fetch(`${domain}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'HackHalt@2025'
      })
    });

    console.log(`✅ Response received`);
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    console.log(`📋 Headers:`);
    
    const headers = Object.fromEntries(response.headers);
    Object.entries(headers).forEach(([key, value]) => {
      console.log(`    ${key}: ${value.substring(0, 100)}`);
    });

    const data = await response.json();
    console.log(`\n📦 Response Body:`);
    console.log(JSON.stringify(data, null, 2));

    if (response.status === 200) {
      console.log('\n✅ LOGIN SUCCESSFUL!');
      console.log('Token:', data.token.substring(0, 50) + '...');
    } else if (response.status === 401) {
      console.log('\n❌ LOGIN FAILED - 401 Unauthorized');
      console.log('Error:', data.error);
      
      console.log('\n🔍 Possible causes:');
      console.log('1. Admin user not in database on Vercel');
      console.log('2. Environment variables not set in Vercel');
      console.log('3. MongoDB connection failing on Vercel');
      console.log('4. Password hash corrupted on Vercel');
    } else {
      console.log(`\n⚠️  Unexpected status: ${response.status}`);
    }

  } catch (error) {
    console.error('❌ Request failed:', error.message);
    console.log('\n🔍 Possible causes:');
    console.log('1. Vercel URL is incorrect or not accessible');
    console.log('2. CORS is blocking the request');
    console.log('3. Network connectivity issue');
    console.log('4. Vercel deployment is down');
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

testLogin();
