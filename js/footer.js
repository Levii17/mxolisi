// Configuration for footer
const config = {
    footerLinks: [
        { title: 'GitHub', href: 'https://github.com/yourusername' },
        { title: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
        { title: 'Twitter', href: 'https://twitter.com/yourusername' }
    ]
};

// Initialize Footer Links
function initFooterLinks() {
    const footerNav = document.getElementById('footerNav');
    if (footerNav) {
        footerNav.innerHTML = config.footerLinks.map(link => `
            <a href="${link.href}" target="_blank" class="footer-link">
                <span>${link.title}</span>
                <svg class="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"/>
                </svg>
            </a>
        `).join('');
    }
}

export { initFooterLinks };