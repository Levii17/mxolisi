document.addEventListener('DOMContentLoaded', function() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    // Check if device is mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
        // Mobile click behavior
        benefitCards.forEach(card => {
            card.addEventListener('click', function() {
                // Close all other cards first
                benefitCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                    }
                });
                
                // Toggle current card
                this.classList.toggle('active');
            });
        });
    } else {
        // Desktop hover behavior
        benefitCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });
    }
    
    // Add animation delay based on card position
    benefitCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 50}ms`;
        
        // Initialize Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
});
