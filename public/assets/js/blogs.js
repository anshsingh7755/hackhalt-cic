// assets/js/blogs.js
// Blogs page specific functionality

// Blogs data - Expanded collection
const blogs = [
  { id: 1, title: "Top 10 Social Engineering Red Flags in 2025", category: "awareness", date: "Nov 2025", readTime: "6 min", excerpt: "Learn to identify sophisticated social engineering attacks.", content: "Social engineering remains the most effective attack vector. Red flags include unsolicited urgent requests, authority impersonation, phishing emails, suspicious links, requests for sensitive info, and CEO fraud.", author: "Security Team", tags: ["social-eng", "phishing", "awareness"] },
  { id: 2, title: "Critical Infrastructure Protection", category: "threats", date: "Dec 2025", readTime: "8 min", excerpt: "Safeguarding power, telecom, financial systems from cyber threats.", content: "India's CII faces evolving threats. Key strategies: Zero Trust, real-time monitoring, incident response. Organizations must follow NCIIPC guidelines, conduct audits, maintain backups, deploy threat detection.", author: "Infra Team", tags: ["cii", "defense", "policy"] },
  { id: 3, title: "Building Cyber Hygiene Routine", category: "awareness", date: "Oct 2025", readTime: "4 min", excerpt: "5 daily cybersecurity habits that protect your data.", content: "Five essential practices: update software, use strong passwords, enable MFA, verify senders, backup data offline. These take 10 minutes daily but prevent 90% of attacks.", author: "Hygiene Expert", tags: ["habits", "prevention", "daily"] },
  { id: 4, title: "Ransomware in 2025", category: "threats", date: "Sep 2025", readTime: "9 min", excerpt: "Modern ransomware tactics and comprehensive defense strategies.", content: "Ransomware now includes data exfiltration and double-extortion. Defense: detection systems, segmented networks, immutable backups, incident playbooks, threat intel. Never pay ransoms.", author: "Response Team", tags: ["ransomware", "malware", "defense"] },
  { id: 5, title: "Zero Trust Architecture", category: "policy", date: "Nov 2025", readTime: "10 min", excerpt: "Transitioning from perimeter to continuous verification.", content: "Zero Trust: never trust, always verify. Implementation: identity-centric security, microsegmentation, continuous monitoring, encryption, least privilege. Deploy incrementally starting with sensitive data.", author: "Architecture", tags: ["zero-trust", "policy", "arch"] },
  { id: 6, title: "Cloud Security Best Practices", category: "policy", date: "Aug 2025", readTime: "7 min", excerpt: "Securing AWS, Azure, GCP with compliance and governance.", content: "Cloud security: use native tools, least privilege IAM, encryption, assessments, data localization. Audit monthly, rotate credentials, manage third-party access, establish incident response.", author: "Cloud Team", tags: ["cloud", "aws", "security"] },
  { id: 7, title: "API Security", category: "threats", date: "Jul 2025", readTime: "8 min", excerpt: "Securing REST and GraphQL APIs against attacks.", content: "API vulnerabilities: broken auth, injection, authorization flaws, rate limiting issues. Security: validate inputs, OAuth 2.0, JWT tokens, rate limiting, WAF rules, encryption, pentesting.", author: "API Security", tags: ["api", "dev", "security"] },
  { id: 8, title: "Data Privacy & Governance", category: "policy", date: "Jun 2025", readTime: "7 min", excerpt: "Building governance aligned with privacy laws.", content: "India: DPDP Act 2023, sectoral rules. Implementation: inventory, impact assessments, retention policies, access controls, breach procedures, third-party risk. Appoint DPO, conduct audits.", author: "Privacy Team", tags: ["privacy", "gdpr", "policy"] },
  { id: 9, title: "Threat Intelligence", category: "threats", date: "May 2025", readTime: "8 min", excerpt: "Collecting and operationalizing threat data.", content: "TI lifecycle: collection, analysis, dissemination, feedback. Types: strategic, tactical, operational. Subscribe to feeds, join ISACs, build TI teams, integrate into tools, establish hunting.", author: "TI Team", tags: ["threat-intel", "ioc", "analysis"] },
  { id: 10, title: "Security Operations Center", category: "policy", date: "Apr 2025", readTime: "9 min", excerpt: "Establishing 24/7 SOCs for threat detection.", content: "SOC tiers: L1 monitoring, L2 investigating, L3 responding. Components: SIEM, EDR, feeds, playbooks. Metrics: MTTD <1hr, MTTR <4hrs. Hire analysts, establish schedules, conduct exercises.", author: "SOC Ops", tags: ["soc", "siem", "ops"] },
  { id: 11, title: "Advanced Persistent Threats", category: "threats", date: "Mar 2025", readTime: "9 min", excerpt: "Understanding state-sponsored attacker tactics.", content: "APTs: sophisticated, targeted, prolonged presence. Campaigns: Lazarus, APT28, APT1. Detection: YARA rules, analytics, hunting. Monitor reports, hunt IOCs, segment networks, conduct forensics.", author: "Threat Analysis", tags: ["apt", "threats", "analysis"] },
  { id: 12, title: "Cybersecurity Awareness for Education", category: "awareness", date: "Dec 2024", readTime: "6 min", excerpt: "Building security culture in schools and universities.", content: "Institutions face phishing, ransomware, theft. Programs: phishing recognition, policies, procedures, device security. Integrate into curriculum, conduct training, maintain response plans, filter email.", author: "Edu Team", tags: ["awareness", "edu", "students"] },
  { id: 13, title: "Mobile Security in 2025", category: "threats", date: "Nov 2024", readTime: "7 min", excerpt: "Protecting smartphones and tablets from malware threats.", content: "Mobile devices are primary targets. Security: app store vetting, permissions review, updates, MDM solutions, antivirus, encrypted messaging. Teach users to avoid sideloading, public WiFi risks, phishing on mobile.", author: "Mobile Team", tags: ["mobile", "android", "ios"] },
  { id: 14, title: "Incident Response Planning", category: "policy", date: "Oct 2024", readTime: "10 min", excerpt: "Creating effective incident response procedures and playbooks.", content: "IR plan: detection, containment, eradication, recovery, post-incident. Team roles: incident commander, technical lead, communications. Playbooks for ransomware, data breach, DDoS. Test quarterly via simulations.", author: "IR Experts", tags: ["incident", "response", "planning"] },
  { id: 15, title: "Vulnerability Management", category: "policy", date: "Sep 2024", readTime: "8 min", excerpt: "Identifying, prioritizing, and remediating security vulnerabilities.", content: "VM lifecycle: discovery, assessment, prioritization, remediation, verification. Tools: Nessus, Qualys, OpenVAS. Patch management critical - apply critical patches within 24 hours. Regular pentesting.", author: "Vuln Team", tags: ["vulnerability", "scanning", "patching"] },
  { id: 16, title: "Email Security Best Practices", category: "awareness", date: "Aug 2024", readTime: "6 min", excerpt: "Protecting against phishing, spam, and email-based threats.", content: "Email is primary attack vector. Defense: SPF/DKIM/DMARC, advanced filtering, user training, sandboxing, URL rewriting. Teach users to verify sender, check headers, avoid attachments. Implement DLP.", author: "Email Team", tags: ["email", "phishing", "filtering"] },
  { id: 17, title: "Wireless Security Standards", category: "policy", date: "Jul 2024", readTime: "7 min", excerpt: "Securing WiFi networks with WPA3 and modern protocols.", content: "WiFi security: WPA3 encryption, strong passwords, hidden SSID optional, rogue AP detection, guest networks isolated. Enterprise: 802.1X authentication, certificate-based. Regular audits with WiFi analyzers.", author: "Network Team", tags: ["wifi", "wpa3", "wireless"] },
  { id: 18, title: "Password Management Strategies", category: "awareness", date: "Jun 2024", readTime: "5 min", excerpt: "Creating and managing secure passwords across organizations.", content: "Passwords: 16+ characters, mix case/numbers/symbols, unique per account. Use password managers, never share, change compromised passwords. MFA adds extra layer. Educate on password spray attacks.", author: "Access Team", tags: ["passwords", "mfa", "authentication"] },
  { id: 19, title: "Secure Development Practices", category: "policy", date: "May 2024", readTime: "9 min", excerpt: "Building security into software development lifecycle.", content: "Secure SDLC: threat modeling, code review, SAST/DAST, dependency scanning, security testing. DevSecOps: shift left, automate security checks, container scanning. OWASP Top 10.", author: "Dev Team", tags: ["devsecops", "sdlc", "coding"] },
  { id: 20, title: "Insider Threat Detection", category: "threats", date: "Apr 2024", readTime: "8 min", excerpt: "Identifying and mitigating risks from internal actors.", content: "Insider threats: data exfiltration, sabotage. Detection: UBA analytics, file access monitoring, email DLP, printing controls, USB restrictions. Least privilege, segregation of duties. Exit procedures.", author: "Threat Team", tags: ["insider", "threat", "detection"] },
  { id: 21, title: "Network Segmentation Strategies", category: "policy", date: "Mar 2024", readTime: "9 min", excerpt: "Implementing network zones and microsegmentation.", content: "Segmentation: DMZ, internal networks, guest networks. Microsegmentation: zero trust at network level. Firewalls, ACLs, VLANs. Monitor inter-segment traffic. Reduces breach impact.", author: "Network Team", tags: ["segmentation", "firewall", "network"] },
  { id: 22, title: "Backup and Disaster Recovery", category: "policy", date: "Feb 2024", readTime: "8 min", excerpt: "Building resilient backup and recovery strategies.", content: "3-2-1 rule: 3 copies, 2 media types, 1 offsite. Test recovery quarterly. Immutable backups against ransomware. RTO/RPO targets. Cold site, warm site, hot site options.", author: "DR Team", tags: ["backup", "disaster", "recovery"] },
  { id: 23, title: "Compliance Frameworks Overview", category: "policy", date: "Jan 2024", readTime: "10 min", excerpt: "Understanding ISO 27001, SOC 2, NIST, HIPAA frameworks.", content: "Frameworks: ISO 27001 (general), SOC 2 (service providers), NIST (US), HIPAA (healthcare), PCI-DSS (payment), GDPR (privacy). Choose based on industry, customers. Implement, audit, certify.", author: "Compliance Team", tags: ["compliance", "iso", "soc2"] },
  { id: 24, title: "Penetration Testing Guide", category: "threats", date: "Dec 2023", readTime: "9 min", excerpt: "Planning and executing effective penetration tests.", content: "Pentest phases: planning, scanning, enumeration, exploitation, reporting. Types: black-box, white-box, gray-box. Frequency: annual minimum. Bug bounties complement internal testing. Remediate findings.", author: "Security Team", tags: ["pentest", "testing", "assessment"] }
];

