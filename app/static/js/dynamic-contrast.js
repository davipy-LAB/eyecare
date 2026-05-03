const DynamicI18nResources = {
    "pt-BR": { translation: { 
        dynamic_contrast_title: 'Contraste Dinâmico',
        settings_title: 'Ajustes Visuais',
        settings_subtitle: 'Personalize o contraste e o tom da tela para o seu conforto.',
        contrast: 'Intensidade do Contraste',
        comfort_mode: 'Modo Conforto',
        comfort_desc: 'Reduz a luz azul com tons de sépia suaves.',
        explain_title: 'Visualização em Tempo Real',
        explain_content: 'Este texto ajuda a perceber como as mudanças afetam a legibilidade. O objetivo é reduzir o esforço visual durante longos períodos de leitura.'
    } },
    "en": { translation: { 
        dynamic_contrast_title: 'Dynamic Contrast',
        settings_title: 'Visual Settings',
        settings_subtitle: 'Customize screen contrast and tone for your comfort.',
        contrast: 'Contrast Intensity',
        comfort_mode: 'Comfort Mode',
        comfort_desc: 'Reduces blue light with soft sepia tones.',
        explain_title: 'Real-time Preview',
        explain_content: 'This text helps you notice how changes affect readability. The goal is to reduce visual strain during long reading periods.'
    } },
    "de": { translation: { 
        dynamic_contrast_title: 'Dynamischer Kontrast',
        settings_title: 'Visuelle Einstellungen',
        settings_subtitle: 'Passen Sie Bildschirmkontrast und Ton für Ihren Komfort an.',
        contrast: 'Kontrastintensität',
        comfort_mode: 'Komfortmodus',
        comfort_desc: 'Reduziert blaues Licht mit sanften Sepiatönen.',
        explain_title: 'Echtzeit-Vorschau',
        explain_content: 'Dieser Text hilft Ihnen zu erkennen, wie sich Änderungen auf die Lesbarkeit auswirken. Ziel ist es, die visuelle Belastung bei langen Lesezeiten zu reduzieren.'
    } }
};

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