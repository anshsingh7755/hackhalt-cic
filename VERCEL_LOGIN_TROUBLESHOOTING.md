# Vercel Login Troubleshooting - Complete Fix

## ✅ What Was Fixed Locally

The admin password was corrupted in the database. This has been fixed:
- Password reset to: `HackHalt@2025`
- Username: `admin`
- Test successful on localhost

## 🔴 Why Login Fails on Vercel

The most common reasons are:

1. **MongoDB IP not whitelisted** - Vercel can't connect to MongoDB Atlas
2. **Missing environment variables** - `MONGODB_URI` not set in Vercel dashboard
3. **Environment variable not redeployed** - Changes require redeploy
4. **Incorrect MONGODB_URI** - Wrong connection string

## ✅ Step-by-Step Vercel Fix

### Step 1: Verify MongoDB Whitelist
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click your cluster → **Network Access** (left menu)
3. **DO ONE OF THESE:**
   - **Option A (Quick but less secure):** Click **ALLOW ACCESS FROM ANYWHERE**
   - **Option B (Recommended):** Find your Vercel server IP and add it
     - Go to Vercel Dashboard → Your project → Deployments
     - Click latest → **Runtime Logs** 
     - Search for MongoDB connection attempts to find your IP
     - Add that IP to MongoDB Network Access whitelist

### Step 2: Set Environment Variables in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your project → **Settings** → **Environment Variables**
3. Add/verify these variables:

```
MONGODB_URI = mongodb+srv://enquiry_db_user:Hackhalt%402025@hackhalt-database.xpfavoj.mongodb.net/?appName=hackhalt-database
JWT_SECRET = hackhalt_secret_key_2026
NODE_ENV = production
```

**CRITICAL:** Click **Save** after each variable

### Step 3: Redeploy on Vercel
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **3-dot menu** → **Redeploy**
4. Wait for it to show **Ready** status (usually 2-5 min)

### Step 4: Clear Browser Cache
Before testing login:
- Press **Ctrl + Shift + Delete** (Windows) or **Cmd + Shift + Delete** (Mac)
- Clear cache for "All time"
- Close browser completely
- Reopen and try login again

### Step 5: Test Login
1. Go to your Vercel URL: `https://your-vercel-project.vercel.app/admin-login`
2. Enter credentials:
   - Username: `admin`
   - Password: `HackHalt@2025`
3. Click **Sign In**

## 🐛 If Login Still Fails

### Check Browser Console (F12)
1. Press **F12** to open DevTools
2. Go to **Console** tab
3. Try login and look for error messages
4. Copy the exact error and show it to me

### Check Network Tab (F12)
1. Press **F12** → **Network** tab
2. Try login
3. Look for request to `/api/admin/login`
4. Click it and check the response
5. You'll see the exact error from server

### Check Vercel Logs
1. Go to **Vercel Dashboard** → Your Project → **Deployments**
2. Click latest deployment
3. Click **Runtime Logs** button
4. Look for MongoDB connection errors
5. Check for the login request logs

## 📋 Common Error Messages & Solutions

### Error: "Failed to load resource: 500"
**Cause:** Server error (usually MongoDB connection)
**Fix:** 
- Verify MONGODB_URI is set in Vercel environment variables
- Check MongoDB whitelist includes Vercel IP

### Error: "Invalid credentials"
**Cause:** Password is still wrong or admin user doesn't exist
**Fix:**
- Go back to local machine
- Run: `node verify-and-fix-admin.js`
- Redeploy to Vercel
- Clear browser cache and try again

### Error: "MONGODB_URI is not defined"
**Cause:** Environment variable not set
**Fix:**
- Go to Vercel Settings → Environment Variables
- Add MONGODB_URI with correct value
- Redeploy

### Error: "connection timeout"
**Cause:** MongoDB IP not whitelisted
**Fix:**
- Go to MongoDB Atlas → Network Access
- Allow access from `0.0.0.0/0` (all IPs)
- Wait 1-2 minutes for change to apply

## 🔍 Debug Checklist

- [ ] MONGODB_URI set in Vercel environment variables
- [ ] JWT_SECRET set in Vercel environment variables  
- [ ] NODE_ENV set to "production" in Vercel
- [ ] MongoDB IP whitelisted (0.0.0.0/0 or Vercel IP)
- [ ] Project redeployed after setting variables
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Tested with correct username: `admin`
- [ ] Tested with correct password: `HackHalt@2025`
- [ ] Checked Vercel runtime logs for errors
- [ ] Checked browser console (F12) for errors

## ✅ Success Indicators

When login works, you should see:
1. Green "Login successful! Redirecting..." message
2. Redirected to `/blog-admin` page
3. Admin dashboard loads with sidebar

## 🆘 Still Need Help?

Provide:
1. Screenshot of browser console error (F12 → Console)
2. Screenshot of network request response (F12 → Network → /api/admin/login)
3. Your Vercel project URL
4. Screenshot of Vercel environment variables (hide sensitive values)

Then I can give you the exact fix!
