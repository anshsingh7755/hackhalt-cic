# HackHalt CIC - Multi-Page Website

## Overview

The HackHalt website has been successfully converted from a single-page application to a multi-page website with dedicated routes and pages for better organization, navigation, and SEO.

## Website Structure

### Pages

1.  **Home (/)** - `index.html`
    
    -   Hero section showcasing HackHalt CIC
    -   Join membership form
    -   Contact section
    -   Quick call-to-actions to explore other sections
2.  **About (/about)** - `about.html`
    
    -   Mission and vision statement
    -   What we do section
    -   Four core pillars (Prevention, Education, Detection, Rapid Response)
    -   Impact statistics
    -   Call-to-action to get involved
3.  **Blogs (/blogs)** - `blogs.html`
    
    -   Full-page blog listing with filtering
    -   Category filters (All, Threat Intel, Awareness, Policy & Governance)
    -   Blog cards with modal view
    -   Read time and publication date
4.  **Events (/events)** - `events.html`
    
    -   Upcoming events section
    -   Past events section
    -   Tabbed navigation between upcoming and past events
    -   Event details including type, location, and description
5.  **Partners (/partners)** - `partners.html`
    
    -   Event partners section
    -   Government partnerships section
    -   Partnership types information
    -   Call-to-action for new partnership opportunities
6.  **Contact (/contact)** - `contact.html`
    
    -   Contact information and details
    -   Contact form for inquiries
    -   Join membership form
    -   Links to social media and email
7.  **404 Error Page** - `404.html`
    
    -   Custom 404 page with quick navigation links
    -   Helpful suggestions for users who land on non-existent pages

## Backend Changes

### Server Routes

Updated `server.js` with the following routes:

```javascript
GET /           → index.html (Home)GET /about      → about.htmlGET /blogs      → blogs.htmlGET /events     → events.htmlGET /partners   → partners.htmlGET /contact    → contact.html
```

### 404 Handling

All undefined routes now serve the custom 404.html page with helpful navigation.

## JavaScript Architecture

### Shared Functionality (`main.js`)

Contains common functionality used across all pages:

-   Theme toggling (light/dark mode)
-   Year display in footer
-   Back-to-top button
-   Scroll reveal animations
-   Mobile navigation toggle
-   Shared event listeners

### Page-Specific Scripts

#### `blogs.js` (loaded on /blogs)

-   Blog data array
-   Blog rendering and filtering
-   Modal functionality for reading full articles
-   Filter chip event handling
-   Scroll reveal for blog cards

#### `events.js` (loaded on /events)

-   Events data (upcoming and past)
-   Event rendering functions
-   Tab switching between upcoming and past events
-   Scroll reveal for event cards

#### `contact.js` (loaded on /contact)

-   Form submission handlers (demo)
-   Contact form functionality
-   Join form functionality
-   Scroll reveal for contact elements

## CSS Enhancements

Added new styles in `style.css`:

-   `.hero-section-alt` - Alternative hero section for non-home pages
-   `.stat-card` - Statistics display cards with hover effects
-   `.cta-block` - Call-to-action blocks with gradient backgrounds
-   `.partnership-card` - Cards for displaying partnership information
-   `.quick-nav-card` - Quick navigation cards for 404 page
-   `.card-link` - Links that display cards with smooth transitions

## Features Retained

✅ Dark/Light theme toggle✅ Smooth scroll animations✅ Mobile-responsive design✅ Blog filtering and modal view✅ Events tabbed navigation✅ Back-to-top button✅ Form handling (demo)✅ SEO-optimized titles and meta descriptions✅ Font Awesome icons throughout✅ Consistent design language

## Navigation

All pages include:

-   Consistent header with navigation menu
-   Logo and site title
-   Active page indicator in navigation
-   Mobile hamburger menu
-   Footer with quick links and social media

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Uses nodemon to auto-restart on file changes.

### Production

```bash
npm start
```

Runs on port 5000 by default (configurable via PORT environment variable).

## File Structure

```
hackhalt-cic/├── public/│   ├── 404.html│   ├── about.html│   ├── blogs.html│   ├── contact.html│   ├── events.html│   ├── index.html│   ├── partners.html│   ├── assets/│   │   ├── css/│   │   │   └── style.css│   │   └── js/│   │       ├── blogs.js│   │       ├── contact.js│   │       ├── events.js│   │       └── main.js│   └── images/├── server.js└── package.json
```

## Browser Support

-   Chrome (latest)
-   Firefox (latest)
-   Safari (latest)
-   Edge (latest)
-   Mobile browsers

## Future Enhancements

-   Backend API integration for forms
-   Blog data from database
-   Event calendar integration
-   Dynamic content loading
-   Email notifications
-   Admin dashboard for content management

## Notes

-   All forms are demo implementations (logs to console)
-   Government partnership logos are placeholders
-   Partner logos should be updated when finalizing partnerships
-   Consider implementing database for blogs and events in production

---

**Built with:** Express.js, HTML5, CSS3, Vanilla JavaScript**Last Updated:** December 7, 2025