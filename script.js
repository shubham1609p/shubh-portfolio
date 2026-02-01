document.addEventListener("DOMContentLoaded", () => {
  const $ = (q) => document.querySelector(q);
  const $$ = (q) => document.querySelectorAll(q);

  // Year
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

  // Theme toggle + flash
  const themeBtn = $("#themeBtn");
  const flash = $("#themeFlash");

  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);

  function updateThemeIcon() {
    const theme = document.documentElement.getAttribute("data-theme") || "dark";
    themeBtn.textContent = theme === "light" ? "☀" : "☾";
  }
  updateThemeIcon();

  themeBtn.addEventListener("click", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    flash.style.setProperty("--x", `${x}%`);
    flash.style.setProperty("--y", `${y}%`);
    flash.classList.add("show");
    setTimeout(() => flash.classList.remove("show"), 220);

    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon();
  });

  // Morph cycle (crank -> AI -> edit)
  const morphIds = ["#morph1", "#morph2", "#morph3"];
  const morphImgs = morphIds.map((id) => $(id)).filter(Boolean);

  if (morphImgs.length === 3) {
    let i = 0;
    setInterval(() => {
      morphImgs.forEach((img) => img.classList.remove("is-active"));
      i = (i + 1) % morphImgs.length;
      morphImgs[i].classList.add("is-active");
    }, 1500);
  }

  // Project modal
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
      copyBtn.textContent = "Copied";
      setTimeout(() => (copyBtn.textContent = "Copy Text"), 1000);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  });

  // Prevent modal opening when clicking Open button
  document.querySelectorAll(".p-open").forEach((a) => {
    a.addEventListener("click", (e) => e.stopPropagation());
  });

  // Scroll reveal animation
  const revealEls = document.querySelectorAll(
    ".card, .p-card, .video-card, .hero-text, .hero-card"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));

  // Contact form (front-end demo)
  const form = $("#contactForm");
  const formMsg = $("#formMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formMsg.textContent = "Message prepared (Front-end demo). Add backend to actually send.";
    form.reset();
  });
});

