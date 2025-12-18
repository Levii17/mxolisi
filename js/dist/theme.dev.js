"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeManager = exports.ThemeManager = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Theme Management with Multiple Toggle Support
var ThemeManager =
/*#__PURE__*/
function () {
  function ThemeManager() {
    _classCallCheck(this, ThemeManager);

    // Get all theme toggle buttons
    this.themeToggles = [document.getElementById('navbar-theme-toggle'), document.getElementById('hero-theme-toggle'), document.getElementById('mobile-theme-toggle')].filter(Boolean); // Remove null values

    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  _createClass(ThemeManager, [{
    key: "init",
    value: function init() {
      var _this = this;

      // Set initial theme
      this.setTheme(this.currentTheme); // Add event listeners to all toggle buttons

      this.themeToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
          return _this.toggleTheme();
        });
      }); // Listen for system theme changes

      this.watchSystemTheme();
      console.log('Theme manager initialized with', this.themeToggles.length, 'toggles');
    }
  }, {
    key: "setTheme",
    value: function setTheme(theme) {
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
  }, {
    key: "updateIcons",
    value: function updateIcons(theme) {
      this.themeToggles.forEach(function (toggle) {
        var sunIcon = toggle.querySelector('.sun-icon');
        var moonIcon = toggle.querySelector('.moon-icon');

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
  }, {
    key: "toggleTheme",
    value: function toggleTheme() {
      var newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    }
  }, {
    key: "watchSystemTheme",
    value: function watchSystemTheme() {
      var _this2 = this;

      var prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      var prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');
      prefersDarkScheme.addEventListener('change', function (e) {
        if (e.matches && !localStorage.getItem('theme')) {
          _this2.setTheme('dark');
        }
      });
      prefersLightScheme.addEventListener('change', function (e) {
        if (e.matches && !localStorage.getItem('theme')) {
          _this2.setTheme('light');
        }
      });
    }
  }]);

  return ThemeManager;
}(); // Initialize theme manager


exports.ThemeManager = ThemeManager;
var themeManager = new ThemeManager(); // Export for use in other files

exports.themeManager = themeManager;