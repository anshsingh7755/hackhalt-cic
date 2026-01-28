# HackHalt CIC - Quick Hostinger Deployment Checklist

## Before You Deploy to Hostinger

### ✅ Preparation (5 minutes)

- [ ] Ensure `.env` file exists with MongoDB connection
- [ ] Test locally: `npm start` works
- [ ] All features tested locally (blogs, admin, forms)
- [ ] `.gitignore` includes `.env` and `node_modules/`

### ✅ GitHub Setup (5 minutes)

- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Create repo on GitHub
- [ ] Push: `git push -u origin main`

### ✅ Hostinger Setup (10 minutes)

**Account Creation:**
- [ ] Create Hostinger account (hostinger.com)
- [ ] Purchase/connect domain
- [ ] Choose hosting plan (Business recommended)

**Git Deployment:**
- [ ] Go to Hostinger Dashboard
- [ ] Navigate to Hosting → Git
- [ ] Connect GitHub repository
- [ ] Select `main` branch
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`

**Environment Variables:**
- [ ] Add MONGODB_URI
- [ ] Add PORT = 5000
- [ ] Add NODE_ENV = production

### ✅ SSL & Domain (5 minutes)

- [ ] Activate SSL certificate (free)
- [ ] Update DNS to point to Hostinger (auto usually)
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Test HTTPS access

### ✅ Testing (5 minutes)

- [ ] Visit https://your-domain.com
- [ ] Test all pages load
- [ ] Test admin login
- [ ] Test blog view/edit
- [ ] Test contact form
- [ ] Check browser console for errors
- [ ] Check Hostinger logs for issues

---

## Key Commands You'll Use

### Local Testing:
```bash
npm install
npm start
```

### Pushing Updates:
```bash
git add .
git commit -m "Your message"
git push origin main
# Hostinger auto-deploys!
```

---

## Environment Variables to Add in Hostinger

```
MONGODB_URI=mongodb+srv://enquiry_db_user:Hackhalt%402025@hackhalt-database.xpfavoj.mongodb.net/?appName=hackhalt-database
PORT=5000
NODE_ENV=production
```

---

## MongoDB Atlas Whitelist

⚠️ **Important:** Your MongoDB Atlas must whitelist Hostinger's IP

1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Add Hostinger server IP (provided in Hostinger dashboard)
4. Or select "Allow Access from Anywhere" (less secure but works)

---

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Won't start | Check Hostinger logs, verify .env exists |
| 502 error | Restart app in Hostinger, check Node.js version |
| MongoDB fail | Whitelist Hostinger IP in MongoDB Atlas |
| Domain not working | Wait 24-48 hrs for DNS, check A record |
| Slow loading | Check MongoDB query performance, enable caching |

---

## After Going Live

1. Monitor Hostinger analytics
2. Check error logs weekly
3. Keep Node.js dependencies updated
4. Backup MongoDB data regularly
5. Monitor domain renewal date

---

## Support Contacts

- **Hostinger Help:** https://hpanel.hostinger.com/support
- **MongoDB Atlas:** https://docs.mongodb.com/atlas/
- **Node.js Docs:** https://nodejs.org/docs/

---

**Expected Timeline:**
- Setup: 30 minutes
- Deployment: 5 minutes
- DNS propagation: 24-48 hours
- Total time to live: ~1 day

**Good luck! Your site will be live soon! 🚀**
