# 🏗️ HOSTINGER DEPLOYMENT ARCHITECTURE

## What Your Setup Will Look Like:

```
┌─────────────────────────────────────────────────────────┐
│                    HOSTINGER SERVER                     │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  /home/username/public_html/hackhalt-cic/     │    │
│  │  ├── server.js                                │    │
│  │  ├── .env (contains MongoDB URI & JWT)        │    │
│  │  ├── models/                                  │    │
│  │  ├── middleware/                              │    │
│  │  ├── public/                                  │    │
│  │  └── node_modules/                            │    │
│  └────────────────────────────────────────────────┘    │
│                       ▲                                  │
│                       │                                  │
│  ┌────────────────────────────────────────────────┐    │
│  │  PM2 (Process Manager)                        │    │
│  │  ├── Keeps app running 24/7                   │    │
│  │  ├── Auto-restarts if crashes                 │    │
│  │  └── Starts on server boot                    │    │
│  └────────────────────────────────────────────────┘    │
│                       ▲                                  │
│                       │ Port 3000                        │
│  ┌────────────────────────────────────────────────┐    │
│  │  NGINX (Reverse Proxy)                        │    │
│  │  ├── Listens on Port 80 (HTTP)                │    │
│  │  ├── Listens on Port 443 (HTTPS)              │    │
│  │  └── Routes requests to PM2 app               │    │
│  └────────────────────────────────────────────────┘    │
│                       ▲                                  │
│                       │                                  │
└──────────────────────────────────────────────────────────┘
                       │
            Domain: hackhalt.org
                    (DNS points here)
                       │
            ┌──────────┴──────────┐
            │                     │
     Browser: HTTPS         Browser: HTTPS
     https://hackhalt.org   https://hackhalt.org/admin-login
```

---

## Data Flow When You Login:

```
1. User visits: https://hackhalt.org/admin-login
   │
   ▼
2. Browser sends request (HTTPS encrypted)
   │
   ▼
3. Domain DNS points to Hostinger server IP
   │
   ▼
4. NGINX receives request on port 443 (HTTPS)
   │
   ▼
5. NGINX decrypts HTTPS and forwards to localhost:3000
   │
   ▼
6. PM2-managed Node.js app receives request
   │
   ▼
7. server.js calls login API handler
   │
   ▼
8. Handler connects to MongoDB Atlas (in cloud)
   │
   ▼
9. Validates username & password
   │
   ▼
10. Generates JWT token (using JWT_SECRET from .env)
    │
    ▼
11. Returns token in JSON response
    │
    ▼
12. Browser receives encrypted response via HTTPS
    │
    ▼
13. Frontend stores token in localStorage
    │
    ▼
14. User logged in! ✅
```

---

## File Structure on Server:

```
/home/username/
├── public_html/
│   └── hackhalt-cic/          ← Your app folder
│       ├── server.js          ← Main app file
│       ├── .env               ← Environment variables (NEVER share!)
│       ├── package.json       ← Dependencies list
│       ├── package-lock.json
│       ├── vercel.json        ← Vercel config (not used on Hostinger)
│       ├── public/            ← HTML/CSS/JS files
│       │   ├── admin-login.html
│       │   ├── blog-admin.html
│       │   ├── assets/
│       │   └── ...
│       ├── models/            ← Database schemas
│       ├── middleware/        ← Auth middleware
│       ├── node_modules/      ← Packages (created by npm install)
│       └── .git/              ← Git history
├── logs/
│   └── pm2-logs               ← App logs
└── .ssh/                       ← SSH keys
    └── authorized_keys
```

---

## Services Running:

```
┌──────────────┬──────────┬─────────┬────────────────────┐
│ Service      │ Port     │ Status  │ What it does       │
├──────────────┼──────────┼─────────┼────────────────────┤
│ NGINX        │ 80, 443  │ Running │ Routes web traffic │
│ Node.js/PM2  │ 3000     │ Running │ Your app logic     │
│ MongoDB      │ 27017*   │ Cloud   │ Database (cloud)   │
│ SSH          │ 22       │ Running │ Remote access      │
│ Email**      │ 25, 465  │ Running │ Send emails (opt)  │
└──────────────┴──────────┴─────────┴────────────────────┘

* MongoDB is on MongoDB Atlas (not local)
** Email service if you set it up
```

---

## Environment Variables:

```
┌──────────────────┬──────────────────────────────────────┐
│ Variable         │ Purpose                              │
├──────────────────┼──────────────────────────────────────┤
│ MONGODB_URI      │ Connect to MongoDB Atlas database    │
│ JWT_SECRET       │ Sign JWT tokens for authentication   │
│ NODE_ENV         │ Set to "production" for optimization │
│ PORT             │ Which port Node.js listens on       │
└──────────────────┴──────────────────────────────────────┘
```

---

## Communication Paths:

### 1. Frontend to Backend:
```
Browser Frontend
    │
    ├─ HTTP/HTTPS request
    │
    ▼
NGINX (reverse proxy)
    │
    ├─ Forwards to localhost:3000
    │
    ▼
Node.js Backend (server.js)
    │
    └─ Returns JSON response
```

### 2. Backend to Database:
```
Node.js Backend
    │
    ├─ MongoDB connection (MONGODB_URI)
    │
    ▼
MongoDB Atlas (Cloud)
    │
    └─ Returns query results
```

### 3. JWT Token:
```
User logs in
    │
    ├─ Sends username + password
    │
    ▼
Backend validates in MongoDB
    │
    ├─ Generates JWT with secret
    │
    ▼
Browser stores token
    │
    ├─ Sends token in future requests
    │
    ▼
Backend verifies token signature
    │
    └─ Allows access if valid
```

---

## What Happens When App Crashes:

```
App crashes
    │
    ▼
PM2 detects it
    │
    ├─ Logs the error
    │
    ▼
PM2 auto-restarts within seconds
    │
    ├─ Checks .env file
    │
    ├─ Connects to MongoDB
    │
    ▼
App is back online ✅
```

---

## Updating Code:

```
You push code to GitHub
    │
    ▼
You SSH into Hostinger
    │
    ▼
git pull (downloads latest code)
    │
    ▼
npm install (updates dependencies if needed)
    │
    ▼
pm2 restart hackhalt (restarts app)
    │
    ▼
App running with new code ✅
```

---

## Security Layers:

```
User Access
    │
    ├─ HTTPS/SSL encryption (port 443)
    │
    ▼
NGINX Reverse Proxy
    │
    ├─ Hides Node.js from direct access
    │
    ├─ Only port 80 & 443 exposed
    │
    ▼
Node.js Application
    │
    ├─ Validates input
    │
    ├─ Checks JWT token
    │
    ├─ Hashes passwords with bcryptjs
    │
    ▼
MongoDB Atlas
    │
    ├─ Only accepts from IP whitelist
    │
    ├─ Connection string in .env (hidden)
    │
    ▼
Data is secure ✅
```

---

## Performance:

```
Request → NGINX (fast static serving)
       → Node.js (handles logic)
       → MongoDB (returns data)
       → Node.js (formats response)
       → NGINX (sends back)
       → Browser (displays)

All from: hackhalt.org ✅
```

This architecture keeps your app fast and secure! 🚀

