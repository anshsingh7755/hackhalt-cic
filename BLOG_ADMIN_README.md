# HackHalt CIC - Admin Blog Management System

## 🎯 Latest Update: Blog Admin & Content Formatting

This document summarizes the new blog admin system with secure authentication and proper content formatting.

## ✨ New Features

### 1. Admin Authentication System
- **Secure Login**: JWT-based authentication with 7-day token expiration
- **Password Hashing**: bcryptjs with salt rounds 10 for security
- **Role-Based Access**: Support for `admin` and `super-admin` roles
- **Admin Registration**: Super-admins can create additional admin accounts

### 2. Blog Admin Dashboard
Located at: `http://localhost:5000/blog-admin`

Features:
- **Dashboard**: Overview of total blogs, published, and draft counts
- **Add Blog**: Create new blog posts with rich metadata
- **Manage Blogs**: View, delete, and manage existing blogs
- **Organized Layout**: Responsive sidebar navigation with logout option

### 3. Protected Blog Submission
- **Authorization Required**: Only authenticated admins can submit blogs
- **JWT Token Verification**: Automatic token validation on blog POST
- **Admin Tracking**: Each blog automatically linked to the submitting admin via `adminId`

### 4. Blog Content Formatting
- **Paragraph Separation**: Blank lines automatically converted to `<p>` tags
- **Proper Typography**: Line height, margins, and font sizing optimized for readability
- **Modal Display**: Full blog content shown in beautiful formatted modal
- **Excerpt Preview**: Short preview shown in blog list, full content in modal

## 📁 Files Created/Modified

### New Files Created
```
public/admin-login.html          # Admin login page with secure form
public/blog-admin.html           # Blog admin dashboard and management
middleware/authMiddleware.js     # JWT token verification middleware
models/Admin.js                  # Admin user model with password hashing
create-admin.js                  # Script to create initial admin user
BLOG_ADMIN_SETUP.md             # Complete setup guide
```

### Modified Files
```
server.js                        # Added authentication endpoints and protected routes
package.json                     # Added bcryptjs and jsonwebtoken dependencies
public/assets/js/blogs.js       # Updated modal to format content with paragraphs
public/assets/css/style.css     # Added blog paragraph styling
```

## 🔧 Setup Instructions

### 1. Prerequisites
- MongoDB Atlas account with connection string
- Node.js environment set up
- `.env` file with `MONGODB_URI` configured

### 2. Create Initial Admin
```bash
node create-admin.js
```

Output will show:
```
Username: admin
Password: HackHalt@2025
```

### 3. Login and Use Dashboard
1. Go to http://localhost:5000/admin-login
2. Enter credentials from step 2
3. You'll be redirected to http://localhost:5000/blog-admin
4. Start managing blogs!

## 📚 API Endpoints

### Authentication
```
POST /api/admin/login          # Get JWT token
POST /api/admin/register       # Create new admin (super-admin only)
GET  /api/admin/profile        # Get current admin info
```

### Blog Management (Protected)
```
POST /api/blog                 # Submit new blog (requires auth)
GET  /api/submissions/blogs    # Get all blogs
DELETE /api/submissions/blog/:id  # Delete blog (requires auth)
```

## 🔐 Security Features

### Password Security
- Hashed with bcryptjs (salt 10)
- Not returned in API responses (select: false)
- Verified with `comparePassword()` method

### JWT Token Management
- Generated on successful login
- Valid for 7 days
- Stored in browser localStorage
- Verified on protected routes using authMiddleware

### Authorization Checks
- Blog submission endpoint checks JWT token
- Admin registration only by super-admin
- User info retrieved from decoded token (req.admin)

### Best Practices Implemented
- ✅ No plaintext passwords stored
- ✅ Tokens expire automatically
- ✅ Role-based access control
- ✅ Audit trails (adminId in blogs)
- ✅ Error messages don't reveal user existence

## 📝 Blog Content Formatting

### How to Format Blog Content

**Multiple paragraphs:**
```
First paragraph goes here. It can be as long as you need.

Second paragraph starts after a blank line.

Third paragraph continues the narrative.
```

**With lists:**
```
Here are key points:

1. First important point
2. Second important point
3. Third important point

Paragraph continues after the list.
```

**With code examples:**
```
Here's how to implement this:

```javascript
function example() {
  return "code";
}
```

Continue with regular paragraph text.
```

The system automatically:
- Splits content by blank lines
- Creates proper `<p>` tags
- Applies typography styling
- Preserves formatting in modal display

## 🎨 Frontend Components

### Admin Login Page (`admin-login.html`)
- Clean, modern login form
- Error/success message display
- Loading state with spinner
- Responsive design for mobile

### Blog Admin Dashboard (`blog-admin.html`)
- Sidebar navigation
- Dashboard with statistics
- Add Blog form with character counters
- Blog management table with actions
- Mobile-responsive layout

