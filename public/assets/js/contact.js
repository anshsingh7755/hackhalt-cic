// assets/js/contact.js
// Contact page specific functionality

console.log('🟢 contact.js loaded at top level');

// Function to initialize form handlers when DOM is ready
function initializeFormHandlers() {
  console.log('🔵 initializeFormHandlers() called');
  
  const joinForm = document.getElementById("joinForm");
  const contactForm = document.getElementById("contactForm");

  console.log('📋 contactForm element:', contactForm);
  console.log('📋 joinForm element:', joinForm);
  
  if (!contactForm && !joinForm) {
    console.error('❌ NO FORMS FOUND! This is the problem!');
    return;
  }

  // Enhanced form submission with validation
  function handleFormSubmit(form, isJoinForm = false) {
    console.log('🟡 Attaching listener to form, isJoinForm=', isJoinForm);
    
    form.addEventListener("submit", async (e) => {
      console.log('🔴 FORM SUBMIT EVENT FIRED!');
      console.log('Is join form?', isJoinForm);
      e.preventDefault();
      e.stopPropagation();
      console.log('🔴 preventDefault() called');

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form
    const validation = FormValidator.validateForm(data);

    // Show validation errors
    const errorElements = form.querySelectorAll(".form-error");
    errorElements.forEach((el) => el.remove());

    if (!validation.isValid) {
      Object.keys(validation.errors).forEach((field) => {
        const input = form.querySelector(`[name="${field}"]`);
        if (input) {
          const errorDiv = document.createElement("div");
          errorDiv.className = "form-error";
          errorDiv.textContent = validation.errors[field];
          input.parentElement.appendChild(errorDiv);
          input.classList.add("error");
        }
      });
      Notification.error("Please fix the errors above");
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

    try {
      console.log('⚡ INSIDE TRY BLOCK - Form submission in progress');
      
      // Send to backend API
      const endpoint = isJoinForm ? "/api/join" : "/api/contact";
      console.log('🚀 Submitting form to:', endpoint);
      console.log('📦 Form data:', data);
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      console.log('✅ Response status:', response.status);
      console.log('📊 Response data:', result);
      console.log('Response ok?:', response.ok);

      if (!response.ok) {
        const errorMsg = result.error || "Form submission failed";
        console.error('❌ Response not ok. Error:', errorMsg);
        throw new Error(errorMsg);
      }

      // Show success message with thank you
      const thankYouMessage = isJoinForm 
        ? `✨ Thank You! We're excited to have you join us. We'll review your information and get back to you soon.`
        : `✨ Thank You! We appreciate your message and will get back to you as soon as possible.`;
      
      console.log('✨ Showing thank you message');
      
      // Verify Notification object exists
      if (typeof Notification === 'undefined') {
        console.error('❌ Notification object is undefined!');
      } else {
        console.log('✅ Notification object exists:', Notification);
      }
      
      if (typeof Notification.success !== 'function') {
        console.error('❌ Notification.success is not a function!', typeof Notification.success);
      } else {
        console.log('✅ Notification.success is a function');
      }
      
      // Show notification
      console.log('🔔 Calling Notification.success()');
      try {
        Notification.success(thankYouMessage, 6000);
        console.log('🔔 Notification.success() called');
      } catch (notifError) {
        console.error('❌ Notification.success() failed:', notifError);
      }

      console.log('🔄 Resetting form');
      // Reset form
      form.reset();
      form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));

      // Track event
      console.log('📈 Tracking event');
      Analytics.trackEvent(isJoinForm ? "join_submitted" : "contact_submitted", {
        role: data.role || data.subject
      });
      
      console.log('✅ Form submission completed successfully');

    } catch (error) {
      console.error("❌ Form submission error:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      Notification.error(error.message || "An error occurred. Please try again.");

    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// Handle contact form
  if (contactForm) {
    console.log('✅ Contact form found, attaching handler');
    handleFormSubmit(contactForm, false);
    console.log('✅ Contact form handler attached');

    // Add real-time validation
    contactForm.querySelectorAll("input, textarea, select").forEach((field) => {
      field.addEventListener("blur", () => {
        const value = field.value;
        const name = field.name;
        const validation = FormValidator.validateForm({ [name]: value });

        const errorDiv = field.parentElement.querySelector(".form-error");
        if (errorDiv) errorDiv.remove();

        if (!validation.isValid && value.trim()) {
          const error = document.createElement("div");
          error.className = "form-error";
          error.textContent = validation.errors[name];
          field.parentElement.appendChild(error);
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });

      // Clear error on input
      field.addEventListener("input", () => {
        const errorDiv = field.parentElement.querySelector(".form-error");
        if (errorDiv) errorDiv.remove();
        field.classList.remove("error");
      });
    });
  }

  // Handle join form
  if (joinForm) {
    console.log('✅ Join form found, attaching handler');
    handleFormSubmit(joinForm, true);
    console.log('✅ Join form handler attached');

    // Add real-time validation
    joinForm.querySelectorAll("input, textarea, select").forEach((field) => {
      field.addEventListener("blur", () => {
        const value = field.value;
        const name = field.name;
        const validation = FormValidator.validateForm({ [name]: value });

        const errorDiv = field.parentElement.querySelector(".form-error");
        if (errorDiv) errorDiv.remove();

        if (!validation.isValid && value.trim()) {
          const error = document.createElement("div");
          error.className = "form-error";
          error.textContent = validation.errors[name];
          field.parentElement.appendChild(error);
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });

      // Clear error on input
      field.addEventListener("input", () => {
        const errorDiv = field.parentElement.querySelector(".form-error");
        if (errorDiv) errorDiv.remove();
        field.classList.remove("error");
      });
    });
  }

  console.log('✅ initializeFormHandlers() completed');
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
  console.log('📍 DOM still loading, waiting for DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', initializeFormHandlers);
} else {
  console.log('📍 DOM already loaded, calling initializeFormHandlers immediately');
  initializeFormHandlers();
}

// Also add window.onload as extra safety
window.addEventListener('load', () => {
  console.log('📍 Window load event fired');
  if (document.getElementById('contactForm')) {
    console.log('✅ contactForm still exists after window load');
  }
});

// Note: Scroll reveal is handled by main.js
// Note: Analytics is handled by main.js

