// Theme Management with Multiple Toggle Support
class ThemeManager {
    constructor() {
        // Get all theme toggle buttons
        this.themeToggles = [
            document.getElementById('navbar-theme-toggle'),
            document.getElementById('hero-theme-toggle'),
            document.getElementById('mobile-theme-toggle')
        ].filter(Boolean); // Remove null values
        
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listeners to all toggle buttons
        this.themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => this.toggleTheme());
        });
        
        // Listen for system theme changes
        this.watchSystemTheme();
        
        console.log('Theme manager initialized with', this.themeToggles.length, 'toggles');
    }
    
    setTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('theme-light');
            this.updateIcons('light');
        } else {
            document.body.classList.remove('theme-light');
            this.updateIcons('dark');
        }
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
    }
    
    updateIcons(theme) {
        this.themeToggles.forEach(toggle => {
            const sunIcon = toggle.querySelector('.sun-icon');
            const moonIcon = toggle.querySelector('.moon-icon');
            
            if (sunIcon && moonIcon) {
                if (theme === 'light') {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                } else {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                }
            }
        });
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    watchSystemTheme() {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');
        
        prefersDarkScheme.addEventListener('change', (e) => {
            if (e.matches && !localStorage.getItem('theme')) {
                this.setTheme('dark');
            }
        });
        
        prefersLightScheme.addEventListener('change', (e) => {
            if (e.matches && !localStorage.getItem('theme')) {
                this.setTheme('light');
            }
        });
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Export for use in other files
export { ThemeManager, themeManager };