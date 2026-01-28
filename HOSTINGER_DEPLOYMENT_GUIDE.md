# HackHalt CIC - Hostinger Deployment Guide

## Complete Step-by-Step Instructions

---

## **PHASE 1: PREPARE YOUR APPLICATION**

### **Step 1: Update .env for Production**

Edit `.env` file in your project root:

```env
# MongoDB Atlas Connection String (Keep your existing one)
MONGODB_URI=mongodb+srv://enquiry_db_user:Hackhalt%402025@hackhalt-database.xpfavoj.mongodb.net/?appName=hackhalt-database

# Server Port (Important: Use 3000 or 5000)
PORT=5000

# Node Environment
NODE_ENV=production

# Optional: Add your domain
DOMAIN=your-domain.com
```

### **Step 2: Check package.json Start Script**

Your `package.json` should have:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### **Step 3: Verify server.js Port Configuration**

Ensure your `server.js` uses the PORT from .env:

```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### **Step 4: Create .gitignore (if not present)**

```
node_modules/
.env
.env.local
.env.*.local
*.log
.DS_Store
```

---

## **PHASE 2: PUSH TO GITHUB**

### **Step 1: Initialize Git Repository**

```bash
cd c:\Users\singh\OneDrive\Desktop\hackhalt-cic
git init
git add .
git commit -m "Initial commit - HackHalt CIC"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hackhalt-cic.git
git push -u origin main
```

### **Step 2: Get GitHub Personal Access Token**

1. Go to GitHub.com → Settings → Developer settings → Personal access tokens
2. Click "Generate new token"
3. Select scopes: `repo`, `read:org`
4. Copy the token (save it safely)

---

## **PHASE 3: HOSTINGER ACCOUNT SETUP**

### **Step 1: Create Hostinger Account**

1. Go to **hostinger.com**
2. Sign up for an account
3. Choose a hosting plan (Recommended: **Business or Premium**)

### **Step 2: Purchase Domain**

1. Search for your domain (or use existing)
2. Add to cart and purchase
3. Note the domain name

---

## **PHASE 4: HOSTINGER NODE.JS DEPLOYMENT**

### **Option A: Deploy Using Hostinger Git (Recommended)**

#### **Step 1: Enable Git Deployment in Hostinger**

1. Log in to Hostinger Dashboard
2. Go to **Hosting** → **Your Domain**
3. Click **Git** (in sidebar)
4. Click **Connect Git Repository**
5. Choose **GitHub** as provider
6. Authorize Hostinger to access GitHub
7. Select your repository: `hackhalt-cic`
8. Select branch: `main`
9. Click **Connect**

#### **Step 2: Configure Deployment Settings**

1. In Git section, look for **Deployment Settings**
2. Set **Application Root**: `/`
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Save settings

#### **Step 3: Set Environment Variables**

1. Go to **Environment Variables** section
2. Add the following:

```
MONGODB_URI = mongodb+srv://enquiry_db_user:Hackhalt%402025@hackhalt-database.xpfavoj.mongodb.net/?appName=hackhalt-database

PORT = 5000

NODE_ENV = production
```

3. Save environment variables

#### **Step 4: Deploy**

1. Click **Deploy** button
2. Wait for deployment to complete (2-5 minutes)
3. Check deployment logs for errors

---

### **Option B: Deploy Using Manual Upload**

#### **Step 1: Prepare Files Locally**

```bash
cd c:\Users\singh\OneDrive\Desktop\hackhalt-cic

# Install production dependencies
npm install --production

# Create deployment zip
# Windows: Right-click folder → Send to → Compressed folder
```

#### **Step 2: Upload via FTP**

1. In Hostinger Dashboard → **SFTP/SSH**
2. Download SFTP credentials
3. Use FileZilla or WinSCP:
   - Host: (from credentials)
   - Username: (from credentials)
   - Password: (from credentials)
   - Port: 22

4. Upload contents to `public_html/` folder

#### **Step 3: Install Dependencies on Server**

1. In Hostinger Dashboard → **Terminal**
2. Run:

```bash
cd public_html
npm install
```

#### **Step 4: Set Environment Variables**

1. Go to **Application Manager** or **Environment Variables**
2. Create `.env` file with your settings

---

## **PHASE 5: CONFIGURE DOMAIN & SSL**

### **Step 1: Point Domain to Hosting**

1. Hostinger Dashboard → **Domains**
2. Find your domain → **DNS Records**
3. Update **A Record** to Hostinger's IP (should be done automatically)
4. Wait 24-48 hours for DNS propagation

### **Step 2: Enable SSL Certificate**

1. Hostinger Dashboard → **SSL Certificate**
2. Click **Activate SSL** (usually free with Hostinger)
3. Wait for certificate to be issued

### **Step 3: Force HTTPS Redirect**

In your `server.js`, add:

```javascript
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

