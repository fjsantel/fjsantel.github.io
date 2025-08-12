// FRANCISCO SANTELICES CREATIVE CONTENT - Pharmaceutical + Terminal Interface

// Initialize portfolio when DOM is ready
function initializePortfolio() {
    // Initialize core components
    new NavigationManager();
    new TerminalInterface();
    new ScrollAnimator(); // Initialize our new animations
    new CustomCursor(); // Initialize the custom cursor
    new ChatbotManager(); // Initialize the chatbot
    new VideoPortfolioManager('video-slider'); // Initialize the Video Portfolio section
    // Initialize motion graphics sound control
    new MotionGraphicsSoundController();
    // Initialize BFA video control
    new BFAVideoController();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    // DOM is already loaded
    initializePortfolio();
}

class NavigationManager {
    constructor() {
        this.navContainer = document.querySelector('.main-navigation');
        this.navBtns = document.querySelectorAll('.nav-btn');
        this.menuTrigger = document.getElementById('menu-trigger');
        this.isOpen = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Handle clicks on navigation buttons with improved touch handling
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleNavClick(e.target);
            });
            
            // Add touch feedback for mobile
            btn.addEventListener('touchstart', () => {
                btn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            
            btn.addEventListener('touchend', () => {
                setTimeout(() => {
                    btn.style.backgroundColor = '';
                }, 150);
            });
        });

        // Handle opening/closing the menu with touch improvements
        this.menuTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.isOpen = !this.isOpen;
            this.toggleMenu(this.isOpen);
        });

        // Add touch feedback for menu trigger
        this.menuTrigger.addEventListener('touchstart', () => {
            this.menuTrigger.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        this.menuTrigger.addEventListener('touchend', () => {
            setTimeout(() => {
                this.menuTrigger.style.backgroundColor = '';
            }, 150);
        });

        // Close menu when clicking outside (with touch support)
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.navContainer.contains(e.target) && !this.menuTrigger.contains(e.target)) {
                this.isOpen = false;
                this.toggleMenu(false);
            }
        });
        
        // Close menu on touch outside
        document.addEventListener('touchstart', (e) => {
            if (this.isOpen && !this.navContainer.contains(e.target) && !this.menuTrigger.contains(e.target)) {
                this.isOpen = false;
                this.toggleMenu(false);
            }
        });
    }

    handleNavClick(clickedBtn) {
        // Handle Bio section - open in new window
        if (clickedBtn.dataset.section === 'bio') {
            window.open('bio.html', '_blank');
            this.isOpen = false;
            this.toggleMenu(false);
            return;
        }

        // Handle Design section - navigate to design page
        if (clickedBtn.dataset.section === 'design') {
            window.location.href = 'design.html';
            return;
        }

        // Handle Photography section - navigate to photography page
        if (clickedBtn.dataset.section === 'photography') {
            window.location.href = 'photography.html';
            return;
        }

        // Handle Let's Create section - scroll to center "LET'S CREATE" title
        if (clickedBtn.dataset.section === 'lets-create') {
            this.navBtns.forEach(btn => btn.classList.remove('active'));
            clickedBtn.classList.add('active');
            this.isOpen = false;
            this.toggleMenu(false);
            
            // Wait for menu to close then scroll
            setTimeout(() => {
                const chatTitle = document.getElementById('chat-title-main');
                
                if (chatTitle) {
                    // Get title's current position
                    const titleRect = chatTitle.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    
                    // Calculate how much we need to scroll to center the title
                    const titleCurrentTop = titleRect.top;
                    const viewportCenter = viewportHeight / 2;
                    const titleHeight = titleRect.height;
                    
                    // Current scroll position + distance to move title to center
                    const currentScroll = window.pageYOffset;
                    const scrollToCenter = currentScroll + titleCurrentTop - viewportCenter + (titleHeight / 2);
                    
                    window.scrollTo({
                        top: scrollToCenter,
                        behavior: 'smooth'
                    });
                }
            }, 300);
            
            return;
        }

        // Do not run scroll logic for regular links
        if (!clickedBtn.dataset.section) return;

        this.navBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        
        const sectionId = clickedBtn.dataset.section;
        const targetSection = document.getElementById(sectionId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Close menu after selection
        this.isOpen = false;
        this.toggleMenu(false);
    }

    toggleMenu(show) {
        if (show) {
            this.navContainer.classList.add('active');
        } else {
            this.navContainer.classList.remove('active');
        }
    }
}

class TerminalInterface {
    constructor() {
        this.terminalElement = document.createElement('div');
        this.terminalElement.className = 'terminal-section';
        this.isOpen = false;
        
        this.init();
    }

