// About Section Data
const books = [
    {
        image: "./assets/books/permanent_record.png",
        link: "#"
    },
    {
        image: "./assets/books/computational_thinking.png",
        link: "#"
    },
    {
        image: "./assets/books/no_longer_human.jpg",
        link: "#"
    }
];

// Toolbox Items
const tools = [
    'JavaScript', 'React', 'TypeScript', 'Node.js',
    'HTML/CSS', 'Git', 'Figma', 'Python',
    'Next.js', 'Tailwind', 'MongoDB', 'Express'
];

// Hobbies with initial positions
const hobbies = [
    { name: 'Chess', emoji: '♟️', left: '10%', top: '20%' },
    { name: 'Anime', emoji: '🥷🏾', left: '60%', top: '15%' },
    { name: 'Reading', emoji: '📚', left: '25%', top: '50%' },
    { name: 'Music', emoji: '🎵', left: '70%', top: '60%' },
    { name: 'Gaming', emoji: '🎮', left: '15%', top: '75%' },
    { name: 'Nappin', emoji: '😴', left: '35%', top: '20%' }
];

// Initialize Books
function initBooks() {
    const booksGrid = document.getElementById('books-grid');
    books.forEach(book => {
        const bookItem = document.createElement('a');
        bookItem.href = book.link;
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <img src="${book.image}" alt="Book Cover" class="book-image">
        `;
        booksGrid.appendChild(bookItem);
    });
}

// Initialize Toolbox with infinite scrolling
function createToolboxRow(containerId, items) {
    const container = document.getElementById(containerId);
    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items];
    
    duplicatedItems.forEach(tool => {
        const toolItem = document.createElement('div');
        toolItem.className = 'tool-item';
        toolItem.innerHTML = `
            <div class="tool-icon">
                <i class="fas fa-code"></i>
            </div>
            <span>${tool}</span>
        `;
        container.appendChild(toolItem);
    });
}

function initToolbox() {
    createToolboxRow('toolbox-row-1', tools);
    createToolboxRow('toolbox-row-2', tools);
}

// Initialize Hobbies with drag functionality
function initHobbies() {
    const hobbiesContainer = document.getElementById('hobbies-container');
    let draggedElement = null;
    let offsetX = 0;
    let offsetY = 0;

    hobbies.forEach(hobby => {
        const tag = document.createElement('div');
        tag.className = 'hobby-tag';
        tag.style.left = hobby.left;
        tag.style.top = hobby.top;
        tag.innerHTML = `
            <span class="hobby-emoji">${hobby.emoji}</span>
            <span>${hobby.name}</span>
        `;

        // Mouse events
        tag.addEventListener('mousedown', startDrag);
        
        // Touch events for mobile
        tag.addEventListener('touchstart', startDrag, { passive: false });

        hobbiesContainer.appendChild(tag);
    });

    function startDrag(e) {
        draggedElement = e.currentTarget;
        const rect = draggedElement.getBoundingClientRect();
        const containerRect = hobbiesContainer.getBoundingClientRect();
        
        if (e.type === 'mousedown') {
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
        } else {
            e.preventDefault();
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('touchend', stopDrag);
        }
        
        // Add active class for visual feedback
        draggedElement.style.opacity = '0.8';
        draggedElement.style.transform = 'scale(1.1)';
    }

    function drag(e) {
        if (!draggedElement) return;
        
        e.preventDefault();
        const containerRect = hobbiesContainer.getBoundingClientRect();
        const elementRect = draggedElement.getBoundingClientRect();
        
        let clientX, clientY;
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        // Calculate new position
        let newX = clientX - containerRect.left - offsetX;
        let newY = clientY - containerRect.top - offsetY;
        
        // Constrain within container boundaries
        newX = Math.max(0, Math.min(newX, containerRect.width - elementRect.width));
        newY = Math.max(0, Math.min(newY, containerRect.height - elementRect.height));
        
        // Apply new position
        draggedElement.style.left = newX + 'px';
        draggedElement.style.top = newY + 'px';
    }

    function stopDrag() {
        if (!draggedElement) return;
        
        // Remove active styles
        draggedElement.style.opacity = '1';
        draggedElement.style.transform = 'scale(1)';
        
        draggedElement = null;
        
        // Remove event listeners
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', stopDrag);
    }
}

// Pause animations on hover for toolbox
function initToolboxHover() {
    const toolboxRows = document.querySelectorAll('.toolbox-row');
    toolboxRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.animationPlayState = 'paused';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.animationPlayState = 'running';
        });
    });
}

// Export functions for initialization
export { initBooks, initToolbox, initHobbies, initToolboxHover };