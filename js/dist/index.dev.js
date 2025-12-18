"use strict";

var _about = require("./about.js");

var _projects = require("./projects.js");

var _certificates = require("./certificates.js");

var _contact = require("./contact.js");

var _footer = require("./footer.js");

var _theme = require("./theme.js");

var _navbar = require("./navbar.js");

var _particles = require("./particles.js");

// Main initialization
document.addEventListener('DOMContentLoaded', function () {
  console.log('Initializing application...'); // Initialize navbar functionality

  if (typeof _navbar.initNavbar === 'function') {
    (0, _navbar.initNavbar)();
    console.log('Navbar initialized');
  } // Initialize particles.js for hero section
  // Wait a bit for particles.js library to load


  setTimeout(function () {
    if (typeof _particles.initParticles === 'function') {
      (0, _particles.initParticles)();
      console.log('Particles initialized');
    }
  }, 500); // Initialize About section

  if (typeof _about.initBooks === 'function') (0, _about.initBooks)();
  if (typeof _about.initToolbox === 'function') (0, _about.initToolbox)();
  if (typeof _about.initHobbies === 'function') (0, _about.initHobbies)();
  if (typeof _about.initToolboxHover === 'function') (0, _about.initToolboxHover)(); // Initialize Certificates section

  if (typeof _certificates.initCertificates === 'function') {
    (0, _certificates.initCertificates)();
    console.log('Certificates initialized');
  } // Initialize Contact section


  if (typeof _contact.initContact === 'function') {
    (0, _contact.initContact)();
    console.log('Contact initialized');
  } // Initialize Footer


  if (typeof _footer.initFooterLinks === 'function') {
    (0, _footer.initFooterLinks)();
    console.log('Footer initialized');
  } // Initialize smooth scrolling


  initSmoothScroll(); // Initialize project renderer

  if (typeof _projects.ProjectRenderer !== 'undefined' && typeof _projects.projects !== 'undefined') {
    var renderer = new _projects.ProjectRenderer('projectsContainer', _projects.projects);
    renderer.render();
    setTimeout(function () {
      renderer.initVideoControls();
      renderer.initObservers();
    }, 200);
    console.log('Projects rendered');
  } // Initialize scroll to top


  initScrollToTop(); // Initialize keyboard navigation

  initKeyboardNavigation();
  console.log('Application initialized successfully');
}); // Smooth scrolling for navigation

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var targetElement = document.querySelector(targetId);

      if (targetElement) {
        var offset = 80; // Account for fixed navbar

        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        }); // Update active nav link

        document.querySelectorAll('.nav-link').forEach(function (link) {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });
} // Scroll to top functionality


function initScrollToTop() {
  var scrollToTopBtn = document.getElementById('scrollToTop');

  if (scrollToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    scrollToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
} // Keyboard navigation support


function initKeyboardNavigation() {
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // Close mobile menu if open
      var mobileDropdown = document.getElementById('mobile-dropdown');

      if (mobileDropdown && mobileDropdown.classList.contains('active')) {
        var mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) mobileMenuBtn.click();
      } // Pause any playing videos


      document.querySelectorAll('.project-media').forEach(function (media) {
        if (media.pause && !media.paused) {
          media.pause();
        }
      });
    } // Tab navigation support for videos


    if (e.key === 'Tab') {
      var activeElement = document.activeElement;

      if (activeElement.closest('.project-card')) {
        var video = activeElement.closest('.project-card').querySelector('video');

        if (video) {
          video.controls = true;
        }
      }
    }
  }); // Focus trap for accessibility

  document.querySelectorAll('.project-button, .github-button').forEach(function (button) {
    button.addEventListener('focus', function () {
      var card = button.closest('.project-card');

      if (card) {
        card.style.zIndex = '10';
      }
    });
    button.addEventListener('blur', function () {
      var card = button.closest('.project-card');

      if (card) {
        card.style.zIndex = '';
      }
    });
  });
}