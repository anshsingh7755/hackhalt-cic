# 🛠️ HOSTINGER - Common Commands Reference

## SSH Connection

### Connect to Hostinger
```bash
ssh username@hostinger-ip
# Or
ssh username@hackhalt.org
```

### List your SSH credentials
Check Hostinger Dashboard → Hosting Plan → Manage → SSH Access

---

## Navigation Commands

```bash
# Show current directory
pwd

# List files
ls -la

# Change directory
cd /home/username/public_html

# Go back
cd ..

# Go home
cd ~
```

---

## Git Commands

```bash
# Clone your repo first time
git clone https://github.com/anshsingh7755/hackhalt-cic.git

# Update to latest code
git pull

# Check status
git status

# Check logs
git log --oneline
```

---

## Node.js & NPM

```bash
# Check Node.js version
node --version

# Check NPM version
npm --version

# Install dependencies
npm install

# Install specific package
npm install express

# Install globally
sudo npm install -g pm2
```

---

## PM2 (Process Manager)

```bash
# Start app
pm2 start server.js --name "hackhalt"

# List running apps
pm2 list

# Stop app
pm2 stop hackhalt

# Restart app
pm2 restart hackhalt

# Stop all apps
pm2 stop all

# View logs
pm2 logs hackhalt

# View logs real-time
pm2 logs hackhalt --lines 100 --follow

# Delete app from PM2
pm2 delete hackhalt

# Setup auto-start on boot
pm2 startup
pm2 save

# Remove auto-start
pm2 unstartup
```

---

## Nginx (Web Server)

```bash
# Test Nginx config
sudo nginx -t

# Start Nginx
sudo systemctl start nginx

# Stop Nginx
sudo systemctl stop nginx

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx on boot
sudo systemctl enable nginx

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

---

## Environment Files

```bash
# Create/edit .env file
nano .env

# View .env content
cat .env

# View specific line
grep JWT_SECRET .env
```

### In Nano Editor:
- Save: `Ctrl+X` → `Y` → `Enter`
- Cancel: `Ctrl+X` → `N`
- Cut line: `Ctrl+K`
- Paste: `Ctrl+U`

---

## SSL/HTTPS (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d hackhalt.org -d www.hackhalt.org

# Renew certificates
sudo certbot renew

# Check certificate
sudo certbot certificates

# View certificate details
sudo openssl x509 -in /etc/letsencrypt/live/hackhalt.org/cert.pem -text -noout
```

---

## Ports & Network

```bash
# Check if port is in use
netstat -tuln | grep 3000

# Check all listening ports
netstat -tuln

# Kill process on port
sudo lsof -i :3000
sudo kill -9 <PID>

# Show firewall rules
sudo ufw status

# Allow port through firewall
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
```

---

## File Management

```bash
# Create directory
mkdir folder-name

# Create file
touch filename.txt

# Copy file
cp source.txt destination.txt

# Move/rename file
mv old-name.txt new-name.txt

# Delete file
rm filename.txt

# Delete directory
rm -r folder-name

# View file content
cat filename.txt

# View file with line numbers
cat -n filename.txt

# View large files
less filename.txt
# Press 'q' to exit

# Search in file
grep "search-term" filename.txt

# Count lines
wc -l filename.txt
```

---

## System Information

```bash
# Check server uptime
uptime

# Check disk space
df -h

# Check memory usage
free -h

# Check CPU info
lscpu

# Current date/time
date

# Your username
whoami

# Your IP address
hostname -I
```

---

## Package Management (APT)

```bash
# Update package list
sudo apt-get update

# Upgrade packages
sudo apt-get upgrade

# Install package
sudo apt-get install package-name

# Remove package
sudo apt-get remove package-name

# Search for package
apt-cache search package-name
```

---

## Monitoring & Debugging

```bash
# See all processes
ps aux

# Real-time system monitor
top

# Kill a process
kill -9 <PID>

# Monitor file changes
watch -n 1 'cat filename.txt'

# Real-time log viewer
tail -f /path/to/logfile
```

---

## Backup & Restore

```bash
# Backup entire folder
tar -czf backup.tar.gz /home/username/public_html/hackhalt-cic

# List backup contents
tar -tzf backup.tar.gz

# Extract backup
tar -xzf backup.tar.gz

# Copy to local machine
scp username@hostinger-ip:/path/to/file.zip ~/Downloads/
```

---

## Useful Tips

```bash
# Clear terminal
clear

# Repeat last command
!!

# Run command with sudo (if needed)
sudo command-name

# Run command in background
command &

# See all background jobs
jobs

# Bring job to foreground
fg %1

# Redirect output to file
command > output.txt

# Append to file
command >> output.txt

# Combine stdout and stderr
command &> output.txt
```

---

## Emergency - If App Crashes

```bash
# 1. Check PM2 logs
pm2 logs hackhalt

# 2. Restart app
pm2 restart hackhalt

# 3. Check MongoDB connection
ping mongodb.com

# 4. Check disk space
df -h

# 5. Check memory
free -h

# 6. Check Nginx
sudo nginx -t
sudo systemctl restart nginx

# 7. Restart everything
pm2 restart all
sudo systemctl restart nginx
```

---

## Quick Copy-Paste Blocks

### Initial Setup (Do once)
```bash
cd /home/username/public_html
git clone https://github.com/anshsingh7755/hackhalt-cic.git
cd hackhalt-cic
npm install
sudo npm install -g pm2
pm2 start server.js --name "hackhalt"
pm2 startup
pm2 save
```

### Update Code
```bash
cd /home/username/public_html/hackhalt-cic
git pull
npm install
pm2 restart hackhalt
```

### Check Health
```bash
pm2 list
pm2 logs hackhalt --lines 50
sudo nginx -t
netstat -tuln | grep 3000
```