### Blog Display (`blogs.html`)
- Updated modal with formatted content
- Paragraph styling with proper line height
- Author and date information
- Full content visible in modal

## 🚀 Usage Workflow

### For Admin Users

1. **Login**
   - Visit admin-login page
   - Enter credentials
   - Get JWT token (auto-stored)

2. **Create Blog**
   - Click "Add Blog" tab
   - Fill form with:
     - Title (required)
     - Author name
     - Category
     - Excerpt
     - Content (with paragraph breaks)
     - Tags
   - Click "Publish Blog"

3. **Manage Blogs**
   - Click "Manage Blogs" tab
   - View all published blogs
   - Delete blogs with confirmation
   - Future: Edit and publish/unpublish

4. **View on Site**
   - Blogs appear on `/blogs` page
   - Click blog card to view full content
   - Content displays with proper formatting

### For Site Visitors

1. **Browse Blogs**
   - Visit `/blogs` page
   - Filter by category
   - Search for specific topics

2. **Read Blog**
   - Click any blog card
   - Full content opens in modal
   - Properly formatted paragraphs
   - Close with X button or ESC key

## 📊 Database Schema

### Admin Collection
```
{
  username: String (unique),
  email: String (unique),
  password: String (hashed, select: false),
  role: String (enum: ['admin', 'super-admin']),
  isActive: Boolean,
  createdAt: Date,
  lastLogin: Date
}
```

### BlogSubmission Collection
```
{
  title: String,
  author: String,
  category: String,
  content: String (max 50000 chars),
  excerpt: String (max 500 chars),
  image: String (URL),
  tags: [String],
  adminId: ObjectId (reference to Admin),
  isPublished: Boolean,
  viewCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## ⚙️ Configuration

### Environment Variables (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_2026    # Optional, defaults to 'hackhalt_secret_key_2026'
PORT=5000                           # Optional, defaults to 5000
```

### JWT Configuration
- Algorithm: HS256
- Expiration: 7 days
- Payload includes: id, username, email, role

## 🐛 Troubleshooting

### Issue: MongoDB connection fails
**Solution**: 
1. Check `.env` file has correct `MONGODB_URI`
2. Verify connection string format
3. Check MongoDB Atlas IP whitelist includes your IP

### Issue: "Invalid credentials" on login
**Solution**:
1. Run `create-admin.js` again to create/verify admin
2. Double-check username/password spelling
3. Clear browser cache and retry

### Issue: Blog submission fails with 401
**Solution**:
1. Check you're logged in (token in localStorage)
2. Verify token hasn't expired (7 days max)
3. Try logging out and logging back in

### Issue: Blog content not formatting
**Solution**:
1. Make sure paragraphs are separated by blank lines
2. Check content doesn't exceed 50,000 characters
3. Try with shorter test content first

## 🔄 Database Migration

If migrating from old JSON-based storage:

1. **Backup existing data**: `cp data/submissions.json data/submissions.json.backup`
2. **Export from MongoDB**: Use MongoDB Compass or CLI tools
3. **Update blog references**: Ensure all blogs linked to admin via `adminId`
4. **Verify published status**: Set `isPublished: true` for existing blogs

## 📈 Future Enhancements

- [ ] Edit existing blogs
- [ ] Draft blog status (unpublished)
- [ ] Schedule blog publishing
- [ ] Blog analytics (view counts, engagement)
- [ ] Comment system with moderation
- [ ] Rich text editor (WYSIWYG)
- [ ] Blog search with full-text indexing
- [ ] Author profiles
- [ ] Blog categorization by year
- [ ] Email notifications on new blogs

## 📞 Support Resources

- **Setup Guide**: See [BLOG_ADMIN_SETUP.md](./BLOG_ADMIN_SETUP.md)
- **API Documentation**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **MongoDB Setup**: See [MONGODB_SETUP.md](./MONGODB_SETUP.md)

## 📋 Checklist for Deployment

- [ ] MongoDB Atlas cluster created
- [ ] Connection string added to `.env`
- [ ] Admin user created with `create-admin.js`
- [ ] Test admin login works
- [ ] Create first test blog
- [ ] Verify formatting displays correctly
- [ ] Test on mobile/responsive
- [ ] Update any hardcoded references to `/add-blog`
- [ ] Add blog admin link to main navigation (optional)
- [ ] Deploy to production with environment variables

## 🔐 Security Checklist

- [ ] Change default admin password after first login
- [ ] Enable HTTPS in production
- [ ] Add rate limiting to login endpoint
- [ ] Set up CORS if needed
- [ ] Enable MongoDB IP whitelist
- [ ] Use strong JWT_SECRET in production
- [ ] Enable CSRF protection if not already present
- [ ] Set up audit logging for admin actions
- [ ] Regular security updates for dependencies
- [ ] Implement blog comment moderation if needed

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Author**: HackHalt Development Team