    init() {
        this.createTerminalDOM();
        document.body.appendChild(this.terminalElement);
        this.setupKeybindings();
    }

    createTerminalDOM() {
        this.terminalElement.innerHTML = `
            <div class="terminal-output" id="terminalOutput"></div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">[FSCC@2025 ~]$</span>
                <input type="text" class="terminal-input" id="terminalInput" autofocus>
                <span class="cursor"></span>
            </div>
        `;

        this.outputElement = this.terminalElement.querySelector('#terminalOutput');
        this.inputElement = this.terminalElement.querySelector('#terminalInput');

        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.inputElement.value);
                this.inputElement.value = '';
            }
        });
    }

    setupKeybindings() {
        document.addEventListener('keydown', (e) => {
            // Open/close terminal with Ctrl + Space
            if (e.ctrlKey && e.code === 'Space') {
                this.toggle();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.terminalElement.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen) {
            this.inputElement.focus();
            this.printWelcomeMessage();
        }
    }

    printWelcomeMessage() {
        this.clearOutput();
        this.printLine('FRANCISCO SANTELICES CREATIVE CONTENT - TERMINAL INTERFACE');
        this.printLine('----------------------------------------------------------');
        this.printLine('Welcome. Type `help` for a list of available commands.');
        this.printLine(' ');
    }

    processCommand(command) {
        this.printLine(`> ${command}`);
        const [cmd, ...args] = command.toLowerCase().split(' ');

        switch (cmd) {
            case 'help':
                this.printHelp();
                break;
            case 'nav':
                this.handleNavigation(args[0]);
                break;
            case 'clear':
                this.clearOutput();
                break;
            case 'exit':
                this.toggle();
                break;
            default:
                this.printLine(`Error: command not found: ${cmd}`);
                break;
        }
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }

    printHelp() {
        this.printLine('Available commands:');
        this.printLine('  `help`          - Shows this help message.');
        this.printLine('  `nav [section]` - Navigates to a specific section.');
        this.printLine('                    (e.g., `nav audiovisual`)');
        this.printLine('  `clear`         - Clears the terminal screen.');
        this.printLine('  `exit`          - Closes the terminal.');
    }

    handleNavigation(section) {
        const navButton = document.querySelector(`.nav-btn[data-section="${section}"]`);
        if (navButton) {
            navButton.click();
            this.printLine(`Navigating to ${section}...`);
            setTimeout(() => this.toggle(), 500);
        } else {
            this.printLine(`Error: section not found: ${section}`);
        }
    }

    printLine(text) {
        const newLine = document.createElement('div');
        newLine.textContent = text;
        this.outputElement.appendChild(newLine);
    }

    clearOutput() {
        this.outputElement.innerHTML = '';
    }
}

class ScrollAnimator {
    constructor() {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        this.animatePhotoGrid();
        this.animateTypewriter();
    }

    animateTypewriter() {
        const words = ["CREATIVE CONTENT", "AUDIOVISUAL", "DESIGN", "ANIMATION", "SOCIAL MEDIA", "3D", "WEB", "CORPORATIVO", "DOCUMENTAL", "PRODUCCIÓN", "PRODUCT", "PUBLICIDAD"];
        const textElement = document.getElementById("typewriter-text");
        const typewriterElement = document.getElementById("typewriter");
        const cursorElement = document.querySelector(".typewriter-cursor");
        
        if (!textElement || !typewriterElement) return;

        let masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".seccion-texto-animado", // Renombrado
                start: "top 60%",
                toggleActions: "play pause resume reset"
            },
            repeat: -1,
            repeatDelay: 2
        });

        masterTl.to(cursorElement, { autoAlpha: 0, duration: 0.25, repeat: 3, yoyo: true, ease: "steps(1)" });

        words.forEach(word => {
            masterTl.to(textElement, { text: `_${word}`, duration: word.length * 0.1, ease: "none" })
                    .to(cursorElement, { autoAlpha: 0, duration: 0.25, repeat: 3, yoyo: true, ease: "steps(1)", delay: 1 })
                    .to(textElement, { text: "", duration: 0.5, ease: "none" });
        });
    }

    animatePhotoGrid() {
        gsap.from(".grid-item", {
            scrollTrigger: {
                trigger: ".photography-grid",
                start: "top 80%",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2
        });
    }
}

