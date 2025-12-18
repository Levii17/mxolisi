// Configuration for contact
const config = {
    email: 'your.email@example.com'
};

// Initialize Contact
function initContact() {
    const contactButton = document.getElementById('contactButton');
    if (contactButton) {
        contactButton.href = `mailto:${config.email}`;
    }
}

export { initContact };