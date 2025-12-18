"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initNavbar = initNavbar;

// Navbar functionality
function initNavbar() {
  // DOM elements
  var navbarCenter = document.getElementById("navbar-center");
  var hero = document.querySelector(".hero") || document.getElementById("hero");
  var mobileMenuBtn = document.getElementById("mobile-menu-btn");
  var mobileDropdown = document.getElementById("mobile-dropdown");
  var mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-links a, .mobile-nav-links a");

  if (!navbarCenter || !hero || !mobileMenuBtn || !mobileDropdown || !mobileMenuOverlay) {
    console.warn('Navbar: Some required elements not found');
    return;
  }

  var menuOpen = false; // ===== SCROLL FUNCTIONALITY =====

  function handleScroll() {
    var hero = document.querySelector(".hero") || document.getElementById("hero");
    var navbarCenter = document.getElementById("navbar-center");
    var additionalBtn = document.querySelector('.additional-link-btn');
    if (!hero || !navbarCenter) return; // Handle navbar sticky behavior

    if (window.pageYOffset > 16) {
      navbarCenter.classList.add('sticky');
    } else {
      navbarCenter.classList.remove('sticky');
    } // Calculate hero bottom position


    var heroBottom = hero.offsetTop + hero.offsetHeight;
    var currentScroll = window.pageYOffset; // Show/hide additional button based on scroll position

    if (currentScroll > heroBottom) {
      navbarCenter.classList.add('scrolled'); // Only show button on desktop/tablet (not mobile)

      if (additionalBtn && window.innerWidth > 768) {
        additionalBtn.style.display = 'inline-block';
        additionalBtn.style.visibility = 'visible';
        additionalBtn.style.opacity = '1';
      }
    } else {
      navbarCenter.classList.remove('scrolled'); // Hide button when not scrolled past hero

      if (additionalBtn) {
        additionalBtn.style.display = 'none';
        additionalBtn.style.visibility = 'hidden';
        additionalBtn.style.opacity = '0';
      }
    } // Add active class to nav items based on scroll position


    setActiveNavItem();
  } // Enhanced resize handler


  window.addEventListener('resize', function () {
    var additionalBtn = document.querySelector('.additional-link-btn');
    var navbarCenter = document.getElementById("navbar-center");

    if (additionalBtn && navbarCenter) {
      if (window.innerWidth <= 768) {
        // Always hide on mobile
        additionalBtn.style.display = 'none';
        additionalBtn.style.visibility = 'hidden';
        additionalBtn.style.opacity = '0';
      } else if (navbarCenter.classList.contains('scrolled')) {
        // Show on desktop if scrolled past hero
        additionalBtn.style.display = 'inline-block';
        additionalBtn.style.visibility = 'visible';
        additionalBtn.style.opacity = '1';
      }
    } // Close mobile menu if open when resizing to desktop


    if (window.innerWidth > 768 && menuOpen) {
      toggleMenu();
    }
  }); // Throttled scroll event

  var isScrolling;
  window.addEventListener('scroll', function () {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(handleScroll, 50);
  }, false); // Function to set active class to navigation items based on scroll position

  function setActiveNavItem() {
    if (!sections || !navLinks) return;
    var scrollPosition = window.scrollY + 100; // Offset to trigger slightly before reaching section

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        navLinks.forEach(function (link) {
          link.classList.remove("active");
        }); // Add active class to corresponding nav links

        var activeLinks = document.querySelectorAll("a[href=\"#".concat(sectionId, "\"]"));
        activeLinks.forEach(function (link) {
          link.classList.add("active");
        });
      }
    });
  } // ===== MOBILE MENU FUNCTIONALITY =====


  function toggleMenu() {
    menuOpen = !menuOpen;

    if (menuOpen) {
      mobileDropdown.classList.add('active');
      mobileMenuOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
      mobileMenuBtn.innerHTML = '✕';
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileDropdown.classList.remove('active');
      mobileMenuOverlay.style.display = 'none';
      document.body.style.overflow = '';
      mobileMenuBtn.innerHTML = '☰';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  } // ===== EVENT LISTENERS =====
  // Mobile menu events


  mobileMenuBtn.addEventListener('click', toggleMenu);
  mobileMenuOverlay.addEventListener('click', toggleMenu); // Close mobile menu when clicking on a link

  document.querySelectorAll('.mobile-nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (menuOpen) toggleMenu();
    });
  }); // Smooth scrolling for navigation links

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var targetElement = document.querySelector(targetId);

      if (targetElement) {
        var offset = 80; // Account for fixed navbar

        var targetPosition = targetElement.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }); // ===== INITIALIZATION =====

  handleScroll();
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  setActiveNavItem(); // Animate hero elements on load

  var heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach(function (el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = "all 0.5s ease ".concat(index * 0.1, "s");
    setTimeout(function () {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });
}