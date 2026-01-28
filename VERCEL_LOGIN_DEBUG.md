# Vercel Login "Invalid Credentials" - Debugging Guide

## Quick Diagnosis
The "Invalid credentials" error on Vercel means ONE of these is happening:
1. ❌ Admin user doesn't exist in MongoDB database
2. ❌ MongoDB is not connecting (environment variable missing)
3. ❌ Database is restricting access (IP whitelist)
4. ❌ Password comparison failing

---

## Step 1: Check Vercel Environment Variables

**Action:** Go to `https://vercel.com/dashboard`

1. Click your project
2. Go to **Settings** → **Environment Variables**
3. Verify these are set:
   - `MONGODB_URI` ✓
   - `JWT_SECRET` ✓
   - `NODE_ENV` = `production` ✓

If missing, add them now.

---

## Step 2: Check MongoDB Whitelist

**Action:** Go to `https://cloud.mongodb.com/`

1. Select your cluster
2. Go to **Network Access** (left sidebar)
3. Check for an entry that allows `0.0.0.0/0` or your Vercel IP

**If NOT whitelisted:**
- Click **+ Add IP Address**
- Enter `0.0.0.0/0` (allows all - secure setup after testing)
- Click **Confirm**

---

## Step 3: Force Create Admin User Locally First

Run this command on your LOCAL machine:

```bash
node force-create-admin.js
```

This will:
- Delete corrupted admin user (if exists)
- Create fresh admin user with properly hashed password
- Username: `admin`
- Password: `HackHalt@2025`

---

## Step 4: Verify Locally Before Deploying

Test login at `http://localhost:5000/admin-login`:
- Username: `admin`
- Password: `HackHalt@2025`

Should say "Login successful! Redirecting..."

---

## Step 5: Redeploy to Vercel

Go to Vercel Dashboard:
1. Click your project → **Deployments**
2. Find latest deployment
3. Click **...** menu → **Redeploy**
4. Wait for "Ready" status

---

## Step 6: Test on Vercel

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. Go to `https://your-vercel-domain.vercel.app/admin-login`
3. Try login again

---

## Step 7: Debug If Still Failing

**Open Browser DevTools (F12):**

1. Go to **Console** tab - look for errors
2. Go to **Network** tab
3. Try login
4. Click the `/api/admin/login` POST request
5. Click **Response** tab to see server's response

**Common responses:**
- `"Invalid credentials"` → Admin user not in DB or password wrong
- `"No authorization token provided"` → CORS or request issue
- `MONGODB_URI error` → Environment variable missing

---

## Step 8: Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click latest deployment
3. Scroll to **Function Logs**
4. Look for error messages starting with `❌` or `🔐`

---

## Quick Fixes Summary

| Issue | Fix |
|-------|-----|
| Admin not found in DB | Run `node force-create-admin.js` locally, then redeploy |
| MongoDB connection error | Add `MONGODB_URI` to Vercel environment variables |
| IP blocked by MongoDB | Whitelist `0.0.0.0/0` in MongoDB Network Access |
| Password hash corrupted | Run `node force-create-admin.js` to recreate |
| CORS error | Check origin in server.js CORS config |

---

## Contact Points to Check

- **Vercel URL:** Check your deployment domain in Vercel dashboard
- **MongoDB:** Verify cluster name and connection string format
- **Admin credentials:** Default is `admin` / `HackHalt@2025`

