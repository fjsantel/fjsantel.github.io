const mediaDatabase = [
    {
        id: 1,
        title: "Reel Audiovisual 2024",
        description: "Compilación de proyectos audiovisuales destacados del año 2024, incluyendo motion graphics, animaciones y contenido comercial.",
        category: "motion",
        thumbnail: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/Reel_2024.mp4", // Usaremos el video como thumbnail
        videoUrl: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/Reel_2024.mp4",
        tags: ["motion graphics", "reel", "commercial"],
        year: "2024",
        client: "Portfolio Personal"
    },
    {
        id: 2,
        title: "Animación Comercial AY1",
        description: "Proyecto de animación comercial con enfoque en branding y storytelling visual.",
        category: "commercial",
        thumbnail: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/AY1.mp4",
        videoUrl: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/AY1.mp4",
        tags: ["commercial", "branding", "animation"],
        year: "2025",
        client: "Cliente Comercial"
    },
    {
        id: 3,
        title: "Motion Graphics AY2",
        description: "Exploración de técnicas avanzadas de motion graphics y diseño en movimiento.",
        category: "motion",
        thumbnail: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/AY2.mp4",
        videoUrl: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/AY2.mp4",
        tags: ["motion graphics", "design", "2d"],
        year: "2025",
        client: "Proyecto Personal"
    },
    {
        id: 4,
        title: "Animación Creativa AY3",
        description: "Proyecto experimental de animación con técnicas mixtas y narrativa visual.",
        category: "animation",
        thumbnail: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/AY3.mp4",
        videoUrl: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/AY3.mp4",
        tags: ["animation", "experimental", "creative"],
        year: "2025",
        client: "Desarrollo Personal"
    },
    {
        id: 5,
        title: "Contenido Visual AY4",
        description: "Creación de contenido visual dinámico para plataformas digitales.",
        category: "personal",
        thumbnail: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/AY4.mp4",
        videoUrl: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/AY4.mp4",
        tags: ["digital content", "social media", "visual"],
        year: "2025",
        client: "Contenido Personal"
    },
    {
        id: 6,
        title: "Background Visual Fondo2",
        description: "Elemento visual de fondo diseñado para crear atmósferas envolventes.",
        category: "motion",
        thumbnail: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/Fondo2.mp4",
        videoUrl: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/Fondo2.mp4",
        tags: ["background", "atmosphere", "visual"],
        year: "2025",
        client: "Recurso Visual"
    },
    {
        id: 7,
        title: "Fondo Atmosférico 1",
        description: "Creación de ambiente visual inmersivo con efectos de partículas y movimiento sutil.",
        category: "personal",
        thumbnail: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/fondo%201..mp4",
        videoUrl: "https://github.com/fjsantel/RESPALDO-SITIO/raw/main/VIDEO%20ASSETS/fondo%201..mp4",
        tags: ["background", "particles", "ambient"],
        year: "2025",
        client: "Desarrollo Creativo"
    }
];

const colorPalettes = {
    neon: {
        '--primary-color': '#ff0080',
        '--secondary-color': '#00ff80',
        '--bg-primary': '#0a0a0a',
        '--bg-secondary': '#1a1a1a',
        '--accent-color': '#8000ff',
        '--text-primary': '#ffffff',
        '--text-secondary': '#cccccc'
    },
    ocean: {
        '--primary-color': '#0066cc',
        '--secondary-color': '#00cccc',
        '--bg-primary': '#0a1929',
        '--bg-secondary': '#1e293b',
        '--accent-color': '#66ccff',
        '--text-primary': '#ffffff',
        '--text-secondary': '#94a3b8'
    },
    sunset: {
        '--primary-color': '#ff6b35',
        '--secondary-color': '#f7931e',
        '--bg-primary': '#1a0f0a',
        '--bg-secondary': '#2d1b0e',
        '--accent-color': '#ffcc02',
        '--text-primary': '#ffffff',
        '--text-secondary': '#d4af8c'
    },
    forest: {
        '--primary-color': '#2d5a27',
        '--secondary-color': '#40826d',
        '--bg-primary': '#0f1a0e',
        '--bg-secondary': '#1a2d18',
        '--accent-color': '#95c623',
        '--text-primary': '#ffffff',
        '--text-secondary': '#a3d977'
    },
    monochrome: {
        '--primary-color': '#ffffff',
        '--secondary-color': '#888888',
        '--bg-primary': '#000000',
        '--bg-secondary': '#1a1a1a',
        '--accent-color': '#333333',
        '--text-primary': '#ffffff',
        '--text-secondary': '#cccccc'
    }
};

class DynamicGalleryController {
    constructor() {
        this.currentFilter = 'all';
        this.currentModal = null;
        this.currentPalette = 'neon';
        this.init();
    }

    init() {
        this.setupPaletteController();
        this.setupFilterControls();
        this.renderMediaGrid();
        this.setupModal();
        this.setupKeyboardNavigation();
    }