---

## **PHASE 6: CONFIGURE APPLICATION**

### **Step 1: Update CORS Settings**

In your `server.js`, update CORS:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-domain.com',
    'https://www.your-domain.com'
  ],
  credentials: true
}));
```

### **Step 2: Update API Endpoints**

If using absolute URLs, update them in your frontend:

```javascript
// Replace localhost:5000 with your domain
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com' 
  : 'http://localhost:5000';
```

### **Step 3: Verify MongoDB Connection**

Your MongoDB Atlas is already configured and accessible. Just ensure:
- Connection string is in `.env`
- IP whitelist includes your Hostinger server IP

---

## **PHASE 7: TESTING & MONITORING**

### **Step 1: Test Your Application**

1. Navigate to `https://your-domain.com`
2. Check all pages load correctly:
   - ✅ Homepage
   - ✅ Blogs page (with 24+ articles)
   - ✅ Admin login
   - ✅ Contact forms
   - ✅ Blog admin panel

### **Step 2: Monitor Performance**

1. Hostinger Dashboard → **Analytics**
2. Check server logs for errors
3. Monitor bandwidth and CPU usage

### **Step 3: Set Up Auto-Deployment (Optional)**

1. In Hostinger Git settings
2. Enable "Auto-deploy on push"
3. Now every time you push to GitHub, it deploys automatically!

---

## **PHASE 8: POST-DEPLOYMENT CHECKS**

### **Critical Checks**

- [ ] ✅ Application loads on domain
- [ ] ✅ MongoDB connection works
- [ ] ✅ Blog admin page displays blogs
- [ ] ✅ View/Edit blog features work
- [ ] ✅ Contact forms submit successfully
- [ ] ✅ SSL certificate active (HTTPS)
- [ ] ✅ Email notifications (if configured)
- [ ] ✅ No console errors in browser

### **Performance Optimization**

1. **Enable Gzip Compression**: Hostinger usually does this by default
2. **Set Cache Headers** in server.js:

```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});
```

3. **Minimize Assets**: Ensure CSS/JS are minified

---

## **TROUBLESHOOTING**

### **Problem: Application won't start**

**Solution:**
1. Check logs in Hostinger Dashboard
2. Verify `npm start` command works locally
3. Check `.env` file exists on server
4. Verify Node.js version (Hostinger supports 14+)

### **Problem: Port already in use**

**Solution:**
1. Use environment variable: `process.env.PORT`
2. Don't hardcode port in code

### **Problem: MongoDB connection fails**

**Solution:**
1. Check MongoDB Atlas IP whitelist includes Hostinger IP
2. Verify MONGODB_URI in .env
3. Test connection: `node -e "require('mongoose').connect(process.env.MONGODB_URI)"`

### **Problem: 502 Bad Gateway**

**Solution:**
1. Check if Node.js process is running
2. Review error logs
3. Restart application from Hostinger dashboard

---

## **CONTINUOUS UPDATES**

### **To Deploy Updates:**

1. Make changes locally
2. Test with `npm start`
3. Commit and push to GitHub:

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

4. Hostinger will auto-deploy (if enabled)
5. Or manually click Deploy in Hostinger

---

## **IMPORTANT NOTES**

⚠️ **Security:**
- Never commit `.env` to GitHub
- Use strong passwords for admin accounts
- Keep Node.js dependencies updated
- Enable two-factor authentication on Hostinger

📝 **Monitoring:**
- Check server logs regularly
- Monitor MongoDB usage (free tier has limits)
- Set up email alerts for errors

🔄 **Backups:**
- Hostinger usually provides automatic backups
- Export MongoDB data regularly
- Keep local backup of `.env` file

---

## **SUPPORT RESOURCES**

- Hostinger Docs: https://hpanel.hostinger.com/support
- Node.js Hosting: https://nodejs.org/en/docs/guides/nodejs-web-app-without-a-framework/
- MongoDB Atlas: https://docs.mongodb.com/atlas/
- Your Domain Provider Documentation

---

## **NEXT STEPS**

1. ✅ Complete Phase 1-3 (Local prep + GitHub)
2. ✅ Create Hostinger account
3. ✅ Connect GitHub repository
4. ✅ Set environment variables
5. ✅ Deploy and test
6. ✅ Configure domain and SSL
7. ✅ Monitor and maintain

**Your application should be live within 1-2 hours!**

For questions, refer to the steps above or contact Hostinger support.
