import { initBooks, initToolbox, initHobbies, initToolboxHover } from './about.js';
import { ProjectRenderer, projects } from './projects.js';
import { initCertificates } from './certificates.js';
import { initContact } from './contact.js';
import { initFooterLinks } from './footer.js';
import { themeManager } from './theme.js';
import { initNavbar } from './navbar.js';
import { initParticles } from './particles.js';

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application...');

    // Initialize navbar functionality
    if (typeof initNavbar === 'function') {
        initNavbar();
        console.log('Navbar initialized');
    }

    // Initialize particles.js for hero section
    // Wait a bit for particles.js library to load
    setTimeout(() => {
        if (typeof initParticles === 'function') {
            initParticles();
            console.log('Particles initialized');
        }
    }, 500);

    // Initialize About section
    if (typeof initBooks === 'function') initBooks();
    if (typeof initToolbox === 'function') initToolbox();
    if (typeof initHobbies === 'function') initHobbies();
    if (typeof initToolboxHover === 'function') initToolboxHover();
    
    // Initialize Certificates section
    if (typeof initCertificates === 'function') {
        initCertificates();
        console.log('Certificates initialized');
    }
    
    // Initialize Contact section
    if (typeof initContact === 'function') {
        initContact();
        console.log('Contact initialized');
    }
    
    // Initialize Footer
    if (typeof initFooterLinks === 'function') {
        initFooterLinks();
        console.log('Footer initialized');
    }
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize project renderer
    if (typeof ProjectRenderer !== 'undefined' && typeof projects !== 'undefined') {
        const renderer = new ProjectRenderer('projectsContainer', projects);
        renderer.render();
        setTimeout(() => {
            renderer.initVideoControls();
            renderer.initObservers();
        }, 200);
        console.log('Projects rendered');
    }
    
    // Initialize scroll to top
    initScrollToTop();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();

    console.log('Application initialized successfully');
});

// Smooth scrolling for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // Account for fixed navbar
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const mobileDropdown = document.getElementById('mobile-dropdown');
            if (mobileDropdown && mobileDropdown.classList.contains('active')) {
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                if (mobileMenuBtn) mobileMenuBtn.click();
            }

            // Pause any playing videos
            document.querySelectorAll('.project-media').forEach(media => {
                if (media.pause && !media.paused) {
                    media.pause();
                }
            });
        }
        
        // Tab navigation support for videos
        if (e.key === 'Tab') {
            const activeElement = document.activeElement;
            if (activeElement.closest('.project-card')) {
                const video = activeElement.closest('.project-card').querySelector('video');
                if (video) {
                    video.controls = true;
                }
            }
        }
    });

    // Focus trap for accessibility
    document.querySelectorAll('.project-button, .github-button').forEach(button => {
        button.addEventListener('focus', () => {
            const card = button.closest('.project-card');
            if (card) {
                card.style.zIndex = '10';
            }
        });
        
        button.addEventListener('blur', () => {
            const card = button.closest('.project-card');
            if (card) {
                card.style.zIndex = '';
            }
        });
    });
}