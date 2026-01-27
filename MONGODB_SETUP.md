# MongoDB Atlas Setup Guide

## 🎯 Quick Setup (5-10 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up Free" or "Sign In"
3. Create your account (or login if you already have one)

### Step 2: Create a Project
1. Click "Create a Project"
2. Name it "HackHalt" (or any name you prefer)
3. Click "Create Project"

### Step 3: Create a Cluster
1. Click "Create" under "Database Deployments"
2. Select **FREE** tier (M0 Sandbox)
3. Choose your preferred cloud provider (AWS/Google Cloud/Azure)
4. Select the closest region to you
5. Cluster name: "hackhalt-cluster" (or your preference)
6. Click "Create Deployment"

### Step 4: Set up Database Access
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Create username: `hackhalt_user` (or your choice)
4. Create password: `YourStrongPassword123` (use a secure password!)
5. Database User Privileges: Select "Built-in Role" → "Read and write to any database"
6. Click "Add User"

### Step 5: Get Your Connection String
1. Go to "Clusters" (left sidebar)
2. Click the "Connect" button on your cluster
3. Choose "Drivers"
4. Select "Node.js" from the driver dropdown
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/mydb?retryWrites=true&w=majority`)

### Step 6: Update .env File
1. Open `.env` file in your project
2. Replace the `MONGODB_URI` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://hackhalt_user:YourPassword@hackhalt-cluster.mongodb.net/hackhalt_db?retryWrites=true&w=majority
   ```
   
   **Important:** Replace:
   - `hackhalt_user` with your database username
   - `YourPassword` with your database password
   - `hackhalt-cluster` with your cluster name

### Step 7: Restart Your Server
1. Stop the server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. You should see: `✅ MongoDB Connected: [cluster info]`

---

## ✅ What You Get

✨ **Cloud Database** - Access from anywhere
✨ **Auto-Backups** - MongoDB handles data safety
✨ **Easy Scaling** - Grow without infrastructure changes
✨ **Free Tier** - 512MB storage (plenty for form submissions)
✨ **Admin Panel** - Manage data from MongoDB Atlas dashboard
✨ **Real-time Sync** - All data instantly available

---

## 🔒 Security Tips

✅ Never commit `.env` file to Git
✅ Keep your password secure
✅ Use strong passwords
✅ Restrict IP access (optional, for production)
✅ MongoDB Atlas handles encryption

---

## 📊 Viewing Your Data

### Option 1: MongoDB Atlas Dashboard
1. Go to https://cloud.mongodb.com
2. Login to your account
3. Click your cluster
4. Click "Browse Collections"
5. View all submissions in real-time

### Option 2: Admin Dashboard (Your App)
1. Go to http://localhost:5000/admin
2. View all submissions
3. Delete entries as needed

---

## 🆓 Free Tier Limitations

- **Storage:** 512 MB (enough for thousands of form submissions)
- **Data Transfer:** 1 GB/month (more than enough)
- **Concurrent Connections:** 100
- **Backups:** 7-day retention

Perfect for development and small-scale applications!

---

## 🚀 Upgrade to Paid (Optional)

When you grow, you can upgrade anytime:
- M2 Tier: $9/month - 4GB storage
- M5 Tier: $57/month - 64GB storage
- M10 Tier: $99/month - 512GB storage

---

## 🆘 Troubleshooting

### "MongoDB Connection Error"
**Solution:** Check your `.env` file connection string
- Verify username and password are correct
- Make sure you replaced `<password>` with actual password
- Ensure network access is allowed (check IP whitelist)

### "Cannot connect from my location"
**Solution:** Whitelist your IP
1. Go to "Network Access" in MongoDB Atlas
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (⚠️ for development only)
4. Or manually add your IP address

### "Connection timeout"
**Solution:** 
1. Make sure cluster is running
2. Check your internet connection
3. Try whitelist IP address again
4. Restart the server

---

## 📁 Data Structure

Your MongoDB database will have 3 collections:

### contactsubmissions
```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Partnership Inquiry",
  "message": "I'm interested in collaborating...",
  "createdAt": "2026-01-27T10:30:00.000Z"
}
```

### joinsubmissions
```json
{
  "_id": ObjectId,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "organization": "XYZ Corporation",
  "interests": "Cybersecurity Training",
  "createdAt": "2026-01-27T10:35:00.000Z"
}
```

### blogsubmissions
```json
{
  "_id": ObjectId,
  "title": "Cybersecurity Best Practices",
  "author": "John Doe",
  "category": "Security Tips",
  "content": "Lorem ipsum dolor sit amet...",
  "createdAt": "2026-01-27T10:40:00.000Z"
}
```

---

## 🎓 Next Steps

1. ✅ Set up MongoDB Atlas account
2. ✅ Create cluster
3. ✅ Get connection string
4. ✅ Update `.env` file
5. ✅ Test your forms!

**That's it! You now have a professional cloud database!** 🎉

---

## 📞 Need Help?

- MongoDB Documentation: https://docs.mongodb.com/
- MongoDB Atlas Help: https://support.mongodb.com/
- Node.js Mongoose: https://mongoosejs.com/

---

**Happy coding! Your forms are now connected to the cloud.** ☁️