class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('custom-cursor');
        this.interactiveElements = document.querySelectorAll('button, a, .grid-item, #menu-trigger, input');
        this.init();
    }

    init() {
        if (!this.cursor) return;
        
        // Initialize cursor as visible and at center
        this.cursor.style.opacity = '1';
        this.cursor.style.left = '50%';
        this.cursor.style.top = '50%';
        this.cursor.style.transform = 'translate(-50%, -50%)';

        // Track mouse movement across entire document
        document.addEventListener('mousemove', e => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            this.cursor.style.transform = 'translate(-50%, -50%)';
            this.cursor.style.opacity = '1';
        });

        // Show cursor when mouse enters any part of the page
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });

        // Hide cursor only when mouse completely leaves the page
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        // Add hover effects for interactive elements
        this.interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });

        // Ensure cursor is visible on page load
        setTimeout(() => {
            if (this.cursor) {
                this.cursor.style.opacity = '1';
            }
        }, 100);
    }
}

class ChatbotManager {
    constructor() {
        this.chatContainer = document.querySelector('.chat-container');
        this.chatHistory = document.querySelector('.chat-history');
        this.input = document.getElementById('chat-input');
        this.chatTitleMain = document.getElementById('chat-title-main');
        this.chatTitleSub = document.getElementById('chat-title-sub');
        this.conversationState = 'START';
        this.warningTimer = null;
        this.resetTimer = null;
        this.isDestroyed = false;
        this.init();
    }

    init() {
        if (!this.chatContainer || !this.chatHistory || !this.input || !this.chatTitleMain || !this.chatTitleSub) {
            return;
        }

        this.input.addEventListener('focus', () => this.handleFocus(true));
        this.input.addEventListener('blur', () => this.handleFocus(false));
        this.input.addEventListener('keydown', (e) => {
            this.clearTimers();
            if (e.key === 'Enter') this.processInput();
        });

        this.displayBotMessage("Comienza aquí. ¿Cuál es la esencia de tu idea?");
    }

    handleFocus(isFocused) {
        this.clearTimers();
        if (isFocused) {
            this.chatContainer.classList.add('title-active');
        } else {
            if (this.input.value.trim() === '' && this.conversationState !== 'FINISHED') {
                this.startInactivityTimers();
            }
        }
    }

    startInactivityTimers() {
        this.warningTimer = setTimeout(() => {
            this.displayBotMessage("Parece que ya no estás escribiendo. Presiona cualquier tecla para continuar. Voy a reiniciar en 15 segundos.");
            this.resetTimer = setTimeout(() => this.resetChat(true), 15000);
        }, 10000);
    }

    clearTimers() {
        if (this.warningTimer) {
            clearTimeout(this.warningTimer);
            this.warningTimer = null;
        }
        if (this.resetTimer) {
            clearTimeout(this.resetTimer);
            this.resetTimer = null;
        }
    }

    updateSubTitle(newText) {
        gsap.to(this.chatTitleSub, { 
            opacity: 0, duration: 0.3, 
            onComplete: () => {
                this.chatTitleSub.textContent = newText;
                gsap.to(this.chatTitleSub, { opacity: 1, duration: 0.3 });
            }
        });
    }

    processInput() {
        const userInput = this.input.value.trim();
        if (userInput === '') return;

        this.displayUserMessage(userInput);
        this.input.value = '';
        this.input.disabled = true;

        this.handleStateChange(this.conversationState, userInput);
    }

    handleStateChange(currentState, userInput = '') {
        let nextState = currentState;

        switch (currentState) {
            case 'START':
                this.updateSubTitle("[ PASO 1: EL CONTEXTO ]");
                this.displayBotMessage("Para empezar, ¿este proyecto es para ti, para tu marca personal, o para una empresa?");
                nextState = 'AWAITING_CONTEXT';
                break;

            case 'AWAITING_CONTEXT':
                this.handleContextResponse(userInput);
                return; // handleContextResponse will set the next state

            case 'AWAITING_PURPOSE':
                this.updateSubTitle("[ PASO 3: EL FORMATO ]");
                this.displayBotMessage("Entendido. Y para darle vida a ese objetivo, ¿en qué formato lo has imaginado? ¿VIDEO, DISEÑO, FOTO, WEB?");
                nextState = 'AWAITING_FORMAT';
                break;

            case 'AWAITING_FORMAT':
                this.updateSubTitle("[ PASO 4: TU VISIÓN ]");
                this.displayBotMessage("Perfecto. Ahora, descríbelo todo. Estamos a muy poco de verlo realidad.");
                nextState = 'AWAITING_FINAL_DESCRIPTION';
                break;

            case 'AWAITING_FINAL_DESCRIPTION':
                this.updateSubTitle("[ ÚLTIMO PASO: TU CONTACTO ]");
                this.displayBotMessage("Para cerrar el círculo, por favor, déjame tu email o teléfono para poder contactarte.");
                nextState = 'AWAITING_CONTACT';
                break;

            case 'AWAITING_CONTACT':
                this.updateSubTitle("[ TRANSMISIÓN COMPLETA ]");
                this.displayBotMessage("[ REGISTRO ENVIADO ] Gracias. Te contactaré en breve.");
                setTimeout(() => this.displayBotMessage("El chat se reiniciará en 10 segundos..."), 1500);
                setTimeout(() => this.resetChat(true), 10000);
                nextState = 'FINISHED';
                break;
        }
        this.conversationState = nextState;
        this.input.disabled = false;
        this.input.focus();
    }

