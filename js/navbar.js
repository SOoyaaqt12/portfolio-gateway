// ===== NAVBAR FUNCTIONALITY =====

// Toggle Mobile Menu
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("active");
}

// Active Navigation Handler
function initActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar ul li a");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const linkPage = link.getAttribute("href");

    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html") ||
      (currentPage === "index.html" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });
}

// Navbar Scroll Effect - Transparency + Hide/Show
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

function handleNavbarScroll() {
  const currentScroll = window.pageYOffset;

  // Add 'scrolled' class when scroll > 50px
  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Hide navbar on scroll down, show on scroll up
  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scroll Down - Hide navbar
    navbar.classList.add("navbar-hidden");
  } else {
    // Scroll Up - Show navbar
    navbar.classList.remove("navbar-hidden");
  }

  lastScroll = currentScroll;
}

// Close mobile menu when clicking a link
function setupMobileMenuClose() {
  const navLinks = document.querySelectorAll(".navbar ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("navMenu").classList.remove("active");
    });
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Initialize navbar functionality
document.addEventListener("DOMContentLoaded", () => {
  initActiveNavigation();
  setupMobileMenuClose();
  initSmoothScroll();
});

// Scroll event listener
if (navbar) {
  window.addEventListener("scroll", handleNavbarScroll);
}
