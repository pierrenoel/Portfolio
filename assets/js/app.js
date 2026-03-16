document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("main-nav");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100)
      nav.style.transform = "translateY(-100%)";
    else nav.style.transform = "translateY(0)";
    lastScrollY = window.scrollY;
  });

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const spans = hamburger.querySelectorAll("span");
    navLinks.classList.contains("active")
      ? ((spans[0].style.transform = "rotate(45deg) translateY(7px)"),
        (spans[1].style.transform = "rotate(-45deg) translateY(-7px)"))
      : ((spans[0].style.transform = "none"),
        (spans[1].style.transform = "none"));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.transform = "none";
    });
  });

  // Reveal Animation on Scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll("section").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
  });
});
