# Vercel Deployment - Admin Login Fix

## Issue
Login is failing on Vercel because:
1. Environment variables are not set in Vercel dashboard
2. MongoDB connection string is missing
3. CORS headers might be blocking requests

## Solution Steps

### 1. **Add Environment Variables in Vercel Dashboard**

Go to: `https://vercel.com/dashboard` → Your Project → Settings → Environment Variables

Add these variables:

```
MONGODB_URI = mongodb+srv://enquiry_db_user:Hackhalt%402025@hackhalt-database.xpfavoj.mongodb.net/?appName=hackhalt-database
JWT_SECRET = your-secret-key-here
NODE_ENV = production
```

### 2. **Verify MongoDB IP Whitelist**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to your cluster
3. Go to **Network Access** (left sidebar)
4. Check if your Vercel IP is whitelisted
   - Find your Vercel deployment IP from logs or add `0.0.0.0/0` (allows all IPs - less secure but works for testing)

### 3. **Redeploy on Vercel**

After adding environment variables:
1. Click the **Redeploy** button in Vercel dashboard
2. Wait for deployment to complete
3. Test login at `https://your-vercel-url.vercel.app/admin-login`

### 4. **Check Browser Console for Errors**

If login still fails:
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try login and look for failed requests
4. Check the **Console** tab for JavaScript errors
5. Look at API response in the failed `/api/admin/login` request

### 5. **Vercel Logs**

Check deployment logs:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Click **Runtime Logs** to see server errors

## Common Issues & Fixes

### Issue: "Cannot find module" errors
- **Fix**: Ensure all files are pushed to GitHub before deploying

### Issue: MongoDB connection timeout
- **Fix**: Whitelist Vercel's IP in MongoDB Atlas Network Access
- **Or**: Allow connections from anywhere (`0.0.0.0/0`)

### Issue: API returns 404
- **Fix**: The `vercel.json` file has been created to handle routing

### Issue: CORS errors
- **Fix**: The server now has proper CORS configuration for Vercel

## Testing the API Directly

Open your browser console and run:

```javascript
fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    username: 'admin',
    password: 'your-password' 
  })
})
.then(r => r.json())
.then(console.log)
```

This will show you the exact error response.

## Contact Support

If you still face issues:
1. Check Vercel runtime logs for MongoDB connection errors
2. Verify MongoDB credentials are correct in MONGODB_URI
3. Ensure all environment variables are set (case-sensitive)
4. Try redeploying after making changes
