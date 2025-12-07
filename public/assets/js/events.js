// assets/js/events.js
// Events page specific functionality

// Events data - School-based Cybersecurity Awareness Programs
const upcomingEvents = [
  {
    id: 1,
    title: "Amity International School - Cybersecurity Awareness Workshop",
    type: "School Workshop",
    mode: "In-Person  Delhi",
    date: "17 July 2025",
    time: "10:30 AM to 1 PM",
    location: "Mayur Vihar Phase 1 East Delhi",
    meta: "200+ students engaged, interactive session, digital safety focus",
    description: "Interactive cybersecurity awareness workshop at Amity International School focused on helping students understand online threats, safe browsing practices, and digital citizenship.",
    speakers: ["HackHalt Trainers", "School Faculty"],
    icon: "fa-school"
  },
  {
    id: 2,
    title: "ASN Secondary Public School - Digital Safety Program",
    type: "School Awareness",
    mode: "In-Person  Delhi",
    date: "17 July 2025",
    time: "8:00 AM to 10:00 AM",
    location: "Mayur Vihar Phase 1 East Delhi",
    meta: "150+ students, cyber hygiene training, parent engagement session",
    description: "Comprehensive digital safety program teaching students and parents about online security, phishing awareness, and responsible internet usage.",
    speakers: ["HackHalt Team", "Security Experts"],
    icon: "fa-graduation-cap"
  },
  {
    id: 3,
    title: "AWS Convent School - Cybersecurity Bootcamp",
    type: "Technical Training",
    mode: "In-Person  Uttar Pradesh",
    date: "04 July 2025",
    time: "11:00 AM to 1:00 PM",
    location: "Lalganj, Mirzapur, Uttar Pradesh",
    meta: "120+ participants, hands-on labs, career guidance",
    description: "Intensive bootcamp introducing school students to cybersecurity careers, basic security concepts, and practical hands-on lab exercises.",
    speakers: ["Industry Professionals", "HackHalt Mentors"],
    icon: "fa-laptop-code"
  },
  {
    id: 4,
    title: "National Cyber Awareness Campaign - Schools Edition",
    type: "Pan-India Campaign",
    mode: "Multiple Locations",
    date: "Aug 15 - Sep 30, 2025",
    time: "02:00 PM - 04:00 PM daily",
    location: "500+ Schools Across India",
    meta: "50,000+ students, digital literacy, cyberbullying awareness",
    description: "Nationwide campaign reaching schools to teach students about cybersecurity, digital rights, privacy protection, and responsible digital behavior.",
    speakers: ["Cybersecurity Educators", "Student Mentors"],
    icon: "fa-book"
  },
  {
    id: 5,
    title: "Teacher Training Workshop - Digital Security Curriculum",
    type: "Educator Program",
    mode: "Hybrid  Online + In-Person",
    date: "Sep 01 - Sep 15, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Multiple Cities, Online Platform",
    meta: "500+ teachers trained, curriculum resources, certification",
    description: "Training program for teachers to understand cybersecurity concepts and integrate digital safety education into school curricula.",
    speakers: ["Curriculum Experts", "Security Practitioners"],
    icon: "fa-chalkboard-user"
  }
];

