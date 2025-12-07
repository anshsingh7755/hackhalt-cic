# HackHalt CIC - API Documentation

## Base URL
```
http://localhost:5000
```

---

## Endpoints

### 1. Contact Form Submission

**Endpoint:** `POST /api/contact`

**Description:** Submit a contact form inquiry

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (optional, valid phone format)",
  "message": "string (required, min 10 characters)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "message": "I would like to know more about your events and training programs."
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for contacting HackHalt CIC. We'll get back to you soon!",
  "submissionId": 1733597640123
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

**Status Codes:**
- `200`: Submission successful
- `400`: Invalid or missing required fields
- `500`: Server error during processing

---

### 2. Join/Newsletter Submission

**Endpoint:** `POST /api/join`

**Description:** Submit a join/newsletter registration form

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "organization": "string (optional)",
  "interests": "string (optional, comma-separated tags)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/join \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "organization": "Tech Corp India",
    "interests": "CTF,Training,Research"
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Welcome to HackHalt CIC! You'll receive confirmation email soon.",
  "submissionId": 1733597640456
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

**Status Codes:**
- `200`: Submission successful
- `400`: Invalid or missing required fields
- `500`: Server error during processing

---

### 3. Get All Submissions (Admin/Testing)

**Endpoint:** `GET /api/submissions`

**Description:** Retrieve all stored submissions (contact and join)

**Request:** No body required

**Example Request:**
```bash
curl http://localhost:5000/api/submissions
```

**Response (200):**
```json
{
  "contactSubmissions": 5,
  "joinSubmissions": 3,
  "submissions": {
    "contact": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+91-9876543210",
        "message": "Inquiry message",
        "timestamp": "2025-12-07T10:30:00.000Z",
        "id": 1733597640123
      }
    ],
    "join": [
      {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "organization": "Tech Corp",
        "interests": "CTF,Training",
        "timestamp": "2025-12-07T10:35:00.000Z",
        "id": 1733597640456
      }
    ]
  }
}
```

---

## Form Validation

### Contact Form Validation Rules

| Field | Type | Rules |
|-------|------|-------|
| name | string | Required, 2-100 characters |
| email | string | Required, valid email format |
| phone | string | Optional, must be valid phone format if provided |
| message | string | Required, minimum 10 characters |

### Join Form Validation Rules

| Field | Type | Rules |
|-------|------|-------|
| name | string | Required, 2-100 characters |
| email | string | Required, valid email format |
| organization | string | Optional |
| interests | string | Optional, comma-separated values |

---

## Error Handling

### Common Error Scenarios

**Missing Required Fields:**
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

**Invalid Email Format:**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

**Message Too Short:**
```json
{
  "success": false,
  "error": "Message must be at least 10 characters"
}
```

**Server Error:**
```json
{
  "success": false,
  "error": "Failed to process contact form"
}
```

---

## Integration Examples

### JavaScript/Fetch

```javascript
// Contact Form Submission
async function submitContact(data) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Submission successful:', result.submissionId);
      // Show success notification
    } else {
      console.error('Submission failed:', result.error);
      // Show error notification
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Usage
submitContact({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91-9876543210',
  message: 'Hello, I am interested in your training programs.'
});
```

### Python/Requests

```python
import requests
import json

def submit_contact(data):
    url = 'http://localhost:5000/api/contact'
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, json=data, headers=headers)
    result = response.json()
    
    if result['success']:
        print(f"Submission successful: {result['submissionId']}")
    else:
        print(f"Error: {result['error']}")

# Usage
data = {
    'name': 'John Doe',
    'email': 'john@example.com',
    'phone': '+91-9876543210',
    'message': 'I am interested in cybersecurity training.'
}

submit_contact(data)
```

### cURL

```bash
# Contact Form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "message": "Hello, I am interested in your events."
  }'

# Join Form
curl -X POST http://localhost:5000/api/join \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "organization": "Tech Corp",
    "interests": "CTF,Awareness"
  }'

# Get All Submissions
curl http://localhost:5000/api/submissions
```

---

## Production Deployment Notes

### Before Going Live:

1. **Replace In-Memory Storage:**
   ```javascript
   // Current: let submissions = { contact: [], join: [] };
   // Production: Use MongoDB, PostgreSQL, or other database
   ```

2. **Add Email Integration:**
   ```javascript
   // Example with SendGrid
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
   await sgMail.send({
     to: data.email,
     from: 'support@hackhalt.com',
     subject: 'Thank you for contacting HackHalt CIC',
     html: '<p>We received your message and will respond soon.</p>'
   });
   ```

3. **Add Authentication:**
   ```javascript
   // Secure endpoints with API keys or OAuth
   app.post('/api/contact', authenticateRequest, handleContact);
   ```

4. **Add Rate Limiting:**
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   app.use('/api/', limiter);
   ```

5. **Add HTTPS:**
   - Deploy with SSL certificate
   - Update API endpoints to use https://

6. **Environment Variables:**
   ```bash
   # .env file
   PORT=5000
   DATABASE_URL=your_database_url
   SENDGRID_API_KEY=your_api_key
   EMAIL_FROM=support@hackhalt.com
   ```

---

## Monitoring & Logging

### Access Logs
All submissions are logged to console:
```
Contact submission received: { name, email, phone, timestamp }
Join submission received: { name, email, organization, timestamp }
```

### Error Logs
```
Error processing contact form: [error message]
Error processing join form: [error message]
```

### View Submissions via API
```bash
curl http://localhost:5000/api/submissions | python -m json.tool
```

---

## Rate Limits & Best Practices

- **Max Submissions per IP:** 100 per 15 minutes (recommended)
- **Request Timeout:** 30 seconds
- **Max Request Size:** 1MB
- **Allowed Methods:** POST (forms), GET (admin)
- **CORS:** Configure for your domain

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 7, 2025 | Initial release with 3 endpoints |

---

## Support

For API issues or integration questions, contact: **support@hackhalt.com**

---

*Last Updated: December 7, 2025*
