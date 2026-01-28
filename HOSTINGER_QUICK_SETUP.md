# ✅ HOSTINGER DEPLOYMENT - QUICK START

## 🎯 Most Common Setup (99% of users)

If you have **Premium/Business Plan** on Hostinger:

### Step 1: Find Your Hosting Credentials (2 mins)
1. Go to **Hostinger Dashboard**
2. Click **Hosting Plan** → **Manage**
3. Find and note down:
   - SSH Host: `xxx.xxx.xxx.xxx` or `username.hostinger.com`
   - SSH Username: `username`
   - SSH Password: `password`
   - SSH Port: `22`

### Step 2: Connect via SSH (Windows)

**Option A: Using PowerShell (Easiest)**
```powershell
ssh username@hostinger-ip
# Enter password when prompted
```

**Option B: Using PuTTY**
- Download: https://www.putty.org/
- Host: your-ip
- Port: 22
- Username: your-username
- Password: your-password

### Step 3: Deploy Your App (5 mins)

Copy and paste this command block (one at a time):

```bash
# Navigate to public HTML
cd /home/username/public_html

# Clone your project
git clone https://github.com/anshsingh7755/hackhalt-cic.git

# Enter project folder
cd hackhalt-cic

# Install dependencies
npm install
```

### Step 4: Create Environment File (2 mins)

```bash
nano .env
```

Copy this exactly:
```
MONGODB_URI=mongodb+srv://enquiry_db_user:Hackhalt%402025@hackhalt-database.xpfavoj.mongodb.net/?appName=hackhalt-database
JWT_SECRET=hackhalt_jwt_secret_key_2026_secure_production
NODE_ENV=production
PORT=3000
```

Press: `Ctrl+X` then `Y` then `Enter`

### Step 5: Start Server with PM2 (2 mins)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start your app
pm2 start server.js --name "hackhalt"

# Make it start on boot
pm2 startup
pm2 save
```

### Step 6: Setup Nginx Reverse Proxy (3 mins)

```bash
# Edit Nginx config
sudo nano /etc/nginx/sites-enabled/default
```

Find the line `location / {` and replace it with:
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_redirect off;
}
```

Press: `Ctrl+X` then `Y` then `Enter`

```bash
# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 7: Enable SSL (1 min)

```bash
# Install Certbot if not installed
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d hackhalt.org -d www.hackhalt.org
```

Follow prompts and select:
- Enter email
- Agree to terms (Y)
- Share email (N)
- Redirect to HTTPS (2)

### Step 8: Test Your Site

1. Open browser
2. Go to: `https://hackhalt.org`
3. Go to: `https://hackhalt.org/admin-login`
4. Login with:
   - Username: `admin`
   - Password: `HackHalt@2025`

**Should work now! ✅**

---

## 🔍 Check If It's Running

```bash
# See all running apps
pm2 list

# See logs
pm2 logs hackhalt

# Check if port 3000 is listening
netstat -tuln | grep 3000
```

---

## ⚠️ Troubleshooting

### App not starting?
```bash
pm2 logs hackhalt
```
Look for error messages

### Port 3000 already in use?
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

### MongoDB connection error?
Check:
1. MONGODB_URI is correct in `.env`
2. MongoDB whitelist includes your Hostinger IP
3. Go to https://cloud.mongodb.com/ → Network Access

### SSL certificate error?
```bash
sudo certbot renew --dry-run
sudo systemctl restart nginx
```

### Site shows old version?
```bash
cd /home/username/public_html/hackhalt-cic
git pull
npm install
pm2 restart hackhalt
```

---

## 📋 Verification Checklist

Before considering it done:
- [ ] SSH connection works
- [ ] App deployed to `/home/username/public_html/hackhalt-cic`
- [ ] `.env` file created with correct values
- [ ] PM2 running (shows in `pm2 list`)
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed
- [ ] Domain resolves to your IP
- [ ] `https://hackhalt.org` loads without errors
- [ ] Login works with admin/HackHalt@2025
- [ ] Browser DevTools shows no 401 errors

---

## 🚀 Done!

Your app is now running on Hostinger! 

**Access it at:** https://hackhalt.org

---

## Future Updates

To update your code:
```bash
cd /home/username/public_html/hackhalt-cic
git pull
npm install
pm2 restart hackhalt
```