    handleContextResponse(userInput) {
        const input = userInput.toLowerCase();
        this.updateSubTitle("[ PASO 2: EL PROPÓSITO ]");
        if (input.includes('empresa')) {
            this.displayBotMessage("Perfecto. ¿El objetivo es comunicacional (lanzar un producto), de branding (crear o renovar la identidad), o de marketing (contenido para redes, web)?");
        } else {
            this.displayBotMessage("Genial. ¿Buscas expresar una idea artística, potenciar tu marca, o algo más?");
        }
        this.conversationState = 'AWAITING_PURPOSE';
        this.input.disabled = false;
        this.input.focus();
    }

    resetChat(withAnimation) {
        this.clearTimers();
        if (withAnimation) {
            const resetContainer = document.getElementById('reset-animation-container');
            const outline = resetContainer.querySelector('.reset-triangle-outline');
            const solid = resetContainer.querySelector('.reset-triangle-solid');

            gsap.to(this.chatContainer, { 
                opacity: 0, duration: 0.5, 
                onComplete: () => {
                    gsap.to(resetContainer, { opacity: 1, duration: 0.2 });
                    gsap.fromTo(outline, 
                        { scale: 0.5, rotation: -45 }, 
                        { scale: 1, rotation: 0, duration: 1, ease: "power2.out" }
                    );
                    gsap.fromTo(solid, 
                        { scale: 0.5, rotation: 45 }, 
                        { scale: 1, rotation: 0, duration: 1.2, ease: "power2.out" }
                    );
                    gsap.to(resetContainer, { 
                        opacity: 0, duration: 1, delay: 2.5, ease: "power2.in",
                        onComplete: () => this.resetInterface()
                    });
                }
            });
        } else {
            this.resetInterface();
        }
    }

    resetInterface(){
        this.chatHistory.innerHTML = '';
        this.conversationState = 'START';
        this.updateSubTitle("");
        this.chatContainer.classList.remove('title-active');
        this.input.disabled = false;
        this.input.placeholder = "Describe tu proyecto...";
        this.displayBotMessage("Comienza aquí. ¿Cuál es la esencia de tu idea?");
        gsap.to(this.chatContainer, { opacity: 1, duration: 0.5 });
    }

    displayUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message user';
        messageElement.textContent = message;
        this.chatHistory.appendChild(messageElement);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    displayBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message bot';
        messageElement.textContent = message;
        this.chatHistory.appendChild(messageElement);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    destroy() {
        this.isDestroyed = true;
        this.clearTimers();
        
        // Remove event listeners
        if (this.input) {
            this.input.removeEventListener('focus', this.handleFocus);
            this.input.removeEventListener('blur', this.handleFocus);
            this.input.removeEventListener('keydown', this.processInput);
        }
    }
}

class VideoPortfolioManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.slides = this.container.querySelectorAll('.video-slide');
        this.soundBtn = document.getElementById('sound-activation-btn');
        this.prevBtn = document.getElementById('slider-prev-bottom');
        this.nextBtn = document.getElementById('slider-next-bottom');
        this.videoTitleElement = this.container.querySelector('.video-title');
        this.videoDescriptionElement = this.container.querySelector('.video-description');

        this.videos = []; // Array to store video elements
        this.currentSlideIndex = 0;
        this.isMuted = true; // Global mute state for all videos

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeVideos();
        this.showSlide(this.currentSlideIndex);
    }

    setupEventListeners() {
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.goToNextSlide());
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.goToPreviousSlide());
        if (this.soundBtn) this.soundBtn.addEventListener('click', () => this.toggleGlobalSound());
    }

    initializeVideos() {
        this.slides.forEach((slide, index) => {
            const video = slide.querySelector('.portfolio-video');
            if (video) {
                this.videos[index] = video;
                
                // Set up video event listeners
                video.addEventListener('loadeddata', () => {
                    if (index === 0) {
                        this.soundBtn.disabled = false;
                        this.updateSoundButtonText();
                    }
                });

                video.addEventListener('ended', () => {
                    if (index === this.currentSlideIndex) {
                        this.goToNextSlide();
                    }
                });

                // Ensure video is muted initially
                video.muted = this.isMuted;
                video.volume = 0.7; // Set volume for when unmuted
            }
        });
    }

    showSlide(index) {
        // Pause current video
        const currentVideo = this.videos[this.currentSlideIndex];
        if (currentVideo) {
            currentVideo.pause();
            this.slides[this.currentSlideIndex].classList.remove('active');
        }

        // Update current slide index
        this.currentSlideIndex = index;

        // Show new slide
        const newSlide = this.slides[this.currentSlideIndex];
        const newVideo = this.videos[this.currentSlideIndex];
        
        newSlide.classList.add('active');

        // Update text content
        this.videoTitleElement.textContent = newSlide.dataset.title;
        this.videoDescriptionElement.textContent = newSlide.dataset.description;

        // Play new video
        if (newVideo) {
            newVideo.currentTime = 0; // Reset to beginning
            newVideo.muted = this.isMuted; // Apply current sound state
            newVideo.play().catch(error => {
                console.log('Video autoplay failed:', error);
            });
        }
    }

    goToNextSlide() {
        const nextIndex = (this.currentSlideIndex + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    goToPreviousSlide() {
        const prevIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    toggleGlobalSound() {
        this.isMuted = !this.isMuted;
        
        // Apply to all portfolio videos
        this.videos.forEach(video => {
            if (video) {
                video.muted = this.isMuted;
            }
        });
        
        this.updateSoundButtonText();
    }

    updateSoundButtonText() {
        if (this.isMuted) {
            this.soundBtn.textContent = 'ACTIVAR SONIDO';
            this.soundBtn.classList.remove('active');
        } else {
            this.soundBtn.textContent = 'SONIDO ACTIVADO';
            this.soundBtn.classList.add('active');
        }
    }
}

// Motion Graphics Sound Controller
class MotionGraphicsSoundController {
    constructor() {
        this.video = document.getElementById('motion-graphics-video');
        this.soundBtn = document.getElementById('motion-graphics-sound-btn');
        this.isMuted = true;
        
        // Make this controller globally accessible
        window.motionGraphicsController = this;
        
        if (this.video) {
            this.initializeVideo();
        }
        
        if (this.soundBtn) {
            this.setupEventListener();
        }
    }
    
    initializeVideo() {
        // Ensure video starts muted
        this.video.muted = true;
        this.video.volume = 0.7; // Set volume for when unmuted
        
        // Ensure video plays
        this.video.play().catch(error => {
            console.log('Video autoplay failed:', error);
        });
    }
    
    setupEventListener() {
        this.soundBtn.addEventListener('click', () => {
            this.toggleSound();
        });
    }

    toggleSound() {
        this.isMuted = !this.isMuted;
        
        if (!this.video) return;
        
        this.video.muted = this.isMuted;
        this.updateButtonText();
    }

    updateButtonText() {
        if (this.soundBtn) {
            if (this.isMuted) {
                this.soundBtn.textContent = 'Escucha la música original compuesta para este video';
                this.soundBtn.classList.remove('active');
            } else {
                this.soundBtn.textContent = 'ACTIVADO';
                this.soundBtn.classList.add('active');
            }
        }
    }

    setMuted(muted) {
        this.isMuted = muted;
        
        if (!this.video) return;
        
        this.video.muted = muted;
        this.updateButtonText();
    }
}

// BFA Video Controller
class BFAVideoController {
    constructor() {
        this.video = document.querySelector('.bfa-video');
        this.soundBtn = document.getElementById('bfa-sound-btn');
        this.isMuted = true;
        
        if (this.video && this.soundBtn) {
            this.initializeVideo();
            this.setupEventListener();
        }
    }
    
    initializeVideo() {
        // Ensure video starts muted
        this.video.muted = true;
        this.video.volume = 0.7; // Set volume for when unmuted
        
        // Ensure video plays
        this.video.play().catch(error => {
            console.log('BFA video autoplay failed:', error);
        });
    }
    
    setupEventListener() {
        this.soundBtn.addEventListener('click', () => {
            this.toggleSound();
        });
    }

    toggleSound() {
        this.isMuted = !this.isMuted;
        
        if (!this.video) return;
        
        this.video.muted = this.isMuted;
        this.updateButtonText();
    }

    updateButtonText() {
        if (this.isMuted) {
            this.soundBtn.textContent = 'ACTIVAR SONIDO';
        } else {
            this.soundBtn.textContent = 'SONIDO ACTIVADO';
        }
    }
}

