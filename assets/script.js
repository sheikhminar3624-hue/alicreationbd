/* ============================================
   AliCreationBD - Premium JavaScript
   Updated & Fixed Interactions
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.35s ease";
    document.body.style.opacity = "1";
  }, 80);

  // ===== FADE-UP ANIMATION =====
  const fadeElements = document.querySelectorAll(".fade-up");

  if ("IntersectionObserver" in window) {
    const fadeObserver = new IntersectionObserver(
      (entries, observerRef) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observerRef.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    fadeElements.forEach((el) => fadeObserver.observe(el));
  } else {
    fadeElements.forEach((el) => el.classList.add("show"));
  }

  // ===== SCROLL TO TOP =====
  const scrollTopBtn = document.getElementById("scrollTop");

  function handleScrollTopButton() {
    if (!scrollTopBtn) return;

    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  }

  window.addEventListener("scroll", handleScrollTopButton);

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ===== SMOOTH SCROLL FOR HASH LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
      const topPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth"
      });
    });
  });

  // ===== HEADER SHADOW =====
  const header = document.querySelector(".site-header");
  function handleHeaderShadow() {
    if (!header) return;

    if (window.scrollY > 50) {
      header.style.boxShadow = "0 10px 24px rgba(15, 23, 42, 0.08)";
    } else {
      header.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
    }
  }

  window.addEventListener("scroll", handleHeaderShadow);

  // ===== ACTIVE NAV FOR HOME PAGE SECTIONS =====
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav a[href^='#']");

  function updateActiveNav() {
    if (!sections.length || !navLinks.length) return;

    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);

  // ===== COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll(".stat-content h3");

  function animateCounter(element) {
    const rawText = element.textContent.trim();
    const isPlus = rawText.includes("+");
    const isPercent = rawText.includes("%");
    const target = parseInt(rawText.replace(/[^\d]/g, ""), 10);

    if (isNaN(target)) return;

    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 50));
    const duration = 1800;
    const stepTime = Math.max(20, Math.floor(duration / (target / increment)));

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }

      let display = `${current}`;
      if (isPlus) display += "+";
      if (isPercent) display += "%";
      element.textContent = display;
    }, stepTime);
  }

  if (statNumbers.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observerRef) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observerRef.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((stat) => counterObserver.observe(stat));
  }

  // ===== OPTIONAL LAZY LOAD =====
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          obs.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  console.log("%cAliCreationBD Premium UI Loaded", "color:#2563eb; font-size:18px; font-weight:700;");
});