// DOM
const blogsGrid = document.getElementById("blogsGrid");
const filterChips = document.querySelectorAll(".chip");
const searchInput = document.querySelector(".blog-search-input");
let activeFilter = "all";

// Filter
filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((c) => c.classList.remove("chip-active"));
    chip.classList.add("chip-active");
    activeFilter = chip.dataset.filter;
    renderBlogs();
  });
});

// Search
searchInput?.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query) || blog.excerpt.toLowerCase().includes(query)
  );
  blogsGrid.innerHTML = "";
  filtered.forEach((blog) => createBlogCard(blog));
});

// Render
function renderBlogs() {
  const filtered = activeFilter === "all" ? blogs : blogs.filter((b) => b.category === activeFilter);
  blogsGrid.innerHTML = "";
  filtered.forEach((blog) => createBlogCard(blog));
}

// Create card
function createBlogCard(blog) {
  const card = document.createElement("article");
  card.className = "blog-card reveal";
  card.innerHTML = `
    <div class="blog-tag">${blog.category}</div>
    <h3 class="blog-title">${blog.title}</h3>
    <div class="blog-meta">${blog.date}  ${blog.readTime} read</div>
    <p class="blog-excerpt">${blog.excerpt}</p>
    <div class="blog-tags">
      ${blog.tags.map((tag) => `<span class="tag">#${tag}</span>`).join("")}
    </div>
  `;
  blogsGrid.appendChild(card);
  // If a shared IntersectionObserver exists (from main.js), observe this card
  if (typeof observer !== "undefined") {
    try {
      observer.observe(card);
    } catch (e) {
      // noop - if observer is not available or observing fails, continue
    }
  }

  // Open blog modal on click to show full content
  card.addEventListener("click", () => {
    openBlogModal(blog);
  });
}

// Mobile: toggle the filter sidebar
const filterToggle = document.getElementById("filterToggle");
const blogsFilter = document.querySelector(".blogs-filter");
if (filterToggle && blogsFilter) {
  filterToggle.addEventListener("click", () => {
    blogsFilter.classList.toggle("open");
  });
}

// Init render and ensure reveal elements are observed by the global observer
renderBlogs();

if (typeof observer !== "undefined") {
  document.querySelectorAll(".reveal").forEach((el) => {
    try {
      observer.observe(el);
    } catch (e) {
      // ignore
    }
  });
}

// Modal logic for blog details
const blogModal = document.getElementById("blogModal");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

function openBlogModal(blog) {
  if (!blogModal) return;
  modalTitle.textContent = blog.title || "";
  modalMeta.textContent = `${blog.date} • ${blog.readTime} • ${blog.author || ""}`;
  modalContent.textContent = blog.content || blog.excerpt || "";
  blogModal.classList.remove("hidden");
  // prevent background scroll
  document.documentElement.style.overflow = 'hidden';
}

function closeBlogModal() {
  if (!blogModal) return;
  blogModal.classList.add("hidden");
  document.documentElement.style.overflow = '';
}

if (modalClose) modalClose.addEventListener("click", closeBlogModal);
if (blogModal) {
  // clicking backdrop closes modal
  blogModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-backdrop") || e.target === blogModal) {
      closeBlogModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeBlogModal();
});
