"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCertificates = initCertificates;
// Configuration for certificates
var config = {
  certificates: [{
    image: './assets/cert/Responsive Web Design.png',
    issuer: 'FreeCodeCamp',
    verifyUrl: 'https://www.credly.com/badges/your-badge-id'
  }, {
    image: './assets/cert/Javascript Algorithms and Data Structures.png',
    issuer: 'FreeCodeCamp',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/certificate/your-cert'
  }, {
    image: './assets/cert/Front End Development Libraries.png',
    issuer: 'FreeCodeCamp',
    verifyUrl: 'https://www.credential.net/your-credential'
  }, {
    image: './assets/cert/Data Visualization.png',
    issuer: 'FreeCodeCamp',
    verifyUrl: 'https://www.credly.com/badges/your-badge-id'
  } // {
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
}; // Initialize Certificates

function initCertificates() {
  var certificatesGrid = document.getElementById('certificatesGrid');
  certificatesGrid.innerHTML = config.certificates.map(function (cert) {
    return "\n        <div class=\"certificate-card\">\n            <img src=\"".concat(cert.image, "\" alt=\"Certificate from ").concat(cert.issuer, "\" class=\"certificate-image\">\n            <div class=\"certificate-info\">\n                <p class=\"certificate-issuer\">Issued by ").concat(cert.issuer, "</p>\n                <a href=\"").concat(cert.verifyUrl, "\" target=\"_blank\" class=\"certificate-link\">\n                    <span>Verify Credential</span>\n                    <svg viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                        <path d=\"M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z\"/>\n                    </svg>\n                </a>\n            </div>\n        </div>\n    ");
  }).join('');
}