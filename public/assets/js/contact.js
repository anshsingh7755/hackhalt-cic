// assets/js/contact.js
// Contact page specific functionality

// DOM references
const joinForm = document.getElementById("joinForm");
const contactForm = document.getElementById("contactForm");

// Enhanced form submission with validation
function handleFormSubmit(form, isJoinForm = false) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

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
      // Send to backend API
      const endpoint = isJoinForm ? "/api/join" : "/api/contact";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Form submission failed");
      }

      // Show success message
      Notification.success(result.message);

      // Reset form
      form.reset();
      form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));

      // Track event
      Analytics.trackEvent(isJoinForm ? "join_submitted" : "contact_submitted", {
        role: data.role || data.subject
      });

    } catch (error) {
      Notification.error(error.message || "An error occurred. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// Handle contact form
if (contactForm) {
  handleFormSubmit(contactForm, false);

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
  handleFormSubmit(joinForm, true);

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

// Scroll reveal: use the shared `observer` from `main.js` if available.
const revealEls = document.querySelectorAll(".reveal");
if (typeof observer !== "undefined") {
  revealEls.forEach((el) => {
    try {
      observer.observe(el);
    } catch (e) {
      // ignore
    }
  });
}

// Track page view
Analytics.trackPageView("contact");

