# Vercel Admin Login Fix - Quick Checklist

## What was changed:
✅ Added `vercel.json` configuration file for proper routing  
✅ Updated `server.js` with CORS headers and Vercel export  
✅ Enhanced `admin-login.html` with better error logging  
✅ Created `VERCEL_LOGIN_FIX.md` guide  

## Next steps (DO THIS NOW):

### Step 1: Push code to GitHub
```powershell
cd C:\Users\singh\OneDrive\Desktop\hackhalt-cic
git add .
git commit -m "Fix Vercel deployment - add vercel.json and CORS support"
git push origin main
```

### Step 2: Set Environment Variables in Vercel

1. Go to: **https://vercel.com/dashboard**
2. Click on your project (hackhalt-cic)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New** and add these:

| Name | Value |
|------|-------|
| `MONGODB_URI` | `mongodb+srv://enquiry_db_user:Hackhalt%402025@hackhalt-database.xpfavoj.mongodb.net/?appName=hackhalt-database` |
| `JWT_SECRET` | `your-secret-key-here` (can be any string) |
| `NODE_ENV` | `production` |

5. Click **Save**

### Step 3: Whitelist Vercel IP in MongoDB

1. Go to: **https://cloud.mongodb.com**
2. Select your cluster
3. Click **Network Access** (left sidebar)
4. Click **ADD IP ADDRESS**
5. Either:
   - Select **ALLOW ACCESS FROM ANYWHERE** (0.0.0.0/0), OR
   - Find your Vercel IP and add it specifically

6. Click **Confirm**

### Step 4: Redeploy on Vercel

1. Go to **Vercel Dashboard** → Your Project
2. Go to **Deployments** tab
3. Click the **3-dot menu** on the latest deployment
4. Click **Redeploy**
5. Wait for it to finish (shows "Ready" status)

### Step 5: Test Login

1. Go to `https://your-vercel-url.vercel.app/admin-login`
2. Try logging in with your admin credentials
3. If it fails:
   - Open DevTools (F12)
   - Go to **Console** tab
   - Look for error messages
   - Check **Network** tab for `/api/admin/login` request
   - See the response status and message

### Step 6: Check Vercel Logs

If login still fails:
1. Go to **Vercel Dashboard** → Your Project
2. Click **Deployments**
3. Click latest deployment
4. Click **Runtime Logs**
5. Look for any error messages about MongoDB connection

## Troubleshooting

**Problem: "Failed to fetch" or network error**
- Check browser console (F12 → Console)
- Verify MongoDB IP is whitelisted
- Check that environment variables are saved in Vercel

**Problem: "Invalid credentials" despite correct password**
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure MONGODB_URI environment variable is correct
- Check that admin user exists in database

**Problem: "MongoDB connection timeout"**
- Go to MongoDB Atlas
- Click **Network Access**
- Whitelist `0.0.0.0/0` (allows all IPs)
- Wait 1-2 minutes for change to apply

## Questions?

If you're stuck on any step, provide:
1. The error message you see
2. Screenshot of the browser DevTools Network tab
3. Your Vercel project URL

Then I can help you fix it!
