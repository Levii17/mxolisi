// Process section interactivity
document.addEventListener('DOMContentLoaded', function() {
    const processSteps = document.querySelectorAll('.process-step');
    const processSection = document.getElementById('process');
    
    // Set first step as active by default
    processSteps[0].classList.add('active');
    
    processSteps.forEach(step => {
      const header = step.querySelector('.step-header');
      
      header.addEventListener('click', function() {
        processSteps.forEach(otherStep => {
          if (otherStep !== step) otherStep.classList.remove('active');
        });
        step.classList.toggle('active');
      });
    });
  
        // Mobile touch support
        let touchStartY = 0;
        let touchEndY = 0;
        
        processSection.addEventListener('touchstart', e => {
          touchStartY = e.changedTouches[0].screenY;
        }, false);
        
        processSection.addEventListener('touchend', e => {
          touchEndY = e.changedTouches[0].screenY;
          handleSwipe();
        }, false);
        
        function handleSwipe() {
          const verticalThreshold = 30; // Minimum vertical swipe distance
  
          const deltaY = touchStartY - touchEndY;
          if (Math.abs(deltaY) < verticalThreshold) return;

          if (touchEndY < touchStartY) {
            // Swipe up - show next step
            const activeStep = document.querySelector('.process-step.active');
            const nextStep = activeStep.nextElementSibling;
            
            if (nextStep && nextStep.classList.contains('process-step')) {
              activeStep.classList.remove('active');
              nextStep.classList.add('active');
              nextStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
          
          if (touchEndY > touchStartY) {
            // Swipe down - show previous step
            const activeStep = document.querySelector('.process-step.active');
            const prevStep = activeStep.previousElementSibling;
            
            if (prevStep && prevStep.classList.contains('process-step')) {
              activeStep.classList.remove('active');
              prevStep.classList.add('active');
              prevStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
          const activeStep = document.querySelector('.process-step.active');
          
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextStep = activeStep.nextElementSibling;
            if (nextStep && nextStep.classList.contains('process-step')) {
              activeStep.classList.remove('active');
              nextStep.classList.add('active');
              nextStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
          
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevStep = activeStep.previousElementSibling;
            if (prevStep && prevStep.classList.contains('process-step')) {
              activeStep.classList.remove('active');
              prevStep.classList.add('active');
              prevStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });
});
