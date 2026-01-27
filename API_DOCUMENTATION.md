# API Documentation - HackHalt Forms

## 📋 Base URL
```
http://localhost:5000
```

---

## 🔗 Form Submission Endpoints

### 1. Submit Contact Form
**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Partnership Inquiry",
  "message": "I'm interested in collaborating..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for contacting HackHalt CIC. We'll get back to you soon!",
  "submissionId": "507f1f77bcf86cd799439011"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

---

### 2. Submit Join Form
**Endpoint:** `POST /api/join`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "organization": "XYZ Corporation",
  "interests": "Cybersecurity Training, Workshops"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Welcome to HackHalt CIC! You'll receive confirmation email soon.",
  "submissionId": "507f1f77bcf86cd799439012"
}
```

---

### 3. Submit Blog Post
**Endpoint:** `POST /api/blog`

**Request Body:**
```json
{
  "title": "Cybersecurity Best Practices",
  "author": "John Doe",
  "category": "Security Tips",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Blog post submitted successfully!",
  "submissionId": "507f1f77bcf86cd799439013"
}
```

---

## 📊 Retrieval Endpoints

### 4. Get All Submissions
**Endpoint:** `GET /api/submissions`

**Response:**
```json
{
  "success": true,
  "counts": {
    "contact": 5,
    "join": 3,
    "blogs": 2
  },
  "submissions": {
    "contact": [...],
    "join": [...]
  }
}
```

---

### 5. Get Contact Submissions
**Endpoint:** `GET /api/submissions/contact`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "subject": "Partnership",
      "message": "I want to collaborate...",
      "createdAt": "2026-01-27T10:30:00.000Z"
    }
  ]
}
```

---

### 6. Get Join Submissions
**Endpoint:** `GET /api/submissions/join`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "organization": "XYZ Corp",
      "interests": "Cybersecurity",
      "createdAt": "2026-01-27T10:35:00.000Z"
    }
  ]
}
```

---

### 7. Get Blog Submissions
**Endpoint:** `GET /api/submissions/blogs`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Cybersecurity Best Practices",
      "author": "John Doe",
      "category": "Security Tips",
      "content": "Lorem ipsum...",
      "createdAt": "2026-01-27T10:40:00.000Z"
    }
  ]
}
```

---

## 🗑️ Delete Endpoints

### 8. Delete Contact Submission
**Endpoint:** `DELETE /api/submissions/contact/:id`

**Example:**
```
DELETE /api/submissions/contact/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "message": "Submission deleted"
}
```

---

### 9. Delete Join Submission
**Endpoint:** `DELETE /api/submissions/join/:id`

**Example:**
```
DELETE /api/submissions/join/507f1f77bcf86cd799439012
```

**Response:**
```json
{
  "success": true,
  "message": "Submission deleted"
}
```

---

## 📝 Request Validation

### Contact Form
- **name** (required) - Max 100 characters
- **email** (required) - Valid email format
- **phone** (optional) - Any format
- **subject** (optional) - Max 200 characters
- **message** (required) - Max 5000 characters

### Join Form
- **name** (required) - Max 100 characters
- **email** (required) - Valid email format
- **organization** (optional) - Max 200 characters
- **interests** (optional) - Max 500 characters

### Blog Form
- **title** (required) - Max 300 characters
- **author** (required) - Max 100 characters
- **category** (optional) - Max 100 characters
- **content** (required) - Max 50000 characters

---

## 🔄 Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "error": "Failed to process contact form"
}
```

---

## 🧪 Test with cURL

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "subject": "Test",
    "message": "This is a test"
  }'
```

### Test Get All Submissions
```bash
curl http://localhost:5000/api/submissions
```

### Test Delete
```bash
curl -X DELETE http://localhost:5000/api/submissions/contact/507f1f77bcf86cd799439011
```

---

## 🧪 Test with JavaScript

### Submit Contact Form
```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    subject: 'Partnership',
    message: 'I want to collaborate...'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Get All Submissions
```javascript
fetch('/api/submissions')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Delete Submission
```javascript
fetch('/api/submissions/contact/507f1f77bcf86cd799439011', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 🔐 Security Notes

✅ All inputs are validated
✅ Email validation enforced
✅ Character limits applied
✅ Data stored encrypted in MongoDB
✅ CORS configured
✅ Request size limited

---

## 📊 MongoDB Collections

### contactsubmissions
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  createdAt: Date
}
```

### joinsubmissions
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  organization: String,
  interests: String,
  createdAt: Date
}
```

### blogsubmissions
```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  category: String,
  content: String,
  createdAt: Date
}
```

---

## 🚀 Rate Limiting (Optional Enhancement)

Currently no rate limiting. To add in future:
- Limit requests per IP
- Limit requests per user email
- Implement CAPTCHA for forms

---

## 📈 Performance Tips

- Database indexes automatically created
- Queries sorted by createdAt (newest first)
- Pagination can be added if needed
- Use batch operations for bulk actions

---

## 🔗 Related Resources

- Admin Dashboard: http://localhost:5000/admin
- Contact Form: http://localhost:5000/contact
- Blog Form: http://localhost:5000/add-blog
- API Base: http://localhost:5000/api

---

**Last Updated:** 2026-01-27
**API Version:** 1.0.0
**Status:** ✅ Production Ready