const pastEvents = [
  {
    id: 1,
    title: "Amity International School - Cybersecurity Workshop",
    type: "School Workshop",
    mode: "Delhi  Completed",
    date: "17 July 2025",
    time: "10:30 AM - 1 PM IST",
    location: "Mayur Vihar Phase 1 East Delhi",
    meta: "200+ students, 100% attendance, positive feedback received",
    stats: "200+ Students | Interactive Format | High Engagement | Certificates Issued",
    icon: "fa-school",
    description: "Successful cybersecurity awareness workshop introducing students to digital safety, online threats, and practical protection strategies."
  },
  {
    id: 2,
    title: "ASN Secondary Public School - Digital Literacy Drive",
    type: "Educational Initiative",
    mode: "Delhi  Completed",
    date: "17 July 2025",
    time: "8:00 AM - 10:00 AM IST",
    location: "Mayur Vihar Phase 1 East Delhi",
    meta: "150+ students and parents engaged, cyber hygiene training completed",
    stats: "150+ Students | 50+ Parents | 2 Hours | Safety Tips Distributed",
    icon: "fa-graduation-cap",
    description: "Digital safety program combining student education with parent awareness on online security and responsible internet practices."
  },
  {
    id: 3,
    title: "AWS Convent School - Cybersecurity Bootcamp",
    type: "Technical Training",
    mode: "Uttar Pradesh  Completed",
    date: "04 July 2025",
    time: "11:00 AM - 1 PM IST",
    location: "Lalganj, Mirzapur, Uttar Pradesh",
    meta: "120+ students participated, hands-on labs conducted, career awareness created",
    stats: "120+ Participants | Rural Area Initiative | Practical Labs | Career Guidance",
    icon: "fa-laptop-code",
    description: "Successful bootcamp in rural Uttar Pradesh introducing cybersecurity concepts and career opportunities to school students."
  },
  {
    id: 4,
    title: "Summer Cyber Camp 2025 - Pan-India",
    type: "Summer Program",
    mode: "Multiple Cities  Completed",
    date: "June 01 - July 31, 2025",
    time: "02:00 PM - 04:00 PM daily",
    location: "50+ Cities, 200+ Schools",
    meta: "25,000+ students, 500+ teachers, comprehensive digital literacy program",
    stats: "25,000+ Students | 500+ Teachers | 50 Cities | 8 Weeks Duration",
    icon: "fa-sun",
    description: "Summer-long digital security and cyber awareness program reaching students across multiple states during school break."
  },
  {
    id: 5,
    title: "National Digital Safety Month - 2025",
    type: "Awareness Campaign",
    mode: "Pan-India  Completed",
    date: "May 01 - May 31, 2025",
    time: "Various - School Hours",
    location: "300+ Educational Institutions",
    meta: "40,000+ participants, cybersecurity basics, phishing simulations, competitions",
    stats: "40,000+ Students | 300+ Schools | CTF Competitions | 30 Days",
    icon: "fa-shield",
    description: "Month-long national campaign promoting digital safety with interactive competitions, workshops, and awareness sessions in schools."
  },
  {
    id: 6,
    title: "Teacher Certification Program - Cybersecurity Educators",
    type: "Educator Program",
    mode: "Online  Completed",
    date: "Apr 01 - Apr 30, 2025",
    time: "06:00 PM - 07:30 PM IST",
    location: "Online Platform (Accessible Pan-India)",
    meta: "800+ teachers certified, curriculum resources provided, ongoing support",
    stats: "800+ Teachers | 4 Weeks | Online Certification | Resource Library",
    icon: "fa-certificate",
    description: "Certification program enabling teachers to become cybersecurity awareness champions in their schools and communities."
  },
  {
    id: 7,
    title: "Youth Cyber Challenge - National CTF for Schools",
    type: "Competition",
    mode: "Online  Completed",
    date: "Mar 20 - Mar 22, 2025",
    time: "10:00 AM - 09:00 PM IST (72 hours)",
    location: "Online Platform - National Participation",
    meta: "400+ teams from 500+ schools, ₹5L prize pool, talent identification",
    stats: "400+ Teams | 500+ Schools | 72 Hours | ₹5L Prize Pool",
    icon: "fa-flag-checkered",
    description: "National Capture The Flag competition for school and college students showcasing cybersecurity skills with real-world challenges."
  }
];

// DOM references
const upcomingEventsContainer = document.getElementById("upcomingEvents");
const pastEventsContainer = document.getElementById("pastEvents");
const eventsTabs = document.querySelectorAll(".events-tab");

// Events rendering
function renderEvents() {
  if (upcomingEventsContainer) {
    upcomingEventsContainer.innerHTML = "";
    upcomingEvents.forEach((ev) => {
      const card = document.createElement("article");
      card.className = "event-card reveal";
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
      card.className = "event-card reveal";
      card.innerHTML = `
        <div class="event-tag">
          <i class="fa-solid ${ev.icon}"></i>
          <span>${ev.type}</span>
        </div>
        <h3 class="event-title">${ev.title}</h3>
        <div class="event-meta">${ev.mode} • ${ev.date}</div>
        <p class="event-description">${ev.meta}</p>
        <div class="event-stats">${ev.stats || ''}</div>
      `;
      pastEventsContainer.appendChild(card);
    });
  }

  // Re-observe reveal elements
  const revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach((el) => observer.observe(el));
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

// NOTE: IntersectionObserver is created in `assets/js/main.js` as `observer`.
// We intentionally do NOT redeclare it here to avoid a duplicate-identifier
// error. `renderEvents()` will use the global `observer` to observe newly
// injected `.reveal` elements so they animate on scroll.

// Initial render
renderEvents();
