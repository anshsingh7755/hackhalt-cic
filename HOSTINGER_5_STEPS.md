# 🚀 HOSTINGER - DEPLOY IN 5 STEPS

## Step 1: Get SSH Credentials (1 min)
- Login to Hostinger Dashboard
- Click **Hosting Plan** → **Manage**
- Find **SSH Access** section
- Note down: Host, Username, Password, Port (22)

## Step 2: Connect via SSH (1 min)
Open PowerShell and run:
```powershell
ssh username@your-hostinger-ip
```
Enter your password

## Step 3: Deploy Code (5 mins)
Copy-paste these commands ONE BY ONE:

```bash
cd /home/username/public_html
git clone https://github.com/anshsingh7755/hackhalt-cic.git
cd hackhalt-cic
npm install
```

## Step 4: Setup Environment (2 mins)

```bash
nano .env
```

Paste this exactly:
```
MONGODB_URI=mongodb+srv://enquiry_db_user:Hackhalt%402025@hackhalt-database.xpfavoj.mongodb.net/?appName=hackhalt-database
JWT_SECRET=hackhalt_jwt_secret_key_2026_secure_production
NODE_ENV=production
PORT=3000
```

Save: `Ctrl+X` → `Y` → `Enter`

## Step 5: Start Server (3 mins)

```bash
sudo npm install -g pm2
pm2 start server.js --name "hackhalt"
pm2 startup
pm2 save
sudo systemctl restart nginx
```

## 🎉 DONE!

Your site is now live at: **https://hackhalt.org**

---

## ✅ Verify It Works

1. Open browser
2. Go to: `https://hackhalt.org/admin-login`
3. Login with:
   - Username: `admin`
   - Password: `HackHalt@2025`
4. Should say "Login successful!" ✅

---

## 📚 Full Guides Available

- **HOSTINGER_QUICK_SETUP.md** - Detailed step-by-step
- **HOSTINGER_COMMANDS.md** - All commands reference
- **HOSTINGER_SETUP.md** - Multiple options & troubleshooting

---

## ⚠️ If Something Goes Wrong

Check logs:
```bash
pm2 logs hackhalt
```

See what error appears and search Google or come back to ask!

