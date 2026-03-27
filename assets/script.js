/* ============================================
   AliCreationBD - Main JavaScript
   Fade-up animations and interactions
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Fade-up animation on scroll
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
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );
    
    fadeElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    fadeElements.forEach((el) => el.classList.add("show"));
  }
});