# MongoDB Atlas Connection Troubleshooting

## Current Status
✅ Connection string has been updated to your MongoDB Atlas cluster  
❌ DNS resolution failing: `querySrv ENOTFOUND _mongodb._tcp.hackhalt-cic-database.jmzgti8.mongodb.net`

## Common Causes & Solutions

### 1. **IP Whitelist Issue** ⚠️ MOST LIKELY
MongoDB Atlas requires your IP address to be whitelisted.

**Fix:**
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Login to your account
3. Click on your **hackhalt-cic-database** cluster
4. Go to **Network Access** (left sidebar)
5. Click **+ ADD IP ADDRESS**
6. Choose one of:
   - **Add Current IP Address** (auto-detects your IP)
   - **Allow access from anywhere** (0.0.0.0/0) - Less secure but quick fix
7. Click **Confirm**
8. Wait 1-2 minutes for changes to propagate

### 2. **Connection String Format**
Your connection string is: 
```
mongodb+srv://himanshusingh4884_db_user:Hackhalt12203@hackhalt-cic-database.jmzgti8.mongodb.net/?appName=hackhalt-cic-database
```

**Verify:**
- ✅ Format: `mongodb+srv://username:password@host/...`
- ✅ Username: `himanshusingh4884_db_user`
- ✅ Password: `Hackhalt12203` (no special encoding needed)
- ✅ Host: `hackhalt-cic-database.jmzgti8.mongodb.net`

### 3. **Network/Firewall on Your Computer**
Your firewall might be blocking outbound MongoDB connections.

**Fix:**
1. Check Windows Defender Firewall:
   - Settings > Privacy & Security > Windows Defender Firewall
   - Ensure Node.js or connections to MongoDB are allowed
2. Check if antivirus is blocking connections
3. Try connecting from a different network (if possible)

### 4. **DNS Resolution Issue**
Try testing DNS resolution:

```powershell
# Test DNS resolution
nslookup _mongodb._tcp.hackhalt-cic-database.jmzgti8.mongodb.net

# Or try with regular hostname
nslookup hackhalt-cic-database.jmzgti8.mongodb.net
```

If these fail, your system can't reach MongoDB Atlas servers.

## Next Steps

### Step 1: Whitelist Your IP (RECOMMENDED FIRST STEP)
1. Get your current IP: Visit [whatismyipaddress.com](https://www.whatismyipaddress.com/)
2. Or use MongoDB's "Add Current IP Address" feature
3. Wait 1-2 minutes for MongoDB to apply changes

### Step 2: Restart Server
```bash
taskkill /F /IM node.exe
npm start
```

### Step 3: Create Admin User (if connected)
```bash
node create-admin.js
```

## If Still Not Working

### Option A: Use Public IP Whitelist (Quick)
In MongoDB Atlas > Network Access:
1. Click **EDIT** on any existing IP
2. Change to `0.0.0.0/0` (allows all IPs)
3. Confirm
4. Test again

**Note:** This is less secure but good for development. For production, use specific IPs.

### Option B: Check MongoDB Status
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Click your cluster
3. Check if cluster is running/available
4. Check if database exists

### Option C: Reinstall MongoDB Driver
```bash
npm install mongoose --save
```

## Success Indicator
Once connected, you should see:
```
✅ Connected to MongoDB
✅ Admin user created successfully!
```

Instead of:
```
❌ MongoDB Connection Error: querySrv ENOTFOUND...
```

## Your Current Configuration

**File**: `.env`
```
MONGODB_URI=mongodb+srv://himanshusingh4884_db_user:Hackhalt12203@hackhalt-cic-database.jmzgti8.mongodb.net/?appName=hackhalt-cic-database
```

**Status**: ✅ Saved correctly, awaiting MongoDB Atlas network access configuration

---

**Next Action**: Check MongoDB Atlas IP whitelist settings and ensure your IP is allowed.
