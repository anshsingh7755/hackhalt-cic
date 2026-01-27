# Blog Admin & Authentication Setup Guide

This guide helps you set up and use the new blog admin system with secure authentication and authorization.

## Overview

The blog admin system now includes:
- ✅ Secure admin login with JWT authentication
- ✅ Authorization checks for blog submission
- ✅ Admin dashboard for blog management
- ✅ Proper blog content formatting with paragraphs
- ✅ Blog publish/unpublish workflow

## Step 1: MongoDB Setup

Make sure you have MongoDB Atlas configured with your connection string in `.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed instructions.

## Step 2: Create Initial Admin User

Once your MongoDB connection is active, create the first admin user:

```bash
node create-admin.js
```

You'll see output like:
```
✅ Admin user created successfully!

📋 Admin Credentials:
Username: admin
Password: HackHalt@2025

⚠️  IMPORTANT: Change the password after first login!

🔗 Login at: http://localhost:5000/admin-login
```

**Keep these credentials safe!** You can create additional admin users from the admin dashboard.

## Step 3: Access Admin Login

1. Open your browser and go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
2. Enter credentials:
   - **Username**: `admin`
   - **Password**: `HackHalt@2025`
3. Click **Sign In**

You'll be redirected to the blog admin dashboard.

## Admin Dashboard Features

### Dashboard Tab
- **Total Blogs**: Count of all blog posts
- **Published**: Count of published blogs
- **Drafts**: Count of unpublished blogs

### Add Blog Tab
Create new blog posts with:
- **Blog Title** (required, max 300 characters)
- **Author** (optional)
- **Category** (Security, Technology, etc.)
- **Featured Image URL** (optional)
- **Excerpt** (preview text, max 500 characters)
- **Content** (required, max 50,000 characters)
  - *Tip*: Separate paragraphs with blank lines for proper formatting
- **Tags** (comma-separated, optional)

**Example content with proper formatting:**
```
This is the first paragraph. It explains the main concept clearly and thoroughly.

This is the second paragraph. It can contain additional details and examples.

This is the third paragraph. Blank lines between paragraphs are preserved in the display.
```

When displayed, each section becomes a properly formatted paragraph.

### Manage Blogs Tab
- **View all published and draft blogs**
- **Delete blogs** with confirmation
- **Edit functionality** (coming soon)
- **Toggle publish/unpublish status** (coming soon)

## API Endpoints for Developers

### Authentication Endpoints

#### POST /api/admin/login
**Login to get JWT token**

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d {
    "username": "admin",
    "password": "HackHalt@2025"
  }
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "65f8a1b2c3d4e5f6g7h8i9j0",
    "username": "admin",
    "email": "admin@hackhalt.com",
    "role": "super-admin"
  }
}
```

#### POST /api/admin/register
**Create new admin (super-admin only)**

```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d {
    "username": "newadmin",
    "email": "newadmin@hackhalt.com",
    "password": "SecurePassword123!",
    "role": "admin"
  }
```

#### GET /api/admin/profile
**Get current admin profile**

```bash
curl http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Blog Endpoints (Protected)

#### POST /api/blog
**Submit new blog (requires authentication)**

```bash
curl -X POST http://localhost:5000/api/blog \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d {
    "title": "My Security Blog",
    "author": "John Doe",
    "category": "Security",
    "content": "This is my blog content...",
    "excerpt": "Brief summary...",
    "image": "https://example.com/image.jpg",
    "tags": ["security", "tutorial"]
  }
```

#### GET /api/submissions/blogs
**Get all published blogs**

```bash
curl http://localhost:5000/api/submissions/blogs
```

#### DELETE /api/submissions/blog/:id
**Delete blog (requires authentication)**

```bash
curl -X DELETE http://localhost:5000/api/submissions/blog/BLOG_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Content Formatting Guide

### Best Practices for Blog Content

1. **Paragraph Separation**: Use blank lines between paragraphs
   ```
   First paragraph here.

   Second paragraph starts after blank line.

   Third paragraph continues...
   ```

2. **Lists**: You can include numbered/bulleted lists in paragraphs
   ```
   Key points:
   1. First point
   2. Second point
   3. Third point

   Next paragraph after list.
   ```

3. **Code Examples**: Include code snippets within paragraphs
   ```
   Here's example code:
   
   function example() {
     return true;
   }

   Continue with regular text.
   ```

## Security Best Practices

1. **Change Default Password**: Change `HackHalt@2025` immediately after first login
2. **Use Strong Passwords**: Minimum 16 characters with mixed case, numbers, symbols
3. **JWT Tokens**: Valid for 7 days, token stored in browser localStorage
4. **Logout**: Always logout when finished to clear the token
5. **Create Admin Users**: Only super-admin can create new admin accounts
6. **Audit Logs**: All blog submissions tracked with adminId (coming soon)

## Troubleshooting

### "Invalid credentials" on login
- Check username and password spelling
- Ensure you ran `create-admin.js` successfully
- Check MongoDB is connected (see console error if any)

### "Cannot fetch profile" 
- Verify JWT token is valid (hasn't expired after 7 days)
- Try logging in again to get a fresh token
- Check browser localStorage has the token: `localStorage.getItem('adminToken')`

### Blog submission fails
- Ensure you're logged in (token present)
- Check content is not empty
- Verify MongoDB connection in server console
- Check browser console for error details

### Blog content not formatting properly
- Make sure paragraphs are separated by blank lines
- Check for special characters that might break formatting
- Try shorter content first to isolate issues

## Next Steps

1. ✅ Create admin account
2. ✅ Login to dashboard
3. ✅ Add your first blog post
4. ✅ View blogs on main site at [/blogs](http://localhost:5000/blogs)
5. ⏳ **Future features**:
   - Edit existing blogs
   - Schedule blog publishing
   - Blog analytics (views, engagement)
   - Collaborative blog writing
   - Comment moderation

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors (F12)
3. Check server console output for database/API errors
4. See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for endpoint details

---

**Last Updated**: January 2026  
**Version**: 1.0.0
