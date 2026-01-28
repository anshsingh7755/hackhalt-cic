require('dotenv').config();
const express = require("express");
const path = require("path");
const jwt = require('jsonwebtoken');
const connectDB = require("./db-connect");
const ContactSubmission = require("./models/ContactSubmission");
const JoinSubmission = require("./models/JoinSubmission");
const BlogSubmission = require("./models/BlogSubmission");
const BookingSession = require("./models/BookingSession");
const Admin = require("./models/Admin");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration for Vercel
app.use((req, res, next) => {
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    process.env.FRONTEND_URL || ''
  ].filter(Boolean);

  if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'production') {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
connectDB();

// Routes for multi-page website
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/community", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "community.html"));
});

app.get("/blogs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "blogs.html"));
});

app.get("/events", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "events.html"));
});

app.get("/partners", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "partners.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/legal-compliance", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "legal-compliance.html"));
});

app.get("/book-session", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "book-session.html"));
});

app.get("/add-blog", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "add-blog.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("/admin-login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin-login.html"));
});

app.get("/blog-admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "blog-admin.html"));
});

// ========== API ENDPOINTS ==========

// GET /api/health - Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    const mongoStatus = require('mongoose').connection.readyState;
    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    const mongoStatusText = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }[mongoStatus] || 'unknown';

    res.json({
      success: true,
      message: "Server is running",
      mongodb: mongoStatusText,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========== ADMIN AUTHENTICATION ==========

// POST /api/admin/login - Admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "Missing username or password"
      });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username }).select("+password");
    
    if (!admin) {
      console.warn(`Login attempt for non-existent user: ${username}`);
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    // Compare password
    let isPasswordValid = false;
    try {
      isPasswordValid = await admin.comparePassword(password);
    } catch (compareError) {
      console.error('Password comparison error:', compareError);
      return res.status(500).json({
        success: false,
        error: "Authentication error occurred"
      });
    }
    
    if (!isPasswordValid) {
      console.warn(`Invalid password for user: ${username}`);
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        error: "Admin account is inactive"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username,
        email: admin.email,
        role: admin.role 
      },
      process.env.JWT_SECRET || 'hackhalt_secret_key_2026',
      { expiresIn: '7d' }
    );

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    console.log(`Admin login successful: ${username}`);

    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Error during admin login:", error.message);
    console.error("Error stack:", error.stack);
    
    // Provide more specific error messages for debugging
    let errorMessage = "Failed to process login";
    if (error.message.includes('connect')) {
      errorMessage = "Database connection error - MongoDB may not be accessible";
    } else if (error.message.includes('ENOTFOUND')) {
      errorMessage = "Cannot connect to database server";
    } else if (error.message.includes('ECONNREFUSED')) {
      errorMessage = "Database connection refused";
    }
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/admin/register - Create new admin (protected)
app.post("/api/admin/register", authMiddleware, async (req, res) => {
  try {
    // Check if requester is super-admin
    const requester = await Admin.findById(req.admin.id);
    if (requester.role !== 'super-admin') {
      return res.status(403).json({
        success: false,
        error: "Only super-admin can create new admins"
      });
    }

    const { username, email, password, role } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: "Username or email already exists"
      });
    }

    // Create new admin
    const newAdmin = new Admin({
      username,
      email,
      password,
      role: role || 'admin',
      isActive: true
    });

    await newAdmin.save();

    console.log(`New admin created: ${username}`);

    res.json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create admin"
    });
  }
});

// GET /api/admin/profile - Get current admin profile
app.get("/api/admin/profile", authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "Admin not found"
      });
    }

    res.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        createdAt: admin.createdAt,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch profile"
    });
  }
});

// POST /api/contact - Handle contact form submissions
app.post("/api/contact", async (req, res) => {
  console.log("🔵 POST /api/contact received at", new Date().toISOString());
  console.log("📦 Request body:", req.body);
  
  try {
    const { name, email, message, phone, subject } = req.body;
    console.log("📋 Extracted fields:", { name, email, message, phone, subject });

    // Validation
    if (!name || !email || !message) {
      console.warn("❌ Validation failed - missing required fields");
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // Create new contact submission
    const contactSubmission = new ContactSubmission({
      name,
      email,
      phone,
      subject,
      message
    });
    console.log("📝 ContactSubmission object created");

    // Save to MongoDB
    const savedSubmission = await contactSubmission.save();
    console.log("✅ Contact submission saved with ID:", savedSubmission._id);

    console.log("✉️ Contact submission received:", { name, email, phone, timestamp: new Date() });

    res.json({
      success: true,
      message: "Thank you for contacting HackHalt CIC. We'll get back to you soon!",
      submissionId: savedSubmission._id
    });
    console.log("📤 Response sent successfully");
  } catch (error) {
    console.error("❌ Error processing contact form:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process contact form"
    });
  }
});

