// assets/js/main.js
// Shared functionality across all pages

// --- Theme handling --------------------------------------------------------
const root = document.documentElement;
const themeToggleBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("hh-theme", theme);

  if (!themeToggleBtn) return;
  const icon = themeToggleBtn.querySelector("i");
  if (theme === "light") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    themeToggleBtn.setAttribute("aria-label", "Switch to dark mode");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    themeToggleBtn.setAttribute("aria-label", "Switch to light mode");
  }
}

// Load saved theme or default to light
const savedTheme = localStorage.getItem("hh-theme") || "light";
applyTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}

// --- DOM references --------------------------------------------------------
const backToTopBtn = document.getElementById("backToTop");
const yearSpan = document.getElementById("year");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

// --- Utilities -------------------------------------------------------------
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


// Back to top button
window.addEventListener("scroll", () => {
  if (!backToTopBtn) return;
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Scroll reveal using IntersectionObserver
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

// Mobile nav toggle
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Mobile submenu touch support
const navItems = document.querySelectorAll(".nav-item-with-submenu");
navItems.forEach((item) => {
  const submenu = item.querySelector(".nav-submenu");
  if (!submenu) return;

  // Desktop: hover will handle it, mobile: click/touch will toggle
  item.addEventListener("touchstart", (e) => {
    // Prevent default hover behavior on touch
    if (window.innerWidth <= 768) {
      e.preventDefault();
      item.classList.toggle("open");
    }
  });

  item.addEventListener("click", (e) => {
    // On mobile, toggle submenu open state
    if (window.innerWidth <= 768) {
      const link = item.querySelector("a");
      if (e.target === link || e.target.closest("a")) {
        if (!item.classList.contains("open")) {
          e.preventDefault();
          item.classList.add("open");
        }
      }
    }
  });
});

// Close submenus when clicking outside
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!e.target.closest(".nav-item-with-submenu")) {
      navItems.forEach((item) => item.classList.remove("open"));
    }
  }
});

// Smooth scroll with offset
function smoothScroll(target, offset = 70) {
  const element = document.querySelector(target);
  if (!element) return;
  const offsetTop = element.offsetTop - offset;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
}

// Add accessibility features
document.addEventListener("keydown", (e) => {
  // Skip to main content (Alt + M)
  if (e.altKey && e.key === "m") {
    const mainContent = document.querySelector("main") || document.querySelector(".container");
    if (mainContent) mainContent.focus();
  }

  // Go back (Alt + B)
  if (e.altKey && e.key === "b") {
    window.history.back();
  }
});

// Enhance performance with intersection observer for images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    }
  });
}, { rootMargin: "50px" });

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});