    setupPaletteController() {
        const trigger = document.querySelector('.palette-trigger');
        const options = document.querySelector('.palette-options');
        const paletteOptions = document.querySelectorAll('.palette-option');

        trigger?.addEventListener('click', () => {
            options?.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.color-palette-controller')) {
                options?.classList.remove('active');
            }
        });

        paletteOptions.forEach(option => {
            option.addEventListener('click', () => {
                const palette = option.dataset.palette;
                this.changePalette(palette);
                
                paletteOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                options?.classList.remove('active');
            });
        });
    }

    changePalette(paletteName) {
        this.currentPalette = paletteName;
        const palette = colorPalettes[paletteName];
        
        if (palette) {
            const root = document.documentElement;
            Object.entries(palette).forEach(([property, value]) => {
                root.style.setProperty(property, value);
            });
        }
    }

    setupFilterControls() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.currentFilter = filter;
                
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.filterMedia(filter);
            });
        });
    }

    renderMediaGrid() {
        const grid = document.querySelector('.media-grid');
        if (!grid) return;

        grid.innerHTML = '';
        
        mediaDatabase.forEach((media, index) => {
            const card = this.createMediaCard(media, index);
            grid.appendChild(card);
        });
    }

    createMediaCard(media, index) {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.dataset.category = media.category;
        card.dataset.id = media.id;
        card.style.setProperty('--delay', `${index * 0.1}s`);

        // Para videos, creamos un thumbnail desde el primer frame
        const thumbnailElement = media.thumbnail.endsWith('.mp4') 
            ? `<video muted preload="metadata" style="pointer-events: none;">
                 <source src="${media.thumbnail}#t=0.1" type="video/mp4">
               </video>`
            : `<img src="${media.thumbnail}" alt="${media.title}">`;

        card.innerHTML = `
            <div class="media-thumbnail">
                ${thumbnailElement}
                <div class="play-overlay">
                    <div class="play-button"></div>
                </div>
            </div>
            <div class="media-info">
                <h3 class="media-title">${media.title}</h3>
                <p class="media-description">${media.description}</p>
                <div class="media-meta">
                    <span class="media-year">${media.year}</span>
                    <span class="media-client">${media.client}</span>
                </div>
                <div class="media-tags">
                    ${media.tags.map(tag => `<span class="media-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            this.openModal(media.id);
        });

        return card;
    }

    filterMedia(category) {
        const cards = document.querySelectorAll('.media-card');
        
        cards.forEach((card, index) => {
            const cardCategory = card.dataset.category;
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
    }

    setupModal() {
        const modal = document.querySelector('.video-modal');
        const closeBtn = document.querySelector('.close-modal');
        const prevBtn = document.querySelector('.modal-prev');
        const nextBtn = document.querySelector('.modal-next');

        closeBtn?.addEventListener('click', () => this.closeModal());
        prevBtn?.addEventListener('click', () => this.navigateModal(-1));
        nextBtn?.addEventListener('click', () => this.navigateModal(1));

        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    openModal(mediaId) {
        const media = mediaDatabase.find(m => m.id == mediaId);
        if (!media) return;

        const modal = document.querySelector('.video-modal');
        const video = document.querySelector('.modal-video');
        const title = document.querySelector('.modal-title');
        const description = document.querySelector('.modal-description');
        const year = document.querySelector('.modal-meta .media-year');
        const client = document.querySelector('.modal-meta .media-client');

        if (video) video.src = media.videoUrl;
        if (title) title.textContent = media.title;
        if (description) description.textContent = media.description;
        if (year) year.textContent = media.year;
        if (client) client.textContent = media.client;

        this.currentModal = mediaId;
        modal?.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Auto play video
        if (video) {
            video.play().catch(e => console.log('Autoplay prevented:', e));
        }
    }

    closeModal() {
        const modal = document.querySelector('.video-modal');
        const video = document.querySelector('.modal-video');

        modal?.classList.remove('active');
        document.body.style.overflow = '';
        
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        
        this.currentModal = null;
    }

    navigateModal(direction) {
        if (!this.currentModal) return;

        const currentIndex = mediaDatabase.findIndex(m => m.id == this.currentModal);
        let newIndex = currentIndex + direction;

        if (newIndex < 0) newIndex = mediaDatabase.length - 1;
        if (newIndex >= mediaDatabase.length) newIndex = 0;

        const newMedia = mediaDatabase[newIndex];
        this.openModal(newMedia.id);
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.currentModal) return;

            switch(e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.navigateModal(-1);
                    break;
                case 'ArrowRight':
                    this.navigateModal(1);
                    break;
                case ' ':
                    e.preventDefault();
                    const video = document.querySelector('.modal-video');
                    if (video) {
                        video.paused ? video.play() : video.pause();
                    }
                    break;
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if gallery elements exist before initializing
    if (document.querySelector('.dynamic-gallery-container')) {
        new DynamicGalleryController();
    }
});

// Handle video thumbnail loading
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.media-thumbnail video');
    videos.forEach(video => {
        video.addEventListener('loadedmetadata', () => {
            video.currentTime = 0.1; // Seek to first frame
        });
    });
});