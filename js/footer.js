// Update copyright year automatically
document.addEventListener('DOMContentLoaded', function() {
    // Set copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Add intersection observer for animation triggers
    const footer = document.querySelector('.artistic-footer');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1 });
    
    if (footer) {
      observer.observe(footer);
    }
    
    // Add smooth scroll to footer links
    document.querySelectorAll('.footer-links a').forEach(link => {
      if (link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', smoothScroll);
      }
    });
    
    function smoothScroll(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });