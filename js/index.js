import { initBooks, initToolbox, initHobbies, initToolboxHover } from './about.js';
import { ProjectRenderer, projects } from './projects.js';
import { initCertificates } from './certificates.js';
import { initContact } from './contact.js';
import { initFooterLinks } from './footer.js';
import { themeManager } from './theme.js';

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize sections
    if (typeof initBooks === 'function') initBooks();
    if (typeof initToolbox === 'function') initToolbox();
    if (typeof initHobbies === 'function') initHobbies();
    if (typeof initToolboxHover === 'function') initToolboxHover();
    if (typeof initCertificates === 'function') initCertificates();
    if (typeof initContact === 'function') initContact();
    if (typeof initFooterLinks === 'function') initFooterLinks();
    if (typeof initSmoothScroll === 'function') initSmoothScroll();
    
    // Initialize project renderer
    if (typeof ProjectRenderer !== 'undefined' && typeof projects !== 'undefined') {
        const renderer = new ProjectRenderer('projectsContainer', projects);
        renderer.render();
        setTimeout(() => {
            renderer.initVideoControls();
            renderer.initObservers();
        }, 200);
    }
    
    // Initialize scroll to top
    initScrollToTop();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
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
        
        // Theme toggle with keyboard (Ctrl/Cmd + T)
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            // This would need access to themeManager instance
            // In a real modular setup, you'd import it
            console.log('Theme toggle shortcut triggered');
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