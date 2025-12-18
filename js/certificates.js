// Configuration for certificates
const config = {
    certificates: [
        {
            image: './assets/cert/Responsive Web Design.png',
            issuer: 'FreeCodeCamp',
            verifyUrl: 'https://www.credly.com/badges/your-badge-id'
        },
        {
            image: './assets/cert/Javascript Algorithms and Data Structures.png',
            issuer: 'FreeCodeCamp',
            verifyUrl: 'https://www.coursera.org/account/accomplishments/certificate/your-cert'
        },
        {
            image: './assets/cert/Front End Development Libraries.png',
            issuer: 'FreeCodeCamp',
            verifyUrl: 'https://www.credential.net/your-credential'
        },
        {
            image: './assets/cert/Data Visualization.png',
            issuer: 'FreeCodeCamp',
            verifyUrl: 'https://www.credly.com/badges/your-badge-id'
        }
        // {
        //     image: './assets/cert/FNB.png',
        //     issuer: 'FNB App Academy',
        //     verifyUrl: 'https://www.scrum.org/certificates/your-cert'
        // },
        // {
        //     image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop',
        //     issuer: 'MongoDB University',
        //     verifyUrl: 'https://university.mongodb.com/certification/certificate/your-cert'
        // }
    ]
};

// Initialize Certificates
function initCertificates() {
    const certificatesGrid = document.getElementById('certificatesGrid');
    certificatesGrid.innerHTML = config.certificates.map(cert => `
        <div class="certificate-card">
            <img src="${cert.image}" alt="Certificate from ${cert.issuer}" class="certificate-image">
            <div class="certificate-info">
                <p class="certificate-issuer">Issued by ${cert.issuer}</p>
                <a href="${cert.verifyUrl}" target="_blank" class="certificate-link">
                    <span>Verify Credential</span>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"/>
                    </svg>
                </a>
            </div>
        </div>
    `).join('');
}

export { initCertificates };