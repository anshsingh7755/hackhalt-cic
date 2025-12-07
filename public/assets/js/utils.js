// assets/js/utils.js
// Utility functions for form validation, storage, and helpers

/**
 * Form Validation Utilities
 */
const FormValidator = {
  // Email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone validation (basic)
  isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  // Name validation
  isValidName(name) {
    return name.trim().length >= 2;
  },

  // Message validation
  isValidMessage(message) {
    return message.trim().length >= 10;
  },

  // Validate all form fields
  validateForm(formData) {
    const errors = {};

    if (formData.name && !this.isValidName(formData.name)) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (formData.email && !this.isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (formData.phone && formData.phone && !this.isValidPhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (formData.message && !this.isValidMessage(formData.message)) {
      errors.message = 'Message must be at least 10 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors
    };
  }
};

/**
 * Local Storage Utilities
 */
const StorageManager = {
  // Save data to localStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  },

  // Get data from localStorage
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage error:', e);
      return null;
    }
  },

  // Remove data from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  },

  // Clear all localStorage
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  }
};

/**
 * Notification System
 */
const Notification = {
  show(message, type = 'info', duration = 4000) {
    // Create notification element
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.setAttribute('role', 'alert');
    notif.innerHTML = `
      <div class="notification-content">
        <i class="fa-solid ${this.getIcon(type)}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close" aria-label="Close notification">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    // Add to page
    document.body.appendChild(notif);

    // Trigger animation
    setTimeout(() => notif.classList.add('visible'), 10);

    // Close button
    notif.querySelector('.notification-close').addEventListener('click', () => {
      this.remove(notif);
    });

    // Auto-remove
    setTimeout(() => this.remove(notif), duration);
  },

  remove(notif) {
    notif.classList.remove('visible');
    setTimeout(() => notif.remove(), 300);
  },

  getIcon(type) {
    const icons = {
      'success': 'fa-check-circle',
      'error': 'fa-exclamation-circle',
      'warning': 'fa-warning',
      'info': 'fa-info-circle'
    };
    return icons[type] || icons.info;
  },

  success(message) {
    this.show(message, 'success');
  },

  error(message) {
    this.show(message, 'error', 5000);
  },

  warning(message) {
    this.show(message, 'warning');
  }
};

/**
 * Search Utilities
 */
const SearchUtil = {
  // Simple search function
  search(items, query, fields) {
    if (!query.trim()) return items;

    const lowerQuery = query.toLowerCase();
    return items.filter(item => {
      return fields.some(field => {
        const value = item[field];
        return value && value.toLowerCase().includes(lowerQuery);
      });
    });
  },

  // Highlight search terms
  highlightText(text, query) {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
};

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Analytics helper
 */
const Analytics = {
  trackEvent(eventName, eventData = {}) {
    const event = {
      name: eventName,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...eventData
    };

    console.log('Event tracked:', event);

    // In production, send to analytics service
    // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) })
  },

  trackPageView(pageName) {
    this.trackEvent('page_view', { page: pageName });
  }
};
