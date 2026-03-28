/* ============================================
   AliCreationBD - Premium JavaScript
   Enhanced animations and interactions
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  
  // ===== FADE-UP ANIMATION ON SCROLL =====
  const fadeElements = document.querySelectorAll(".fade-up");
  
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerRef) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observerRef.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );
    
    fadeElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    fadeElements.forEach((el) => el.classList.add("show"));
  }

  // ===== SCROLL TO TOP BUTTON =====
  const scrollTopBtn = document.getElementById("scrollTop");
  
  if (scrollTopBtn) {
    window.addEventListener("scroll", function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    });

    scrollTopBtn.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      
      // Skip if it's just "#"
      if (href === "#") return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // ===== HEADER SHADOW ON SCROLL =====
  const header = document.querySelector(".site-header");
  
  if (header) {
    window.addEventListener("scroll", function() {
      if (window.pageYOffset > 50) {
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
      }
    });
  }

  // ===== STAGGER ANIMATION FOR CARDS =====
  const cardElements = document.querySelectorAll(".service-card, .feature-card, .platform-card");
  
  cardElements.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // ===== COUNTER ANIMATION FOR STATS =====
  const statNumbers = document.querySelectorAll(".stat-content h3");
  
  function animateCounter(element) {
    const target = element.textContent.trim();
    const isPercentage = target.includes("%");
    const isPlusSign = target.includes("+");
    const numericValue = parseInt(target.replace(/[^\d]/g, ""));
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const increment = Math.ceil(numericValue / 50);
    const duration = 2000; // 2 seconds
    const stepTime = duration / (numericValue / increment);
    
    const counter = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(counter);
      }
      
      let displayValue = current.toString();
      if (isPlusSign) displayValue += "+";
      if (isPercentage) displayValue += "%";
      
      element.textContent = displayValue;
    }, stepTime);
  }
  
  if (statNumbers.length > 0 && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    statNumbers.forEach((stat) => statsObserver.observe(stat));
  }

  // ===== PARALLAX EFFECT FOR HERO SHAPES =====
  const heroSection = document.querySelector(".hero-section");
  const shapes = document.querySelectorAll(".floating-shapes .shape");
  
  if (heroSection && shapes.length > 0) {
    window.addEventListener("scroll", function() {
      const scrolled = window.pageYOffset;
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      
      if (scrolled < heroBottom) {
        shapes.forEach((shape, index) => {
          const speed = 0.3 + (index * 0.1);
          const yPos = scrolled * speed;
          shape.style.transform = `translateY(${yPos}px)`;
        });
      }
    });
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav a");
  
  function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  
  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", updateActiveNav);
  }

  // ===== LAZY LOADING FOR IMAGES =====
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]");
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ===== PREVENT FLASH OF UNSTYLED CONTENT =====
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = "1";
  }, 100);

  // ===== CONSOLE MESSAGE =====
  console.log("%c🚀 AliCreationBD Premium Website", "color: #3b82f6; font-size: 20px; font-weight: bold;");
  console.log("%c👋 Looking to hire? Contact us!", "color: #10b981; font-size: 14px;");
  console.log("%c📧 alicreationbd2024@gmail.com", "color: #64748b; font-size: 12px;");
  
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== MOBILE MENU TOGGLE (if needed) =====
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", function() {
    mobileMenu.classList.toggle("active");
    this.classList.toggle("active");
  });
  
  // Close menu when clicking outside
  document.addEventListener("click", function(e) {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  });
}