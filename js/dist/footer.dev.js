"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFooterLinks = initFooterLinks;
// Configuration for footer
var config = {
  footerLinks: [{
    title: 'GitHub',
    href: 'https://github.com/Levii17'
  }, {
    title: 'Instagram',
    href: 'https://www.instagram.com/x_mxolisi_x?igsh=MWNwYzM1b3E4dzVwMA=='
  }, {
    title: 'Twitter',
    href: 'https://x.com/x_mxolisi_x?t=fcSb40pEpo656AECH4tlfQ&s=09'
  }]
}; // Initialize Footer Links

function initFooterLinks() {
  var footerNav = document.getElementById('footerNav');

  if (footerNav) {
    footerNav.innerHTML = config.footerLinks.map(function (link) {
      return "\n            <a href=\"".concat(link.href, "\" target=\"_blank\" class=\"footer-link\">\n                <span>").concat(link.title, "</span>\n                <svg class=\"arrow-icon\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                    <path d=\"M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z\"/>\n                </svg>\n            </a>\n        ");
    }).join('');
  }
}