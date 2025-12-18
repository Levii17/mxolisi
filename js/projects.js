// Project Renderer Class
class ProjectRenderer {
    constructor(containerId, projects) {
        this.container = document.getElementById(containerId);
        this.projects = projects;
        this.arrowIcon = `
            <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    createMediaElement(project) {
        if (project.isVideo) {
            return `
                <video class="project-media" autoplay loop muted playsinline preload="metadata" 
                       onerror="this.parentElement.innerHTML='<div class=\\'media-fallback\\'>Video unavailable</div>'" 
                       onloadeddata="this.classList.add('loaded')">
                    <source src="${project.display}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else {
            return `
                <img src="${project.display}" alt="${project.title}" 
                     class="project-media" loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'; this.classList.add('loaded')"
                     onload="this.classList.add('loaded')">
            `;
        }
    }

    createCard(project, index) {
        // Determine which button to show
        const buttonLink = project.live_site.trim() ? project.live_site : project.figma_design;
        const buttonText = project.live_site.trim() ? 'Visit Live Site' : 'Visit Figma Design';
        
        // Create media element
        const mediaElement = this.createMediaElement(project);
        
        return `
            <div class="project-content">
                <div class="project-info">
                    <div class="project-header">
                        <div class="project-meta">
                            <div class="project-year">${project.year}</div>
                            <h3 class="project-title">${project.title}</h3>
                        </div>
                        <span class="github-link-mobile">
                            <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                                <button class="github-button" aria-label="View ${project.title} on GitHub">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733609.png" alt="GitHub" class="github-icon">
                                </button>
                            </a>
                        </span>
                    </div>
                    <hr class="divider">
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-actions">
                        <a href="${buttonLink}" target="_blank" rel="noopener noreferrer" class="project-button">
                            <span>${buttonText}</span>
                            ${this.arrowIcon}
                        </a>
                        <span class="github-link-desktop">
                            <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                                <button class="github-button" aria-label="View ${project.title} on GitHub">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733609.png" alt="GitHub" class="github-icon">
                                </button>
                            </a>
                        </span>
                    </div>
                </div>
                <div class="project-media-container">
                    <div class="skeleton" style="width:100%;height:100%;"></div>
                </div>
            </div>
        `;
    }

    render() {
        // Update the number of cards in CSS
        document.documentElement.style.setProperty('--cards', this.projects.length);
        
        this.projects.forEach((project, index) => {
            // Create wrapper li element
            const wrapper = document.createElement('li');
            wrapper.className = 'project-card-wrapper';
            wrapper.style.setProperty('--index', index + 1);
            
            // Create card
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = this.createCard(project, index);
            
            wrapper.appendChild(card);
            this.container.appendChild(wrapper);
            
            // Replace skeleton with actual media after a delay
            setTimeout(() => {
                const mediaContainer = card.querySelector('.project-media-container');
                const mediaElement = this.createMediaElement(project);
                mediaContainer.innerHTML = mediaElement;
            }, 100);
        });
    }

    initVideoControls() {
        document.querySelectorAll('video.project-media').forEach(video => {
            const wrapper = video.closest('.project-card');
            
            wrapper.addEventListener('mouseenter', () => {
                video.controls = true;
            });
            
            wrapper.addEventListener('mouseleave', () => {
                video.controls = false;
            });
            
            wrapper.addEventListener('focusin', () => {
                video.controls = true;
            });
            
            wrapper.addEventListener('focusout', () => {
                video.controls = false;
            });
        });
    }

    initObservers() {
        // Intersection Observer for cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Sample project data
const projects = [
    {
        year: "2025",
        title: "Electrical Symbols SVGs",
        description: "A web-based library showcasing electrical schematic symbols that comply with South African standards (SANS) and common international conventions. This project provides a visual reference for engineers, electricians, students, and hobbyists working with electrical diagrams.",
        live_site: "https://levii17.github.io/electricalSymbolPreview/",
        figma_design: "",
        github: "https://github.com/Levii17/electricalSymbolPreview",
        display: "./assets/works/electrical_symbols.mp4",
        isVideo: true
    },
    {
        year: "2025",
        title: "Muriel Schematics Prototype",
        description: "This is an early-stage prototype intended as a wireframe and UI/UX concept for the future full-featured Muriel Schematics web application. It focuses on layout, interaction flow, and visual design - not on complete functionality or production-ready performance.",
        live_site: "https://muriel-prototype-v2.vercel.app/",
        figma_design: "",
        github: "https://github.com/Levii17/murielPrototype-V2",
        display: "./assets/works/muriel_prototype.png",
        isVideo: false
    },
    {
        year: "2025",
        title: "Audio Quote Machine",
        description: "An interactive web app that plays random audio clips when you press specific keys — built for fun, creativity. Random Audio Playback – Press keys `Q`, `W`, `E`, `A`, `S`, `D`, `Z`, `X`, `C` to trigger unique sounds. Inspired by the FreeCodeCamp Front End Libraries Projects",
        live_site: "https://drum-machine-ruby-one.vercel.app/",
        figma_design: "",
        github: "https://github.com/Levii17/drumMachine",
        display: "./assets/works/audio_machine.mp4",
        isVideo: true
    }
];

// Export for use in index.js
export { ProjectRenderer, projects };