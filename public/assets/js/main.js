// assets/js/main.js

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

// Load saved theme or default to dark
const savedTheme = localStorage.getItem("hh-theme") || "dark";
applyTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}

// --- Data (Blogs, Events) --------------------------------------------------
const blogs = [
  {
    id: 1,
    title: "Top 10 Social Engineering Red Flags in 2025",
    category: "awareness",
    date: "Nov 2025",
    readTime: "6 min read",
    excerpt: "From phishing emails to voice scams, learn how to detect and defend...",
    content:
      "Social engineering remains one of the most effective intrusion techniques because it targets people, not systems. In this article, we explore the top 10 behavioural and technical red flags that should immediately trigger suspicion—spanning emails, calls, social media, and even in-person interactions. We also outline practical defence checklists that individuals and teams can adopt as daily habits."
  },
  {
    id: 2,
    title: "Anatomy of a Ransomware Incident: Lessons from the Field",
    category: "threats",
    date: "Oct 2025",
    readTime: "9 min read",
    excerpt: "A practical walkthrough of how ransomware spreads and how teams respond...",
    content:
      "Ransomware incidents often follow a repeatable kill chain: initial access, privilege escalation, lateral movement, payload deployment, and extortion. Drawing from anonymised case studies, this deep dive breaks down each phase with concrete technical examples and highlights where early detection could have prevented escalation. We also provide an incident response checklist tailored for small and mid-sized organisations."
  },
  {
    id: 3,
    title: "Designing a Cyber-Aware Campus: Playbook for Institutions",
    category: "policy",
    date: "Sep 2025",
    readTime: "7 min read",
    excerpt: "Institutions need structured governance, not just one-time workshops...",
    content:
      "Educational institutions are high-value targets with unique challenges: open networks, large user bases, and diverse devices. This playbook proposes a layered approach including governance committees, annual cyber drills, role-based access controls, and student-led security clubs. It also maps institutional controls to popular frameworks, making it easier to adopt, measure, and report maturity."
  },
  {
    id: 4,
    title: "Building a Personal Cyber Hygiene Routine",
    category: "awareness",
    date: "Aug 2025",
    readTime: "4 min read",
    excerpt: "Five simple habits that drastically reduce everyday cyber risk...",
    content:
      "Cyber hygiene does not need to be complicated. By adopting a simple weekly routine—patching, password review, backup checks, phishing simulations, and privacy settings review—individuals can significantly reduce exposure. The article provides a step-by-step weekly checklist that anyone can adopt, including non-technical users."
  },
  {
    id: 5,
    title: "From Indicators of Compromise to Actionable Intel",
    category: "threats",
    date: "Jul 2025",
    readTime: "8 min read",
    excerpt: "How to convert raw indicators into operational security decisions...",
    content:
      "Threat feeds are only valuable when contextualised. We walk through how to process IPs, domains, and file hashes from multiple sources, enrich them with context, and integrate them into SIEM/SOC workflows. The article also discusses common pitfalls like over-blocking and alert fatigue, and suggests ways to implement feedback loops with incident response teams."
  },
  {
    id: 6,
    title: "Framing a Cybersecurity Policy for Startups",
    category: "policy",
    date: "Jun 2025",
    readTime: "5 min read",
    excerpt: "Lean but effective policy guardrails for fast-moving teams...",
    content:
      "Startups often delay cybersecurity policies until after an incident. This article introduces a lightweight, startup-friendly policy framework covering access control, device usage, data handling, third-party tools, and breach reporting. It emphasises practicality, minimal bureaucracy, and clear accountability while mapping to basic compliance requirements."
  }
];

const upcomingEvents = [
  {
    title: "HackHalt Cyber Defence Summit 2025",
    type: "Conference",
    mode: "Hybrid · Delhi NCR + Online",
    date: "Jan 18, 2026",
    meta: "Keynotes, SOC demos, and policy roundtables.",
    icon: "fa-tower-broadcast"
  },
  {
    title: "National Cyber Awareness Week (Campus Edition)",
    type: "Awareness Drive",
    mode: "On-Campus · Pan-India",
    date: "Feb 10–17, 2026",
    meta: "Workshops, phishing simulations, and student CTF challenges.",
    icon: "fa-graduation-cap"
  },
  {
    title: "Law & Cybercrime: Joint Session with Legal Experts",
    type: "Roundtable",
    mode: "Virtual",
    date: "Mar 02, 2026",
    meta: "Discussions on evolving cyber laws and enforcement collaboration.",
    icon: "fa-scale-balanced"
  }
];

const pastEvents = [
  {
    title: "CTF: Secure Bharat 2025",
    type: "Capture The Flag",
    mode: "Online",
    date: "Nov 02, 2025",
    meta: "450+ participants, 40+ teams, multi-stage practical lab scenarios.",
    icon: "fa-flag-checkered"
  },
  {
    title: "CyberSafe for Startups Bootcamp",
    type: "Bootcamp",
    mode: "Bengaluru",
    date: "Sep 14, 2025",
    meta: "Two-day programme focused on hardening early-stage startups.",
    icon: "fa-rocket"
  },
  {
    title: "Digital Safety for Schools",
    type: "Awareness Drive",
    mode: "Mumbai",
    date: "Aug 08, 2025",
    meta: "Teachers, parents, and students trained on online safety.",
    icon: "fa-children"
  },
  {
    title: "Women in Cyber Security Meetup",
    type: "Meetup",
    mode: "Pune",
    date: "Jul 21, 2025",
    meta: "Community meetup highlighting women leaders in cyber.",
    icon: "fa-user-shield"
  }
];

