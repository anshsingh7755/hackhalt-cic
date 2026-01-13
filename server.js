const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// In-memory storage for form submissions (use database in production)
let submissions = {
  contact: [],
  join: []
};

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

// ========== API ENDPOINTS ==========

// POST /api/contact - Handle contact form submissions
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // Store submission
    submissions.contact.push({
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });

    console.log("Contact submission received:", { name, email, phone, timestamp: new Date() });

    // In production: Send email, integrate with ticketing system, etc.
    res.json({
      success: true,
      message: "Thank you for contacting HackHalt CIC. We'll get back to you soon!",
      submissionId: submissions.contact[submissions.contact.length - 1].id
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process contact form"
    });
  }
});

// POST /api/join - Handle join form submissions
app.post("/api/join", (req, res) => {
  try {
    const { name, email, organization, interests } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // Store submission
    submissions.join.push({
      name,
      email,
      organization,
      interests,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });

    console.log("Join submission received:", { name, email, organization, timestamp: new Date() });

    // In production: Send confirmation email, add to newsletter, etc.
    res.json({
      success: true,
      message: "Welcome to HackHalt CIC! You'll receive confirmation email soon.",
      submissionId: submissions.join[submissions.join.length - 1].id
    });
  } catch (error) {
    console.error("Error processing join form:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process join form"
    });
  }
});

// GET /api/submissions - Get all submissions (for admin/testing)
app.get("/api/submissions", (req, res) => {
  res.json({
    contactSubmissions: submissions.contact.length,
    joinSubmissions: submissions.join.length,
    submissions
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`HackHalt CIC server running at http://localhost:${PORT}`);
});
