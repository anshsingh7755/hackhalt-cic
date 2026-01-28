# 🚀 Hostinger Deployment - Complete Guide

## Check Your Hosting Type First

1. Go to Hostinger dashboard → **Hosting Plan**
2. Look for:
   - ✅ **VPS / Cloud Hosting** → Can run Node.js (Recommended)
   - ✅ **Premium/Business Shared Hosting** → Limited Node.js support
   - ❌ **Starter Shared Hosting** → May not support Node.js

---

## Option 1: VPS/Cloud Hosting (Recommended)

### Step 1: Connect via SSH
1. Go to Hostinger → **Hosting Plan** → **Manage**
2. Find **SSH Access** credentials
3. On your local machine, open terminal:
```bash
ssh username@your-server-ip
```

### Step 2: Install Node.js on Server
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs npm
node --version
npm --version
```

### Step 3: Clone Your Repository
```bash
cd /home/username/public_html
git clone https://github.com/anshsingh7755/hackhalt-cic.git
cd hackhalt-cic
npm install
```

### Step 4: Create `.env` File on Server
```bash
nano .env
```

Paste this (update MongoDB URI):
```
MONGODB_URI=mongodb+srv://enquiry_db_user:Hackhalt%402025@hackhalt-database.xpfavoj.mongodb.net/?appName=hackhalt-database
JWT_SECRET=hackhalt_jwt_secret_key_2026_secure_production
NODE_ENV=production
PORT=3000
```

Press: **Ctrl+X** → **Y** → **Enter**

### Step 5: Set Up PM2 (Keep Server Running)
```bash
sudo npm install -g pm2
pm2 start server.js --name "hackhalt-api"
pm2 startup
pm2 save
```

### Step 6: Configure Reverse Proxy (Nginx)
```bash
sudo nano /etc/nginx/sites-available/default
```

Find `server {` block and replace `location / {` with:
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

Save: **Ctrl+X** → **Y** → **Enter**

### Step 7: Test & Start
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Step 8: Set Up SSL (Free with Hostinger)
1. Go to Hostinger dashboard → **Security** → **SSL/TLS Certificate**
2. Install (usually automatic with Let's Encrypt)

---

## Option 2: Shared Hosting (If VPS Not Available)

### Step 1: Upload via Git/SFTP
1. Go to Hostinger → **Website** → **File Manager**
2. Or use SFTP (FileZilla):
   - Host: ftp.hackhalt.org
   - Username: your-hosting-user
   - Password: your-password
   - Port: 22 (SSH) or 21 (FTP)

### Step 2: Use Hostinger's Built-in App Manager
If available:
1. Go to **Website** → **App Manager** or **Node.js Manager**
2. Create new app:
   - Name: hackhalt-api
   - Port: 3000
   - Root: `/home/username/public_html/hackhalt-cic`
   - Startup File: `server.js`

### Step 3: Add Environment Variables
In App Manager, add:
- `MONGODB_URI` = your-connection-string
- `JWT_SECRET` = hackhalt_jwt_secret_key_2026_secure_production
- `NODE_ENV` = production

### Step 4: Test
Go to: `https://hackhalt.org`

---

## Option 3: Simple SFTP Upload (Easiest)

If Node.js isn't supported, use **PM2 Standalone** or deploy frontend only.

### Step 1: Download FileZilla
https://filezilla-project.org/

### Step 2: Connect to Hostinger
- Host: `ftp.hackhalt.org`
- Username: `your-username`
- Password: `your-password`
- Port: `21` (FTP) or `22` (SSH)

### Step 3: Upload Files
Navigate to `/public_html` and upload your entire `hackhalt-cic` folder

### Step 4: Install Dependencies
Via Hostinger SSH:
```bash
cd /home/username/public_html/hackhalt-cic
npm install
```

---

## 📋 Configure Domain (All Options)

1. Go to **Domains** in Hostinger
2. Click **hackhalt.org** → **DNS**
3. Add/Update A record:
   - **Name:** @ (or www)
   - **Type:** A
   - **Value:** Your server IP
   - **TTL:** 3600

4. Go to **SSL/TLS Certificate**
5. Install free SSL (Let's Encrypt)

---

## 🧪 Test After Deployment

### Check 1: Site Loads
```
https://hackhalt.org/
```

### Check 2: Login Works
```
https://hackhalt.org/admin-login
Username: admin
Password: HackHalt@2025
```

### Check 3: API Responds
```bash
curl https://hackhalt.org/api/admin/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"HackHalt@2025"}'
```

Should return JSON with token.

---

## ⚠️ Troubleshooting

| Issue | Fix |
|-------|-----|
| Node.js not found | Install Node.js via SSH |
| Port 3000 in use | Kill: `lsof -ti:3000 \| xargs kill -9` |
| MongoDB connection fails | Check whitelist at mongodb.com |
| SSL not working | Wait 24hrs or re-install certificate |
| App keeps crashing | Run `pm2 logs` to see errors |

---

## 📝 Which Option to Choose?

- **VPS/Cloud** → ✅ Best performance, full control
- **Shared with App Manager** → ✅ Easier, decent performance
- **Shared Basic** → ❌ May not support Node.js

---

## Next Steps

1. **Check your hosting type** in Hostinger dashboard
2. **Choose the option** that matches your plan
3. **Follow the steps** for that option
4. **Test** the login at your domain

---

## Need More Help?

Let me know:
1. What type of hosting plan you have?
2. Does Hostinger show **App Manager** or **Node.js Manager**?
3. Can you access **SSH**?

Then I'll give you exact commands! 

