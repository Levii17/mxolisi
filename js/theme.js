// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        this.watchSystemTheme();
    }
    
    setTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('theme-light');
        } else {
            document.body.classList.remove('theme-light');
        }
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
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