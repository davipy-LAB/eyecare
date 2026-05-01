const DynamicI18nResources = {
    "pt-BR": { translation: { dynamic_contrast_title: 'Contraste Dinâmico' } },
    "en": { translation: { dynamic_contrast_title: 'Dynamic Contrast' } },
    "de": { translation: { dynamic_contrast_title: 'Dynamischer Kontrast' } }
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('contrast-slider');
    const contrastDisplay = document.getElementById('contrast-value');
    const comfortMode = document.getElementById('comfort-mode');

    // 1. Inicializa o Idioma
    const storedLang = localStorage.getItem('language') || 'pt-BR';
    if (typeof i18next !== 'undefined') {
        i18next.init({
            lng: storedLang,
            resources: DynamicI18nResources 
        }, function() {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                el.textContent = i18next.t(el.getAttribute('data-i18n'));
            });
        });
    }

    // 2. Função INTELIGENTE de atualizar contraste (preserva o daltonismo)
    const updateContrast = (val) => {
    localStorage.setItem('eye-contrast', val);

    if (contrastDisplay) {
        contrastDisplay.textContent = val;
    }

    applyAccessibilitySettings();
};

    // 3. Função do Modo Conforto (Sobrepõe o fundo corretamente)
    const toggleComfort = (isActive) => {
    localStorage.setItem('comfort-mode', isActive);
    applyAccessibilitySettings();
};
    
    // Listeners
    if(slider) slider.addEventListener('input', (e) => updateContrast(e.target.value));
    if(comfortMode) comfortMode.addEventListener('change', (e) => toggleComfort(e.target.checked));

    // 4. Carrega tudo assim que a página abre
    const savedContrast = localStorage.getItem('eye-contrast') || '100';
    const savedComfort = localStorage.getItem('comfort-mode') === 'true';

    if (slider) slider.value = savedContrast;
    updateContrast(savedContrast); // Já chama aplicando daltonismo + contraste

    if (comfortMode && savedComfort) {
        comfortMode.checked = true;
        toggleComfort(true);
    }
});