document.addEventListener("DOMContentLoaded", function () {
  // Loader
  const loader = document.getElementById("loader");
  window.addEventListener("load", function () {
    if (loader) {
      setTimeout(() => {
        loader.classList.add("hide");
      }, 500);
    }
  });

  // Fade-up animation
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
        rootMargin: "0px 0px -40px 0px"
      }
    );

    fadeElements.forEach((el) => fadeObserver.observe(el));
  } else {
    fadeElements.forEach((el) => el.classList.add("show"));
  }

  // Scroll top
  const scrollTopBtn = document.getElementById("scrollTop");
  window.addEventListener("scroll", function () {
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Smooth hash scroll
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

  // Header shadow
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    if (!header) return;
    header.style.boxShadow =
      window.scrollY > 40
        ? "0 14px 30px rgba(15,23,42,0.08)"
        : "0 1px 3px rgba(0,0,0,0.05)";
  });

  // Counter animation
  const statNumbers = document.querySelectorAll(".stat-content h3");

  function animateCounter(element) {
    const rawText = element.textContent.trim();
    const isPlus = rawText.includes("+");
    const isPercent = rawText.includes("%");
    const target = parseInt(rawText.replace(/[^\d]/g, ""), 10);
    if (isNaN(target)) return;

    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 60));
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

  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
      }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
      });
    });
  }

  console.log("%cAliCreationBD Ultra Premium UI Loaded", "color:#2563eb; font-size:18px; font-weight:700;");
});