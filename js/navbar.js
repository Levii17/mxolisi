document.addEventListener("DOMContentLoaded", function () {
    const navbarCenter = document.getElementById("navbar-center");
    const hero = document.querySelector(".hero");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileDropdown = document.getElementById("mobile-dropdown");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav-links a");

    if (!navbarCenter || !hero || !mobileMenuBtn || !mobileDropdown || !mobileMenuOverlay) return;

    let menuOpen = false;

    function handleScroll() {
        if (window.pageYOffset > 16) {
            navbarCenter.classList.add('sticky');
        } else {
            navbarCenter.classList.remove('sticky');
        }

        const heroBottom = hero.offsetTop + hero.offsetHeight;
        if (window.pageYOffset > heroBottom) {
            navbarCenter.classList.add('scrolled');
        } else {
            navbarCenter.classList.remove('scrolled');
        }
        
        // Add active class to nav items based on scroll position
        setActiveNavItem();
    }
    
    // Function to set active class to navigation items based on scroll position
    function setActiveNavItem() {
        const scrollPosition = window.scrollY + 100; // Offset to trigger slightly before reaching section
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove("active");
                });
                
                // Add active class to corresponding nav links
                const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
                activeLinks.forEach(link => {
                    link.classList.add("active");
                });
            }
        });
    }

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
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    let isScrolling;
    window.addEventListener('scroll', function () {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScroll, 50);
    }, false);

    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileMenuOverlay.addEventListener('click', toggleMenu);

    document.querySelectorAll('.mobile-nav-links a').forEach(link => { 
        link.addEventListener('click', toggleMenu);
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu();
        }
    });

    // Initialize active states
    handleScroll();
    setActiveNavItem();
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
});