// POST /api/join - Handle join form submissions
app.post("/api/join", async (req, res) => {
  try {
    const { name, email, organization, interests } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // Create new join submission
    const joinSubmission = new JoinSubmission({
      name,
      email,
      organization,
      interests
    });

    // Save to MongoDB
    const savedSubmission = await joinSubmission.save();

    console.log("Join submission received:", { name, email, organization, timestamp: new Date() });

    res.json({
      success: true,
      message: "Welcome to HackHalt CIC! You'll receive confirmation email soon.",
      submissionId: savedSubmission._id
    });
  } catch (error) {
    console.error("Error processing join form:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process join form"
    });
  }
});

// POST /api/book-session - Handle booking session submissions
app.post("/api/book-session", async (req, res) => {
  try {
    const { name, email, organisation, package: packageType, dates, message } = req.body;

    // Validation
    if (!name || !email || !packageType) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // Create new booking session
    const bookingSession = new BookingSession({
      name,
      email,
      organisation,
      package: packageType,
      dates,
      message
    });

    // Save to MongoDB
    const savedSubmission = await bookingSession.save();

    console.log("🔵 Booking session received:", { name, email, organisation, package: packageType, timestamp: new Date() });

    res.json({
      success: true,
      message: "Thank you for your booking request! We will contact you with availability.",
      submissionId: savedSubmission._id
    });
  } catch (error) {
    console.error("❌ Error processing booking form:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process booking form"
    });
  }
});

// GET /api/submissions/bookings - Get all booking submissions
app.get("/api/submissions/bookings", async (req, res) => {
  try {
    const submissions = await BookingSession.find().sort({ createdAt: -1 });
    console.log("📊 Found", submissions.length, "booking sessions");
    res.json({
      success: true,
      submissions: submissions
    });
  } catch (error) {
    console.error("❌ Error fetching booking submissions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch booking submissions"
    });
  }
});

// DELETE /api/submissions/bookings/:id - Delete booking submission
app.delete("/api/submissions/bookings/:id", async (req, res) => {
  try {
    await BookingSession.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Booking deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete booking"
    });
  }
});

// GET /api/submissions - Get all submissions (for admin/testing)
app.get("/api/submissions", async (req, res) => {
  try {
    const [contactSubmissions, joinSubmissions, blogSubmissions, bookingSubmissions] = await Promise.all([
      ContactSubmission.find().sort({ createdAt: -1 }),
      JoinSubmission.find().sort({ createdAt: -1 }),
      BlogSubmission.find().sort({ createdAt: -1 }),
      BookingSession.find().sort({ createdAt: -1 })
    ]);

    res.json({
      success: true,
      counts: {
        contact: contactSubmissions.length,
        join: joinSubmissions.length,
        blogs: blogSubmissions.length,
        bookings: bookingSubmissions.length
      },
      submissions: {
        contact: contactSubmissions,
        join: joinSubmissions,
        bookings: bookingSubmissions
      }
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch submissions"
    });
  }
});

// POST /api/blog - Handle blog submissions (protected)
app.post("/api/blog", authMiddleware, async (req, res) => {
  try {
    const { title, author, category, content, excerpt, image, tags } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: title and content"
      });
    }

    // Create new blog submission with adminId
    const blogSubmission = new BlogSubmission({
      title,
      author: author || "Anonymous",
      category: category || "General",
      content,
      excerpt: excerpt || content.substring(0, 500),
      image: image || null,
      tags: tags || [],
      adminId: req.admin.id,
      isPublished: true
    });

    // Save to MongoDB
    const savedSubmission = await blogSubmission.save();

    console.log("Blog submission received:", { title, author, adminId: req.admin.id, timestamp: new Date() });

    res.json({
      success: true,
      message: "Blog post submitted successfully!",
      submissionId: savedSubmission._id
    });
  } catch (error) {
    console.error("Error processing blog form:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process blog form"
    });
  }
});

// GET /api/submissions/contact - Get all contact submissions
app.get("/api/submissions/contact", async (req, res) => {
  console.log("🔵 GET /api/submissions/contact requested at", new Date().toISOString());
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    console.log("📊 Found", submissions.length, "contact submissions");
    console.log("📋 Submissions data:", submissions);
    
    const response = {
      success: true,
      submissions: submissions
    };
    console.log("📤 Sending response:", response);
    res.json(response);
  } catch (error) {
    console.error("❌ Error fetching contact submissions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch contact submissions"
    });
  }
});

// GET /api/submissions/join - Get all join submissions
app.get("/api/submissions/join", async (req, res) => {
  try {
    const submissions = await JoinSubmission.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      submissions: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch join submissions"
    });
  }
});

// GET /api/submissions/blogs - Get all blog submissions
app.get("/api/submissions/blogs", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const submissions = await BlogSubmission.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json({
      success: true,
      submissions: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch blog submissions"
    });
  }
});

// DELETE /api/submissions/contact/:id - Delete contact submission
app.delete("/api/submissions/contact/:id", async (req, res) => {
  try {
    await ContactSubmission.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Submission deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete submission"
    });
  }
});

// DELETE /api/submissions/join/:id - Delete join submission
app.delete("/api/submissions/join/:id", async (req, res) => {
  try {
    await JoinSubmission.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Submission deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete submission"
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Export for Vercel
module.exports = app;

// Only listen locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`HackHalt CIC server running at http://localhost:${PORT}`);
  });
}