// --- DOM references --------------------------------------------------------
const blogsGrid = document.getElementById("blogsGrid");
const chipButtons = document.querySelectorAll(".blogs-filter .chip");
const upcomingEventsContainer = document.getElementById("upcomingEvents");
const pastEventsContainer = document.getElementById("pastEvents");
const eventsTabs = document.querySelectorAll(".events-tab");
const backToTopBtn = document.getElementById("backToTop");
const yearSpan = document.getElementById("year");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

// Modal elements
const blogModal = document.getElementById("blogModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalContent = document.getElementById("modalContent");

// Forms
const joinForm = document.getElementById("joinForm");
const contactForm = document.getElementById("contactForm");

// --- Utilities -------------------------------------------------------------
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Render blogs
function renderBlogs(filter = "all") {
  if (!blogsGrid) return;
  blogsGrid.innerHTML = "";

  const filtered = blogs.filter((b) =>
    filter === "all" ? true : b.category === filter
  );

  filtered.forEach((blog) => {
    const card = document.createElement("article");
    card.className = "blog-card";
    card.dataset.id = blog.id;

    card.innerHTML = `
      <span class="blog-card-category">${blog.category.toUpperCase()}</span>
      <h3 class="blog-card-title">${blog.title}</h3>
      <div class="blog-card-meta">
        <span>${blog.date}</span> • <span>${blog.readTime}</span>
      </div>
      <p class="blog-card-excerpt">${blog.excerpt}</p>
    `;

    card.addEventListener("click", () => openBlogModal(blog.id));
    blogsGrid.appendChild(card);
  });
}

// Filter handling
chipButtons.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chipButtons.forEach((c) => c.classList.remove("chip-active"));
    chip.classList.add("chip-active");
    renderBlogs(filter);
  });
});

// Events rendering
function renderEvents() {
  if (upcomingEventsContainer) {
    upcomingEventsContainer.innerHTML = "";
    upcomingEvents.forEach((ev) => {
      const card = document.createElement("article");
      card.className = "event-card";
      card.innerHTML = `
        <div class="event-tag">
          <i class="fa-solid ${ev.icon}"></i>
          <span>${ev.type}</span>
        </div>
        <h3 class="event-title">${ev.title}</h3>
        <div class="event-meta">${ev.mode} • ${ev.date}</div>
        <p class="event-description">${ev.meta}</p>
      `;
      upcomingEventsContainer.appendChild(card);
    });
  }

  if (pastEventsContainer) {
    pastEventsContainer.innerHTML = "";
    pastEvents.forEach((ev) => {
      const card = document.createElement("article");
      card.className = "event-card";
      card.innerHTML = `
        <div class="event-tag">
          <i class="fa-solid ${ev.icon}"></i>
          <span>${ev.type}</span>
        </div>
        <h3 class="event-title">${ev.title}</h3>
        <div class="event-meta">${ev.mode} • ${ev.date}</div>
        <p class="event-description">${ev.meta}</p>
      `;
      pastEventsContainer.appendChild(card);
    });
  }
}

// Events tab switch
eventsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    eventsTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    if (target === "upcoming") {
      upcomingEventsContainer.classList.remove("hidden");
      pastEventsContainer.classList.add("hidden");
    } else {
      pastEventsContainer.classList.remove("hidden");
      upcomingEventsContainer.classList.add("hidden");
    }
  });
});

// Blog modal functionality
function openBlogModal(id) {
  const blog = blogs.find((b) => b.id === id);
  if (!blog) return;

  modalTitle.textContent = blog.title;
  modalMeta.textContent = `${blog.date} • ${blog.readTime}`;
  modalContent.textContent = blog.content;

  blogModal.classList.remove("hidden");
}

function closeBlogModal() {
  blogModal.classList.add("hidden");
}

if (modalClose) {
  modalClose.addEventListener("click", closeBlogModal);
}

if (blogModal) {
  blogModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      closeBlogModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !blogModal.classList.contains("hidden")) {
    closeBlogModal();
  }
});

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

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").slice(1);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;
    e.preventDefault();
    const offsetTop = targetEl.offsetTop - 70;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  });
});

// Forms (demo only)
if (joinForm) {
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(joinForm);
    console.log("Join form submission:", Object.fromEntries(formData));
    alert("Thank you for your interest in HackHalt - CIC. We will get back to you soon (demo).");
    joinForm.reset();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    console.log("Contact form submission:", Object.fromEntries(formData));
    alert("Your message has been recorded (demo). Integrate backend for production.");
    contactForm.reset();
  });
}

// Initial render
renderBlogs("all");
renderEvents();
