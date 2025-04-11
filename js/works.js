document.addEventListener('DOMContentLoaded', function() {
    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Project card hover effect for touch devices
    if ('ontouchstart' in window) {
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('hover-effect');
            });
        });
    }

    // View button interactions
    const viewButtons = document.querySelectorAll('.view-button');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // This would be replaced with actual project detail modal logic
            alert('Project details would show here in a modal');
        });
    });
});