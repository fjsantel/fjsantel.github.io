// Initialize immediately if DOM is already loaded, otherwise wait for DOMContentLoaded
// Fixed: Handle case where script loads after DOMContentLoaded event
function initializeLetsCreate() {
    console.log('Let\'s Create script initializing...');
    const letsCreateContainer = document.getElementById('letsCreateContainer');
    if (!letsCreateContainer) {
        console.error('letsCreateContainer not found!');
        return;
    }
    console.log('Let\'s Create container found, initializing...');

    // Elementos del DOM
    const chatTitle = document.getElementById('chat-title-main');
    const initialStateWrapper = document.getElementById('initial-state-wrapper');
    const startButton = document.getElementById('startConsultationButton');
    const toolIntroduction = document.getElementById('toolIntroduction');
    const continueButton = document.getElementById('continueButton');
    const interactiveWrapper = document.getElementById('interactive-elements-wrapper');
    const idleCube = document.getElementById('idleCube');
    const toolSpecificText = document.getElementById('tool-specific-text');
    const responseOptions = document.getElementById('responseOptions');
    const userInputContainer = document.getElementById('userInputContainer');
    const userInput = document.getElementById('userInput');
    const finalCta = document.getElementById('consultationFinalCta');
    const formspreeForm = document.getElementById('formspree-form');

    const userResponses = {};
    let currentStateName = 'START';
    const QUESTION_READING_DELAY = 1200;
    const RESET_DELAY = 5000;

    const conversationTree = {
        'START': { text: 'Para comenzar, ¿este proyecto es para ti, para tu marca personal o para una empresa?', options: { 'Para mí': 'CONTEXT_PERSONAL', 'Marca Personal': 'CONTEXT_BRAND', 'Empresa': 'CONTEXT_COMPANY' }, responseKey: 'context' },
        'CONTEXT_PERSONAL': { text: 'Genial. ¿Buscas expresar una idea artística, potenciar tu marca o algo más?', options: { 'Idea Artística': 'PURPOSE', 'Potenciar Marca': 'PURPOSE', 'Otro': 'PURPOSE' }, responseKey: 'purpose' },
        'CONTEXT_BRAND': { text: 'Perfecto. ¿El objetivo es comunicacional, de branding o de marketing?', options: { 'Comunicacional': 'PURPOSE', 'Branding': 'PURPOSE', 'Marketing': 'PURPOSE' }, responseKey: 'purpose' },
        'CONTEXT_COMPANY': { text: 'Entendido. ¿El objetivo es para un producto, crear identidad o para redes sociales?', options: { 'Producto': 'PURPOSE', 'Identidad de Marca': 'PURPOSE', 'Redes Sociales': 'PURPOSE' }, responseKey: 'purpose' },
        'PURPOSE': { text: 'Entendido. Y para darle vida a ese objetivo, ¿en qué formato lo has imaginado?', options: { 'Producción Audiovisual': 'FORMAT', 'Animación': 'FORMAT', 'Diseño': 'FORMAT', 'Foto': 'FORMAT', 'Web': 'FORMAT' }, responseKey: 'format' },
        'FORMAT': { text: 'Perfecto. Ahora, descríbelo todo. Estamos a muy poco de verlo realidad.', type: 'textarea', placeholder: 'Describe tu visión aquí...', next: 'CONTACT_INFO', responseKey: 'vision' },
        'CONTACT_INFO': { text: 'Para cerrar el círculo, por favor, déjame tu email o teléfono para poder contactarte.', type: 'textarea', placeholder: 'Tu email o teléfono...', next: 'FINAL', responseKey: 'contact' },
        'FINAL': { text: '¡Gracias! Tu visión ha sido registrada. Te contactaré a la brevedad para explorar cómo podemos materializar tu proyecto.', type: 'final' }
    };

    function show(element) { if (element) element.style.display = 'block'; }
    function hide(element) { if (element) element.style.display = 'none'; }

    function renderState(stateName) {
        currentStateName = stateName;
        const node = conversationTree[stateName];
        if (!node) return;

        hide(responseOptions);
        hide(userInputContainer);
        hide(finalCta);

        toolSpecificText.innerHTML = `<p>${node.text}</p>`;

        setTimeout(() => {
            if (node.options) {
                responseOptions.innerHTML = '';
                for (const optionText in node.options) {
                    const nextStateName = node.options[optionText];
                    const button = document.createElement('button');
                    button.className = 'option-btn';
                    button.textContent = optionText;
                    button.addEventListener('click', () => {
                        userResponses[node.responseKey] = optionText;
                        renderState(nextStateName);
                    });
                    responseOptions.appendChild(button);
                }
                responseOptions.style.display = 'grid';
            } else if (node.type === 'textarea') {
                userInput.value = '';
                userInput.placeholder = node.placeholder;
                userInputContainer.style.display = 'flex';
                userInput.focus();
            } else if (node.type === 'final') {
                finalCta.style.display = 'block';
                submitForm();
                setTimeout(resetConsultation, RESET_DELAY);
            }
        }, QUESTION_READING_DELAY);
    }

    function startInteraction() {
        hide(toolIntroduction);
        hide(idleCube);
        show(interactiveWrapper);
        renderState('START');
    }

    function handleTextareaSubmit() {
        const text = userInput.value.trim();
        if (text === '') return;
        const currentNode = conversationTree[currentStateName];
        if (currentNode && currentNode.type === 'textarea' && currentNode.next) {
            userResponses[currentNode.responseKey] = text;
            renderState(currentNode.next);
        }
    }

    function submitForm() {
        console.log('Form submission process started.');
        console.log('Final data:', userResponses);

        // Populate the hidden form fields
        document.getElementById('form-context').value = userResponses.context || 'No especificado';
        document.getElementById('form-purpose').value = userResponses.purpose || 'No especificado';
        document.getElementById('form-format').value = userResponses.format || 'No especificado';
        document.getElementById('form-vision').value = userResponses.vision || 'No especificado';
        document.getElementById('form-contact').value = userResponses.contact || 'No especificado';

        // Create a FormData object from the form
        const form = document.getElementById('formspree-form');
        const formData = new FormData(form);

        // Use fetch to submit the form data asynchronously
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log('Form successfully submitted to Formspree.');
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        console.error('Form submission failed:', data.errors.map(error => error.message).join(', '));
                    } else {
                        console.error('An unknown error occurred during form submission.');
                    }
                });
            }
        }).catch(error => {
            console.error('Error submitting form:', error);
        });

        console.log('Form submitted via fetch.');
    }

    function resetConsultation() {
        hide(interactiveWrapper);
        hide(finalCta);
        hide(toolIntroduction);
        show(initialStateWrapper);
        show(idleCube);
        chatTitle.classList.remove('active'); // Desactivar título
        Object.keys(userResponses).forEach(key => delete userResponses[key]);
        currentStateName = 'START';
    }

    startButton.addEventListener('click', () => {
        hide(initialStateWrapper);
        show(toolIntroduction);
        chatTitle.classList.add('active'); // Activar título aquí
        // El cubo sigue visible
    });

    continueButton.addEventListener('click', () => {
        startInteraction();
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTextareaSubmit();
        }
    });

    resetConsultation();
}

// Global flag to indicate Let's Create is ready
window.letsCreateReady = false;

// Initialize when DOM is ready
console.log('Let\'s Create script loaded, DOM ready state:', document.readyState);

function initWithCallback() {
    initializeLetsCreate();
    window.letsCreateReady = true;
    console.log('Let\'s Create initialized and ready');
    
    // Dispatch a custom event to let other scripts know Let's Create is ready
    window.dispatchEvent(new CustomEvent('letsCreateReady'));
}

if (document.readyState === 'loading') {
    console.log('Waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initWithCallback);
} else {
    // DOM is already loaded
    console.log('DOM already loaded, initializing immediately...');
    initWithCallback();
}
