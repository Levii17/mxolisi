"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initBooks = initBooks;
exports.initToolbox = initToolbox;
exports.initHobbies = initHobbies;
exports.initToolboxHover = initToolboxHover;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// About Section Data
var books = [{
  image: "./assets/books/permanent_record.png",
  link: "#"
}, {
  image: "./assets/books/computational_thinking.png",
  link: "#"
}, {
  image: "./assets/books/no_longer_human.jpg",
  link: "#"
}]; // Toolbox Items

var tools = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'HTML/CSS', 'Git', 'Figma', 'Python', 'Next.js', 'Tailwind', 'MongoDB', 'Express']; // Hobbies with initial positions

var hobbies = [{
  name: 'Chess',
  emoji: '♟️',
  left: '10%',
  top: '20%'
}, {
  name: 'Anime',
  emoji: '🥷🏾',
  left: '60%',
  top: '15%'
}, {
  name: 'Reading',
  emoji: '📚',
  left: '25%',
  top: '50%'
}, {
  name: 'Music',
  emoji: '🎵',
  left: '70%',
  top: '60%'
}, {
  name: 'Gaming',
  emoji: '🎮',
  left: '15%',
  top: '75%'
}, {
  name: 'Nappin',
  emoji: '😴',
  left: '35%',
  top: '20%'
}]; // Initialize Books

function initBooks() {
  var booksGrid = document.getElementById('books-grid');
  books.forEach(function (book) {
    var bookItem = document.createElement('a');
    bookItem.href = book.link;
    bookItem.className = 'book-item';
    bookItem.innerHTML = "\n            <img src=\"".concat(book.image, "\" alt=\"Book Cover\" class=\"book-image\">\n        ");
    booksGrid.appendChild(bookItem);
  });
} // Initialize Toolbox with infinite scrolling


function createToolboxRow(containerId, items) {
  var container = document.getElementById(containerId); // Duplicate items for seamless loop

  var duplicatedItems = [].concat(_toConsumableArray(items), _toConsumableArray(items));
  duplicatedItems.forEach(function (tool) {
    var toolItem = document.createElement('div');
    toolItem.className = 'tool-item';
    toolItem.innerHTML = "\n            <div class=\"tool-icon\">\n                <i class=\"fas fa-code\"></i>\n            </div>\n            <span>".concat(tool, "</span>\n        ");
    container.appendChild(toolItem);
  });
}

function initToolbox() {
  createToolboxRow('toolbox-row-1', tools);
  createToolboxRow('toolbox-row-2', tools);
} // Initialize Hobbies with drag functionality


function initHobbies() {
  var hobbiesContainer = document.getElementById('hobbies-container');
  var draggedElement = null;
  var offsetX = 0;
  var offsetY = 0;
  hobbies.forEach(function (hobby) {
    var tag = document.createElement('div');
    tag.className = 'hobby-tag';
    tag.style.left = hobby.left;
    tag.style.top = hobby.top;
    tag.innerHTML = "\n            <span class=\"hobby-emoji\">".concat(hobby.emoji, "</span>\n            <span>").concat(hobby.name, "</span>\n        "); // Mouse events

    tag.addEventListener('mousedown', startDrag); // Touch events for mobile

    tag.addEventListener('touchstart', startDrag, {
      passive: false
    });
    hobbiesContainer.appendChild(tag);
  });

  function startDrag(e) {
    draggedElement = e.currentTarget;
    var rect = draggedElement.getBoundingClientRect();
    var containerRect = hobbiesContainer.getBoundingClientRect();

    if (e.type === 'mousedown') {
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
    } else {
      e.preventDefault();
      offsetX = e.touches[0].clientX - rect.left;
      offsetY = e.touches[0].clientY - rect.top;
      document.addEventListener('touchmove', drag, {
        passive: false
      });
      document.addEventListener('touchend', stopDrag);
    } // Add active class for visual feedback


    draggedElement.style.opacity = '0.8';
    draggedElement.style.transform = 'scale(1.1)';
  }

  function drag(e) {
    if (!draggedElement) return;
    e.preventDefault();
    var containerRect = hobbiesContainer.getBoundingClientRect();
    var elementRect = draggedElement.getBoundingClientRect();
    var clientX, clientY;

    if (e.type === 'mousemove') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } // Calculate new position


    var newX = clientX - containerRect.left - offsetX;
    var newY = clientY - containerRect.top - offsetY; // Constrain within container boundaries

    newX = Math.max(0, Math.min(newX, containerRect.width - elementRect.width));
    newY = Math.max(0, Math.min(newY, containerRect.height - elementRect.height)); // Apply new position

    draggedElement.style.left = newX + 'px';
    draggedElement.style.top = newY + 'px';
  }

  function stopDrag() {
    if (!draggedElement) return; // Remove active styles

    draggedElement.style.opacity = '1';
    draggedElement.style.transform = 'scale(1)';
    draggedElement = null; // Remove event listeners

    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', stopDrag);
  }
} // Pause animations on hover for toolbox


function initToolboxHover() {
  var toolboxRows = document.querySelectorAll('.toolbox-row');
  toolboxRows.forEach(function (row) {
    row.addEventListener('mouseenter', function () {
      row.style.animationPlayState = 'paused';
    });
    row.addEventListener('mouseleave', function () {
      row.style.animationPlayState = 'running';
    });
  });
} // Export functions for initialization