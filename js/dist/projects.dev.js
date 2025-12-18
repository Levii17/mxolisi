"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projects = exports.ProjectRenderer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Project Renderer Class
var ProjectRenderer =
/*#__PURE__*/
function () {
  function ProjectRenderer(containerId, projects) {
    _classCallCheck(this, ProjectRenderer);

    this.container = document.getElementById(containerId);
    this.projects = projects;
    this.arrowIcon = "\n            <svg class=\"arrow-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                <path d=\"M7 17L17 7M17 7H7M17 7v10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            </svg>\n        ";
  }

  _createClass(ProjectRenderer, [{
    key: "createMediaElement",
    value: function createMediaElement(project) {
      if (project.isVideo) {
        return "\n                <video class=\"project-media\" autoplay loop muted playsinline style=\"pointer-events: none;\" preload=\"metadata\" \n                       onerror=\"this.parentElement.innerHTML='<div class=\\'media-fallback\\'>Video unavailable</div>'\" \n                       onloadeddata=\"this.classList.add('loaded')\">\n                    <source src=\"".concat(project.display, "\" type=\"video/mp4\">\n                    Your browser does not support the video tag.\n                </video>\n            ");
      } else {
        return "\n                <img src=\"".concat(project.display, "\" alt=\"").concat(project.title, "\" \n                     class=\"project-media\" loading=\"lazy\"\n                     onerror=\"this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'; this.classList.add('loaded')\"\n                     onload=\"this.classList.add('loaded')\">\n            ");
      }
    }
  }, {
    key: "createCard",
    value: function createCard(project, index) {
      // Determine which button to show
      var buttonLink = project.live_site.trim() ? project.live_site : project.figma_design;
      var buttonText = project.live_site.trim() ? 'Visit Live Site' : 'Visit Figma Design'; // Create media element

      var mediaElement = this.createMediaElement(project);
      return "\n            <div class=\"project-content\">\n                <div class=\"project-info\">\n                    <div class=\"project-header\">\n                        <div class=\"project-meta\">\n                            <div class=\"project-year\">".concat(project.year, "</div>\n                            <h3 class=\"project-title\">").concat(project.title, "</h3>\n                        </div>\n                        <span class=\"github-link-mobile\">\n                            <a href=\"").concat(project.github, "\" target=\"_blank\" rel=\"noopener noreferrer\">\n                                <button class=\"github-button\" aria-label=\"View ").concat(project.title, " on GitHub\">\n                                    <img src=\"https://cdn-icons-png.flaticon.com/512/733/733609.png\" alt=\"GitHub\" class=\"github-icon\">\n                                </button>\n                            </a>\n                        </span>\n                    </div>\n                    <hr class=\"divider\">\n                    <p class=\"project-description\">").concat(project.description, "</p>\n                    \n                    <div class=\"project-actions\">\n                        <a href=\"").concat(buttonLink, "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"project-button\">\n                            <span>").concat(buttonText, "</span>\n                            ").concat(this.arrowIcon, "\n                        </a>\n                        <span class=\"github-link-desktop\">\n                            <a href=\"").concat(project.github, "\" target=\"_blank\" rel=\"noopener noreferrer\">\n                                <button class=\"github-button\" aria-label=\"View ").concat(project.title, " on GitHub\">\n                                    <img src=\"https://cdn-icons-png.flaticon.com/512/733/733609.png\" alt=\"GitHub\" class=\"github-icon\">\n                                </button>\n                            </a>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"project-media-container\">\n                    <div class=\"skeleton\" style=\"width:100%;height:100%;\"></div>\n                </div>\n            </div>\n        ");
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      // Update the number of cards in CSS
      document.documentElement.style.setProperty('--cards', this.projects.length);
      this.projects.forEach(function (project, index) {
        // Create wrapper li element
        var wrapper = document.createElement('li');
        wrapper.className = 'project-card-wrapper';
        wrapper.style.setProperty('--index', index + 1); // Create card

        var card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = _this.createCard(project, index);
        wrapper.appendChild(card);

        _this.container.appendChild(wrapper); // Replace skeleton with actual media after a delay


        setTimeout(function () {
          var mediaContainer = card.querySelector('.project-media-container');

          var mediaElement = _this.createMediaElement(project);

          mediaContainer.innerHTML = mediaElement;
        }, 100);
      });
    }
  }, {
    key: "initVideoControls",
    value: function initVideoControls() {
      document.querySelectorAll('video.project-media').forEach(function (video) {
        var wrapper = video.closest('.project-card');
        wrapper.addEventListener('mouseenter', function () {
          video.controls = true;
        });
        wrapper.addEventListener('mouseleave', function () {
          video.controls = false;
        });
        wrapper.addEventListener('focusin', function () {
          video.controls = true;
        });
        wrapper.addEventListener('focusout', function () {
          video.controls = false;
        });
      });
    }
  }, {
    key: "initObservers",
    value: function initObservers() {
      // Intersection Observer for cards
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, {
        threshold: 0.3
      });
      document.querySelectorAll('.project-card').forEach(function (card) {
        observer.observe(card);
      });
    }
  }]);

  return ProjectRenderer;
}(); // Sample project data


exports.ProjectRenderer = ProjectRenderer;
var projects = [{
  year: "2025",
  title: "Electrical Symbols SVGs",
  description: "SANS‑compliant web library of electrical schematic symbols for engineers and students.",
  live_site: "https://levii17.github.io/electricalSymbolPreview/",
  figma_design: "",
  github: "https://github.com/Levii17/electricalSymbolPreview",
  display: "./assets/works/electrical_symbols.mp4",
  isVideo: true
}, {
  year: "2025",
  title: "Muriel Schematics Prototype",
  description: "Wireframe/UI prototype focused on layout and interaction flow.",
  live_site: "https://muriel-prototype-v2.vercel.app/",
  figma_design: "",
  github: "https://github.com/Levii17/murielPrototype-V2",
  display: "./assets/works/muriel_prototype.png",
  isVideo: false
}, {
  year: "2025",
  title: "Audio Quote Machine",
  description: "Drum-style app that plays mapped audio clips via keys Q W E A S D Z X C. Designed as part of FreeCodeCamp curriculum.",
  live_site: "https://drum-machine-ruby-one.vercel.app/",
  figma_design: "",
  github: "https://github.com/Levii17/drumMachine",
  display: "./assets/works/audio_machine.mp4",
  isVideo: true
}]; // Export for use in index.js

exports.projects = projects;