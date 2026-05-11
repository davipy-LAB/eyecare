async function initI18n() {
    const storedLang = localStorage.getItem('language') || 'en';

    try {
        await i18next
            .use(i18nextHttpBackend)
            .init({
                lng: storedLang,
                fallbackLng: 'en',
                load: 'languageOnly',
                backend: {
                    loadPath: '/static/locales/{{lng}}/translation.json'
                }
            });

        updateDynamicContrastContent();
        console.log('Dynamic Contrast i18next carregado!');
    } catch (err) {
        console.error('Erro ao carregar traduções do Dynamic Contrast:', err);
    }
}

function updateDynamicContrastContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18next.t(key);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('contrast-slider');
    const contrastDisplay = document.getElementById('contrast-value');
    const comfortMode = document.getElementById('comfort-mode');

    if (typeof i18next !== 'undefined' && typeof i18nextHttpBackend !== 'undefined') {
        initI18n();
    }

    const updateContrast = async (val) => {
    localStorage.setItem('eye-contrast', val);
    localStorage.setItem('dynamic-contrast-enabled', 'true');

    if (contrastDisplay) {
        contrastDisplay.textContent = val;
    }

    applyAccessibilitySettings();
    await syncLocalPreferencesToCloud();
};

const toggleComfort = async (isActive) => {
    localStorage.setItem('comfort-mode', isActive);
    applyAccessibilitySettings();
    await syncLocalPreferencesToCloud();
};

    if (slider) slider.addEventListener('input', (e) => updateContrast(e.target.value));
    if (comfortMode) comfortMode.addEventListener('change', (e) => toggleComfort(e.target.checked));

    const savedContrast = localStorage.getItem('eye-contrast') || '100';
    const savedComfort = localStorage.getItem('comfort-mode') === 'true';

    if (slider) slider.value = savedContrast;
    updateContrast(savedContrast);

    if (comfortMode && savedComfort) {
        comfortMode.checked = true;
        toggleComfort(true);
    }
});