# 📇 HOSTINGER - QUICK REFERENCE CARD

## Copy-Paste Ready Commands

### Initial Setup (Run these in order)

```bash
# 1. Navigate to web root
cd /home/username/public_html

# 2. Clone project
git clone https://github.com/anshsingh7755/hackhalt-cic.git

# 3. Enter project
cd hackhalt-cic

# 4. Install packages
npm install

# 5. Create .env file
nano .env
# Paste the content below and save

# 6. Install PM2 globally
sudo npm install -g pm2

# 7. Start app with PM2
pm2 start server.js --name "hackhalt"

# 8. Auto-start on reboot
pm2 startup
pm2 save

# 9. Restart Nginx
sudo systemctl restart nginx
```

---

## .env File Content

When you run `nano .env`, paste this:

```
MONGODB_URI=mongodb+srv://enquiry_db_user:Hackhalt%402025@hackhalt-database.xpfavoj.mongodb.net/?appName=hackhalt-database
JWT_SECRET=hackhalt_jwt_secret_key_2026_secure_production
NODE_ENV=production
PORT=3000
```

Save: `Ctrl+X` then `Y` then `Enter`

---

## Essential Commands

| Task | Command |
|------|---------|
| **Start App** | `pm2 start server.js --name "hackhalt"` |
| **See All Apps** | `pm2 list` |
| **View Logs** | `pm2 logs hackhalt` |
| **Restart App** | `pm2 restart hackhalt` |
| **Stop App** | `pm2 stop hackhalt` |
| **Delete App** | `pm2 delete hackhalt` |
| **Restart Nginx** | `sudo systemctl restart nginx` |
| **Test Nginx** | `sudo nginx -t` |
| **Check Port 3000** | `netstat -tuln \| grep 3000` |
| **Update Code** | `git pull && npm install && pm2 restart hackhalt` |

---

## SSH Connection

**Windows PowerShell:**
```powershell
ssh username@hostinger-ip
# Enter password
```

**Username & IP from:** Hostinger Dashboard → Hosting Plan → Manage → SSH Access

---

## Nginx Reverse Proxy Config

File: `/etc/nginx/sites-enabled/default`

Location section:
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

---

## SSL Certificate Setup

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d hackhalt.org -d www.hackhalt.org
```

Answer prompts:
- Email: your-email@gmail.com
- Agree: Y
- Share email: N
- Redirect to HTTPS: 2 (Yes)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| App won't start | `pm2 logs hackhalt` to see error |
| Port 3000 in use | `sudo lsof -i :3000` then `sudo kill -9 <PID>` |
| MongoDB connection fails | Check `.env` and MongoDB whitelist |
| CORS error | Check Nginx config, restart with `sudo systemctl restart nginx` |
| SSL not working | Run certbot again or wait 24 hours |
| Git pull fails | Check branch with `git status` or `git branch` |
| npm install hangs | Kill with Ctrl+C, try again, or check disk space with `df -h` |

---

## Testing

```bash
# Test if app is running on port 3000
curl http://localhost:3000

# Test if Nginx is proxying correctly
curl http://localhost

# Test API endpoint
curl -X POST https://hackhalt.org/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"HackHalt@2025"}'
```

---

## Monitoring

```bash
# See app status
pm2 list

# Real-time logs (follow mode)
pm2 logs hackhalt --follow

# Last 100 lines
pm2 logs hackhalt --lines 100

# Server resources
free -h          # Memory
df -h            # Disk space
top              # CPU usage
uptime           # Server uptime
```

---

## File Locations

```
Code:      /home/username/public_html/hackhalt-cic/
Config:    /etc/nginx/sites-enabled/default
Logs:      /var/log/nginx/error.log
Certs:     /etc/letsencrypt/live/hackhalt.org/
MongoDB:   (cloud) - connection string in .env
```

---

## Common Issues & Quick Fixes

### App keeps crashing?
```bash
pm2 logs hackhalt
# Read the error message
# Fix the issue
pm2 restart hackhalt
```

### Website won't load?
```bash
# Check Nginx
sudo nginx -t
sudo systemctl restart nginx

# Check if port 3000 listens
netstat -tuln | grep 3000

# Check app logs
pm2 logs hackhalt
```

### MongoDB connection error?
```bash
# 1. Verify .env file
cat .env

# 2. Check MongoDB whitelist at https://cloud.mongodb.com/
# 3. Add your Hostinger IP: 0.0.0.0/0 (temporary) or specific IP

# 4. Restart app
pm2 restart hackhalt
```

### Code update not showing?
```bash
cd /home/username/public_html/hackhalt-cic
git pull
npm install
pm2 restart hackhalt
```

---

## URLs After Deployment

- **Main Site:** https://hackhalt.org
- **Login Page:** https://hackhalt.org/admin-login
- **Admin Panel:** https://hackhalt.org/blog-admin
- **API Base:** https://hackhalt.org/api
- **Login API:** POST https://hackhalt.org/api/admin/login

---

## Login Test

```bash
# SSH into server
ssh username@hostinger-ip

# Test API directly
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"HackHalt@2025"}'

# Should return JSON with token if working ✅
```

---

## Daily Maintenance

```bash
# Check status
pm2 list

# View recent logs
pm2 logs hackhalt --lines 50

# Check disk space
df -h

# Update code (if changes pushed to GitHub)
cd /home/username/public_html/hackhalt-cic
git pull
pm2 restart hackhalt

# Renew SSL (monthly automated by certbot)
sudo certbot renew
```

---

## Emergency Restart Everything

```bash
# 1. Stop all apps
pm2 stop all

# 2. Restart Nginx
sudo systemctl restart nginx

# 3. Start app again
pm2 start server.js --name "hackhalt"

# 4. Verify
pm2 list
pm2 logs hackhalt
```

---

## Credentials to Keep Safe

🔐 **DO NOT SHARE:**
- SSH password
- Database password
- JWT_SECRET value
- API keys

✅ **SAFE TO SHARE:**
- Domain name
- GitHub repo link
- Public website URL

---

**Keep this card handy while deploying!** 📌

