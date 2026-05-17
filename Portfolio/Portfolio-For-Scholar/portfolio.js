// ===== TYPING ANIMATION =====
const typingTexts = [
  "Future Software Engineer 💻",
  "Self-Taught Developer 🚀",
  "Udacity Certified ✅",
  "Seeking Scholarships 🎓"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeEffect() {
  const typingElement = document.getElementById("typing");
  const currentText = typingTexts[textIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let speed = isDeleting ? deletingSpeed : typingSpeed;
  
  if (!isDeleting && charIndex === currentText.length) {
    speed = pauseTime;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    speed = 500;
  }
  
  setTimeout(typeEffect, speed);
}

// ===== PARTICLES =====
function createParticles() {
  const particleContainer = document.getElementById("particles");
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = (Math.random() * 10 + 10) + "s";
    particleContainer.appendChild(particle);
  }
}

// ===== NAVBAR SCROLL =====
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// ===== MOBILE MENU =====
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  const hamburger = document.getElementById("hamburger");
  
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// Close menu when clicking a link
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav-menu").classList.remove("active");
    document.getElementById("hamburger").classList.remove("active");
  });
});

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

// ===== THEME TOGGLE =====
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  
  body.classList.toggle("light-theme");
  
  if (body.classList.contains("light-theme")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "dark");
  }
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const themeIcon = document.getElementById("theme-icon");
  
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

// ===== REVEAL ON SCROLL =====
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 150;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight && !bar.classList.contains("animated")) {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = progress + "%";
      bar.classList.add("animated");
    }
  });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  
  counters.forEach(counter => {
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight && !counter.classList.contains("animated")) {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
      counter.classList.add("animated");
    }
  });
}

// ===== BACK TO TOP =====
function handleBackToTop() {
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ===== FORM HANDLING =====
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  
  // Simple validation
  if (name && email && message) {
    alert("Thank you for your message, " + name + "! I'll get back to you soon. 😊");
    this.reset();
  }
});

// ===== FORM HANDLING WITH EMAILJS =====
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  emailjs.sendForm('service_4megqoi', 'template_0vi0uai', this)
    .then(function() {
      alert("Message sent successfully! 🎉 I'll get back to you soon.");
      document.getElementById("contact-form").reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, function(error) {
      alert("Oops! Something went wrong. Please try again.");
      console.log('Failed:', error);
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
});

// ===== SMOOTH SCROLL FOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ===== EVENT LISTENERS =====
window.addEventListener("scroll", () => {
  handleNavbarScroll();
  updateActiveNavLink();
  revealOnScroll();
  animateSkillBars();
  animateCounters();
  handleBackToTop();
});

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  typeEffect();
  createParticles();
  revealOnScroll();
});