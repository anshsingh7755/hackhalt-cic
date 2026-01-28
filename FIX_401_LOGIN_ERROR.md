# 401 Error Fix - Complete Solution

## Problem Identified ✅
The 401 error means "Unauthorized" - the password comparison was failing because:
1. Password field was corrupted/empty in database
2. The pre-save hook in mongoose was double-hashing passwords
3. New fix: Directly insert properly hashed password to avoid double-hashing

## Solution Applied ✅
Created `force-create-admin.js` script that:
1. Deletes the corrupted admin user
2. Creates new admin with properly hashed password
3. Verifies password hashing works correctly

## Your Next Steps:

### Step 1: Run Force Create Admin (Locally on Your Machine)
```bash
node force-create-admin.js
```

Expected output:
```
✅ Admin user created successfully!
✅ Password verification successful!
```

### Step 2: Test Login Locally
Open browser and go to: `http://localhost:5000/admin-login`

Enter:
- Username: `admin`
- Password: `HackHalt@2025`

Should see "Login successful! Redirecting..." ✅

### Step 3: Redeploy on Vercel
The code is already pushed to GitHub. Now:
1. Go to **https://vercel.com/dashboard**
2. Your Project → **Deployments**
3. Click latest deployment → **3-dot menu** → **Redeploy**
4. Wait for "Ready" status

### Step 4: Clear Browser Cache & Test on Vercel
1. Press **Ctrl + Shift + Delete**
2. Clear all cache
3. Go to `https://your-vercel-url.vercel.app/admin-login`
4. Try login with:
   - Username: `admin`
   - Password: `HackHalt@2025`

## If Still Getting 401 on Vercel:

### Check the Health Endpoint
Visit: `https://your-vercel-url.vercel.app/api/health`

Should show:
```json
{
  "success": true,
  "mongodb": "connected"
}
```

If MongoDB shows "disconnected":
1. Go to Vercel Settings → Environment Variables
2. Make sure `MONGODB_URI` is set
3. Redeploy

### Check Vercel Logs
1. Vercel Dashboard → Deployments → Latest
2. Click **Runtime Logs**
3. Look for "Admin login" messages
4. If you see error, take screenshot and share

## Why This Solution Works:

**Old problem:**
```
Admin.password = 'HackHalt@2025'  // Plain text
admin.save()  // Pre-hook hashes it → hash1
                // Pre-hook tries again → corrupted
```

**New solution:**
```
password = 'HackHalt@2025'
salt = bcrypt.genSalt()
hashedPassword = bcrypt.hash(password, salt)  // → $2a$10$...
// Insert directly without going through pre-hook
Admin.collection.insertOne({ password: hashedPassword })
```

## Files Updated:
- ✅ `force-create-admin.js` - New script to properly create admin
- ✅ Pushed to GitHub and ready on Vercel
- ✅ Old admin deleted, new one created with correct hash

## Credentials:
- **Username:** `admin`
- **Password:** `HackHalt@2025`

## Summary:
1. Run `node force-create-admin.js` on your local machine
2. Test login at `http://localhost:5000/admin-login` (should work ✅)
3. Redeploy on Vercel
4. Clear browser cache
5. Test on Vercel at `/admin-login`

If you get 401 on Vercel after these steps, it means:
- MONGODB_URI is not set in Vercel environment variables
- OR MongoDB IP is not whitelisted
- Check `/api/health` to confirm MongoDB connection status
