// assets/js/events.js
// Events page specific functionality

// Events data - School-based Cybersecurity Awareness Programs
const upcomingEvents = [
  {
    id: 1,
    title: "Amity International School - Cybersecurity Awareness Workshop",
    image: "images/Amity school.jpg",
    type: "School Workshop",
    mode: "In-Person",
    date: "17 July 2025",
    time: "10:30 AM to 1:00 PM",
    location: "Mayur Vihar Phase 1, East Delhi",
    sourceFile: "Amity International School - Mayur Vihar",
    meta: "200+ students engaged, interactive session, digital safety focus",
    description: "Interactive cybersecurity awareness workshop at Amity International School focused on helping students understand online threats, safe browsing practices, and digital citizenship.",
    speakers: ["HackHalt Trainers", "School Faculty"],
    icon: "fa-school"
  },
  {
    id: 2,
    title: "ASN Secondary Public School - Digital Safety Program",
    image: "images/ASN School.jpg",
    type: "School Awareness",
    mode: "In-Person",
    date: "17 July 2025",
    time: "8:00 AM to 10:00 AM",
    location: "Mayur Vihar Phase 1, East Delhi",
    sourceFile: "ASN Public School - Mayur Vihar",
    meta: "150+ students, cyber hygiene training, parent engagement session",
    description: "Comprehensive digital safety program teaching students and parents about online security, phishing awareness, and responsible internet usage.",
    speakers: ["HackHalt Team", "Security Experts"],
    icon: "fa-graduation-cap"
  },
  {
    id: 3,
    title: "AWS Convent School - Cybersecurity Bootcamp",
    image: "images/AWS school.jpg",
    type: "Technical Training",
    mode: "In-Person",
    date: "04 July 2025",
    time: "11:00 AM to 1:00 PM",
    location: "Lalganj, Mirzapur, Uttar Pradesh",
    sourceFile: "AWS convent school - Lalganj",
    meta: "120+ participants, hands-on labs, career guidance",
    description: "Intensive bootcamp introducing school students to cybersecurity careers, basic security concepts, and practical hands-on lab exercises.",
    speakers: ["Industry Professionals", "HackHalt Mentors"],
    icon: "fa-laptop-code"
  },
  {
    id: 4,
    title: "National Cyber Awareness Campaign - Schools Edition",
    image: "https://source.unsplash.com/800x600/?conference,stage",
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
    image: "https://source.unsplash.com/800x600/?teacher,training",
    type: "Educator Program",
    mode: "Hybrid (Online + In-Person)",
    date: "Sep 01 - Sep 15, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Multiple Cities / Online",
    sourceFile: "Teacher Training Workshop - Curriculum",
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
    image: "images/Amity school.jpg",
    type: "School Workshop",
    mode: "Delhi — Completed",
    date: "17 July 2025",
    time: "10:30 AM - 1:00 PM IST",
    location: "Mayur Vihar Phase 1, East Delhi",
    meta: "200+ students, 100% attendance, positive feedback received",
    sourceFile: "Amity International School - Mayur Vihar",
    stats: "200+ Students | Interactive Format | High Engagement | Certificates Issued",
    icon: "fa-school",
    description: "Successful cybersecurity awareness workshop introducing students to digital safety, online threats, and practical protection strategies."
  },
  {
    id: 2,
    title: "ASN Secondary Public School - Digital Literacy Drive",
    image: "images/ASN School.jpg",
    type: "Educational Initiative",
    mode: "Delhi — Completed",
    date: "17 July 2025",
    time: "8:00 AM - 10:00 AM IST",
    location: "Mayur Vihar Phase 1, East Delhi",
    meta: "150+ students and parents engaged, cyber hygiene training completed",
    stats: "150+ Students | 50+ Parents | 2 Hours | Safety Tips Distributed",
    icon: "fa-graduation-cap",
    description: "Digital safety program combining student education with parent awareness on online security and responsible internet practices."
  },
  {
    id: 3,
    title: "AWS Convent School - Cybersecurity Bootcamp",
    image: "images/AWS school.jpg",
    type: "Technical Training",
    mode: "Uttar Pradesh — Completed",
    date: "04 July 2025",
    time: "11:00 AM - 1:00 PM IST",
    location: "Lalganj, Mirzapur, Uttar Pradesh",
    meta: "120+ students participated, hands-on labs conducted, career awareness created",
    stats: "120+ Participants | Rural Area Initiative | Practical Labs | Career Guidance",
    icon: "fa-laptop-code",
    description: "Successful bootcamp in rural Uttar Pradesh introducing cybersecurity concepts and career opportunities to school students."
  },
  {
    id: 4,
    title: "Summer Cyber Camp 2025 - Pan-India",
    image: "https://source.unsplash.com/800x600/?camp,summer,students",
    type: "Summer Program",
    mode: "Multiple Cities — Completed",
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
    image: "https://source.unsplash.com/800x600/?awareness,campaign",
    type: "Awareness Campaign",
    mode: "Pan-India — Completed",
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
    image: "https://source.unsplash.com/800x600/?online,training",
    type: "Educator Program",
    mode: "Online — Completed",
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
    image: "https://source.unsplash.com/800x600/?competition,ctf",
    type: "Competition",
    mode: "Online — Completed",
    date: "Mar 20 - Mar 22, 2025",
    time: "10:00 AM - 09:00 PM IST (72 hours)",
    location: "Online Platform - National Participation",
    meta: "400+ teams from 500+ schools, ₹5L prize pool, talent identification",
    stats: "400+ Teams | 500+ Schools | 72 Hours | ₹5L Prize Pool",
    icon: "fa-flag-checkered",
    description: "National Capture The Flag competition for school and college students showcasing cybersecurity skills with real-world challenges."
  }
  ,
  {
    id: 8,
    title: "SBV JJ Colony - School Awareness Session",
    image: "images/SBB JJ colony.jpg",
    type: "School Workshop",
    mode: "In-Person — Completed",
    date: "13 July 2025",
    time: "02:00 PM to 05:00 PM",
    location: "Khichripur Village, East Delhi",
    meta: "Local community outreach, hands-on activities",
    stats: "Local Outreach | Parent Engagement",
    icon: "fa-school",
    sourceFile: "SBV JJ Colony - Khichripur",
    description: "Community-focused digital safety session at SBV JJ Colony covering online risks and safe behaviour for students."
  },
  {
    id: 9,
    title: "WellIndia Corp Services Pvt Ltd - Workplace Session",
    image: "images/Wellindai corp.jpg",
    type: "Corporate Workshop",
    mode: "In-Person — Completed",
    date: "25 June 2025",
    time: "01:00 PM to 02:30 PM",
    location: "Mayur Vihar Phase 1, East Delhi",
    meta: "Employee awareness, incident response basics",
    stats: "Corporate Training | Certificates",
    icon: "fa-briefcase",
    sourceFile: "WellIndia Corp Services Pvt. Ltd.",
    description: "Tailored cybersecurity awareness session for corporate employees focusing on phishing and secure practices."
  },
  {
    id: 10,
    title: "Niev Institute Pvt. Ltd. - Student Outreach",
    image: "images/Niev campus.jpg",
    type: "Industry-Academic",
    mode: "In-Person — Completed",
    date: "28 June 2025",
    time: "03:30 PM to 04:30 PM",
    location: "Mayur Vihar Phase 1, East Delhi",
    meta: "Technical talk and awareness",
    icon: "fa-building",
    sourceFile: "Niev Institute Pvt. Ltd.",
    description: "Awareness talk and practical demonstrations for students at Niev Institute."
  },
  {
    id: 11,
    title: "PW Gurukulam School - Cyber Safety",
    image: "images/PW Gurukulam.jpg",
    type: "School Workshop",
    mode: "In-Person — Completed",
    date: "27 June 2025",
    time: "10:00 AM to 12:00 PM",
    location: "Gurugram",
    meta: "Student-focused sessions and activities",
    icon: "fa-graduation-cap",
    sourceFile: "PW Gurukulam School - Gurugram",
    description: "Hands-on cyber hygiene session for students at PW Gurukulam School."
  },
  {
    id: 12,
    title: "Dadasiya Village Outreach - Community Session",
    image: "images/Dadasiya village.jpg",
    type: "Community Outreach",
    mode: "In-Person — Completed",
    date: "25 June 2025",
    time: "04:00 PM to 06:00 PM",
    location: "Dadasiya Village, Faridabad",
    meta: "Rural awareness drive",
    icon: "fa-people-roof",
    sourceFile: "Dadasiya Village, Faridabad",
    description: "Rural digital safety outreach covering foundational online safety topics."
  },
  {
    id: 13,
    title: "ITI College, Rewari - Student Workshop",
    image: "images/ITI college, rewari.jpg",
    type: "Technical Workshop",
    mode: "In-Person — Completed",
    date: "27 June 2025",
    time: "02:30 PM to 05:00 PM",
    location: "Rewari, Haryana",
    meta: "Technical introduction and labs",
    icon: "fa-laptop-code",
    sourceFile: "ITI College, Rewari",
    description: "Hands-on introduction to cybersecurity concepts for ITI students."
  },
  {
    id: 14,
    title: "MRIIRS Campus Faridabad - Workshop",
    image: "images/MRIIRS campus.jpg",
    type: "Academic Program",
    mode: "In-Person — Completed",
    date: "19 Aug 2025",
    time: "02:00 PM",
    location: "Faridabad, Haryana",
    meta: "Campus workshop and awareness",
    icon: "fa-university",
    sourceFile: "MRIIRS Campus Faridabad",
    description: "Campus-focused cybersecurity awareness and engagement activities."
  },
  {
    id: 15,
    title: "HackShastra - IIIT Delhi",
    image: "images/Hackshastra-IIIT Delhi.jpg",
    type: "Event",
    mode: "In-Person — Completed",
    date: "27 July 2025",
    time: "12:00 PM to 01:00 PM",
    location: "IIIT Delhi",
    meta: "Event presence and demo sessions",
    icon: "fa-microchip",
    sourceFile: "HackShastra - IIIT Delhi",
    description: "Participation in HackShastra with demo sessions and talks."
  },
  {
    id: 16,
    title: "DomainX @ Microsoft Noida - Awareness",
    image: "images/Microsoft noida.jpg",
    type: "Corporate Collaboration",
    mode: "In-Person — Completed",
    date: "26 July 2025",
    time: "12:00 PM to 01:00 PM",
    location: "Microsoft Noida",
    meta: "Industry engagement",
    icon: "fa-building",
    sourceFile: "Microsoft Noida - DomainX",
    description: "Short awareness session and networking at Microsoft Noida."
  },
  {
    id: 17,
    title: "NIET Greater Noida - Campus Session",
    image: "images/NIET.jpg",
    type: "Academic Workshop",
    mode: "In-Person — Completed",
    date: "22 Aug 2025",
    time: "11:30 AM to 12:30 PM",
    location: "Greater Noida",
    meta: "Faculty and student engagement",
    icon: "fa-chalkboard-user",
    sourceFile: "NIET Greater Noida",
    description: "Campus-level session addressing digital safety and career paths."
  },
  {
    id: 18,
    title: "Security in AI Summit - Delhi",
    image: "images/Security in AI summit.jpg",
    type: "Summit",
    mode: "In-Person — Completed",
    date: "14 Dec 2025",
    time: "Full day",
    location: "Delhi",
    meta: "Summit-level discussions on AI security",
    icon: "fa-robot",
    sourceFile: "Security in AI Summit",
    description: "Panel discussions and talks focused on security in AI systems."
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
        <div class="event-media">
          <img src="${ev.image || 'images/event-placeholder.svg'}" alt="${ev.title} visual" crossorigin="anonymous" />
        </div>
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
        <div class="event-media">
          <img src="${ev.image || 'images/event-placeholder.svg'}" alt="${ev.title} visual" crossorigin="anonymous" />
        </div>
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
