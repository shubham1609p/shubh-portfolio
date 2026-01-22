// Helpers
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// Set year
$("#year").textContent = new Date().getFullYear();

// Mobile menu
const burgerBtn = $("#burgerBtn");
const navLinks = $("#navLinks");

burgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

$$(".links a").forEach((a) => {
  a.addEventListener("click", () => navLinks.classList.remove("show"));
});

// Theme toggle
const themeBtn = $("#themeBtn");
const storedTheme = localStorage.getItem("theme");
if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);

function updateThemeIcon() {
  const theme = document.documentElement.getAttribute("data-theme") || "dark";
  themeBtn.textContent = theme === "light" ? "☀" : "☾";
}
updateThemeIcon();

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon();
});

// Resume download (optional)
$("#downloadResume").addEventListener("click", (e) => {
  e.preventDefault();
  const resumeFileName = ""; // e.g. "Shubham_Resume.pdf"
  if (!resumeFileName) {
    alert("Add your resume PDF in the folder and set resumeFileName in script.js");
    return;
  }
  window.open(resumeFileName, "_blank");
});
}

/* ===== Project modal ===== */
const modal = $("#modal");
const closeModal = $("#closeModal");
const mTitle = $("#mTitle");
const mDesc = $("#mDesc");
const mTech = $("#mTech");
const mLink = $("#mLink");
const copyBtn = $("#copyBtn");

let currentProjectText = "";

function openModal(card) {
  const title = card.dataset.title || "Project";
  const desc = card.dataset.desc || "";
  const tech = card.dataset.tech || "";
  const link = card.dataset.link || "#";

  mTitle.textContent = title;
  mDesc.textContent = desc;
  mTech.textContent = tech;
  mLink.href = link;

  currentProjectText = `${title}\n\n${desc}\n\nTech: ${tech}\nLink: ${link}`;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function hideModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

$$(".p-card").forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});

closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) hideModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideModal();
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentProjectText);
    copyBtn.textContent = "Copied ✓";
    setTimeout(() => (copyBtn.textContent = "Copy Text"), 1000);
  } catch {
    alert("Copy failed. Please copy manually.");
  }
});

/* ===== Contact form (front-end only) ===== */
const form = $("#contactForm");
const formMsg = $("#formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formMsg.textContent = "Message prepared ✅ (Front-end demo). Add backend to actually send.";
  form.reset();
});
