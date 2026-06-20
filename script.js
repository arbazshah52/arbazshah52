// Default language

let currentLang = "en";

// Load translations JSON
async function loadTranslations(lang) {
  try {
    const response = await fetch("translations.json");
    const data = await response.json();

    const translations = data[lang];

    // Update all elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    currentLang = lang;
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

// Language switcher buttons
document.addEventListener("DOMContentLoaded", () => {
  loadTranslations("en"); // Default language

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      loadTranslations(lang);
    });
  });
});

// Mobile menu toggle
const menuIcon = document.querySelector('.menu-icon');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavClose = document.querySelector('.mobile-nav-close');

function closeMobileMenu() {
   mobileNav.classList.remove('active');
}

function openMobileMenu() {
   mobileNav.classList.add('active');
}

if (menuIcon && mobileNav) {
   menuIcon.addEventListener('click', () => {
      if (mobileNav.classList.contains('active')) {
         closeMobileMenu();
      } else {
         openMobileMenu();
      }
   });

   // Close button
   if (mobileNavClose) {
      mobileNavClose.addEventListener('click', closeMobileMenu);
   }

   // Close mobile menu when clicking a link
   document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
   });
}

// Smooth scroll (optional)
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Active menu highlighting on scroll
const sections = document.querySelectorAll('section[id], #work');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

function highlightActiveSection() {
   const scrollY = window.pageYOffset;

   sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
         navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
               link.classList.add('active');
            }
         });
      }
   });
}

window.addEventListener('scroll', highlightActiveSection);
highlightActiveSection();