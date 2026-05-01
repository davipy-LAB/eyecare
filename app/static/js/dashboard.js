

// Dashboard script
const dashboardViews = { 
    chroma: {
        title: 'Chroma',
        description: 'Use esta área para explorar ajustes de cor e contraste pensados para melhorar a percepção visual de modo acessível.',
        blocks: [
            {
                title: 'Contraste Dinâmico',
                text: 'Ajustes de contraste para equilibrar a leitura entre fundo e texto sem perder a suavidade visual.',
                url: '/dashboard/dynamic-contrast'
            },
            {
                title: 'Paleta Sensível',
                text: 'Seleções de cores cuidadosas que preservam acessibilidade para diferentes tipos de visão.',
                url: '/dashboard/sensitive-palette'
            }
        ]
    },
    aprendizado: {
        title: 'Aprendizado',
        description: 'Conteúdo educativo para ajudar o usuário a entender melhor as opções de acessibilidade e como usá-las.',
        blocks: [
            {
                title: 'Dicas de Visão',
                text: 'Recomendações sobre como aproveitar melhor os recursos do Eyecare em diferentes ambientes.',
                url: '/dashboard/vision-tips'
            },
            {
                title: 'Reaprenda as Cores',
                text: 'Conteúdo educativo para ajudar o usuário a reaprender as cores e entender melhor as opções de acessibilidade e como usá-las.',
                url: '/dashboard/relearn-colors'
            }
        ]
    },
    'auto-cuidado': {
        title: 'Auto-Cuidado',
        description: 'Acompanhe rotinas de descanso visual e sugestões de autocuidado adaptadas às suas preferências.',
        blocks: [
            {
                title: 'Pausas Programadas',
                text: 'Lembretes para fazer pequenas pausas e relaxar os olhos durante o uso prolongado da tela.',
                url: '#'
            },
            {
                title: 'Ambiente Ideal',
                text: 'Conselhos para controlar brilho, temperatura de cor e ergonomia do espaço de trabalho.',
                url: '/dashboard/ideal-environment'
            }
        ]
    }
};

// Recursos de tradução para o dashboard
const dashboardI18nResources = {
    'pt-BR': {
        translation: {
            dashboard_title: 'Dashboard',
            dashboard_subtitle: 'Painel de controle da sua experiência de acessibilidade.',
            explore: 'Explorar',
            chroma: 'Chroma',
            aprendizado: 'Aprendizado',
            'auto-cuidado': 'Auto-Cuidado',
            current_settings: 'Configurações Atuais',
            settings_summary: 'Resumo dos dados carregados do onboarding para ajudar você a ajustar a experiência.',
            reset_onboarding: 'Reiniciar Onboarding',
            language: 'Idioma',
            colorblind: 'Daltonismo',
            filter: 'Filtro',
            none: 'Nenhum',
            yes: 'Sim',
            no: 'Não',
            portuguese: 'Português',
            english: 'English',
            german: 'Deutsch',
            settings: 'Configurações',
            chroma_title: 'Chroma',
            chroma_description: 'Use esta área para explorar ajustes de cor e contraste pensados para melhorar a percepção visual de modo acessível.',
            dynamic_contrast: 'Contraste Dinâmico',
            dynamic_contrast_text: 'Ajustes de contraste para equilibrar a leitura entre fundo e texto sem perder a suavidade visual.',
            sensitive_palette: 'Paleta Sensível',
            sensitive_palette_text: 'Seleções de cores cuidadosas que preservam acessibilidade para diferentes tipos de visão.',
            learning_title: 'Aprendizado',
            learning_description: 'Conteúdo educativo para ajudar o usuário a entender melhor as opções de acessibilidade e como usá-las.',
            vision_tips: 'Dicas de Visão',
            vision_tips_text: 'Recomendações sobre como aproveitar melhor os recursos do Eyecare em diferentes ambientes.',
            color_teaching: 'Reaprenda as Cores',
            color_teaching_text: 'Conteúdo educativo para ajudar o usuário a reaprender as cores e entender melhor as opções de acessibilidade e como usá-las.',
            usage_flow_text: 'Passo a passo das ferramentas disponíveis para criar uma experiência de leitura mais confortável.',
            self_care_title: 'Auto-Cuidado',
            self_care_description: 'Acompanhe rotinas de descanso visual e sugestões de autocuidado adaptadas às suas preferências.',
            scheduled_breaks: 'Pausas Programadas',
            scheduled_breaks_text: 'Lembretes para fazer pequenas pausas e relaxar os olhos durante o uso prolongado da tela.',
            ideal_environment: 'Ambiente Ideal',
            ideal_environment_text: 'Conselhos para controlar brilho, temperatura de cor e ergonomia do espaço de trabalho.',
            linkedin: 'LinkedIn',
            github: 'GitHub',
            resume: 'Currículo',
            author: 'Davi Dias de Souza — autoria e design',
            aprendizado_title: 'Aprendizado',
            aprendizado_description: 'Conteúdo educativo para ajudar o usuário a reaprender as cores e entender melhor as opções de acessibilidade e como usá-las.',
            'auto-cuidado_title': 'Auto-Cuidado',
            'auto-cuidado_description': 'Acompanhe rotinas de descanso visual e sugestões de autocuidado adaptadas às suas preferências para promover uma relação mais saudável com a tecnologia.',
            reset_confirm_title: 'Confirmação de Reset',
            reset_confirm_text: 'Tem certeza de que deseja reiniciar a personalização? Isso irá apagar suas preferências atuais e levá-lo de volta ao início.',
            cancel: 'Cancelar',
            confirm_reset_action: 'Confirmar',
            "access_feature": "Acessar Feature",
            "view_extension": "Ver Extensão",
            "dynamic_contrast": "Contraste Dinâmico",
            "dynamic_contrast_text": "Ajustes de contraste para equilibrar a leitura entre fundo e texto...",
            "sensitive_palette": "Paleta Sensível",
            "sensitive_palette_text": "Seleções de cores cuidadosas que preservam acessibilidade...",
            "protanopia": "Protanopia",
            "deuteranopia": "Deuteranopia",
            "tritanopia": "Tritanopia"
        }
    },
    en: {
        translation: {
            dashboard_title: 'Dashboard',
            dashboard_subtitle: 'Control panel for your accessibility experience.',
            explore: 'Explore',
            chroma: 'Chroma',
            aprendizado: 'Learning',
            'auto-cuidado': 'Self-Care',
            settings: 'Settings',
            current_settings: 'Current Settings',
            settings_summary: 'Summary of data loaded from onboarding to help you adjust the experience.',
            reset_onboarding: 'Reset Onboarding',
            language: 'Language',
            colorblind: 'Colorblind',
            filter: 'Filter',
            none: 'None',
            yes: 'Yes',
            no: 'No',
            portuguese: 'Portuguese',
            english: 'English',
            german: 'German',
            chroma_title: 'Chroma',
            chroma_description: 'Use this area to explore color and contrast adjustments designed to improve visual perception in an accessible way.',
            dynamic_contrast: 'Dynamic Contrast',
            dynamic_contrast_text: 'Contrast adjustments to balance reading between background and text without losing visual smoothness.',
            sensitive_palette: 'Sensitive Palette',
            sensitive_palette_text: 'Careful color selections that preserve accessibility for different types of vision.',
            learning_title: 'Learning',
            learning_description: 'Educational content to help users better understand accessibility options and how to use them.',
            vision_tips: 'Vision Tips',
            vision_tips_text: 'Recommendations on how to better take advantage of Eyecare resources in different environments.',
            usage_flow: 'Usage Flow',
            usage_flow_text: 'Step-by-step guide of available tools to create a more comfortable reading experience.',
            self_care_title: 'Self-Care',
            self_care_description: 'Track visual rest routines and self-care suggestions adapted to your preferences.',
            scheduled_breaks: 'Scheduled Breaks',
            scheduled_breaks_text: 'Reminders to take short breaks and relax your eyes during prolonged screen use.',
            ideal_environment: 'Ideal Environment',
            ideal_environment_text: 'Advice for controlling brightness, color temperature and workspace ergonomics.',
            linkedin: 'LinkedIn',
            github: 'GitHub',
            resume: 'Resume',
            author: 'Davi Dias de Souza — authorship and design',
            learning_title: 'Learning',
            learning_description: 'Educational content to help users relearn colors and better understand accessibility options and how to use them.',
            'auto-cuidado_title': 'Self-Care',
            'auto-cuidado_description': 'Track visual rest routines and self-care suggestions adapted to your preferences to promote a healthier relationship with technology.',
            color_teaching: 'Relearn Colors',
            color_teaching_text: 'Educational content to help users relearn colors and better understand accessibility options and how to use them.',
            aprendizado_title: 'Learning',
            aprendizado_description: 'Educational content to help users relearn colors and better understand accessibility options and how to use them.',
            color_teaching: 'Relearn Colors',
            reset_confirm_title: 'Reset Confirmation',
            reset_confirm_text: 'Are you sure you want to reset the onboarding? This will delete your current preferences and take you back to the beginning.',
            cancel: 'Cancel',
            confirm_reset_action: 'Confirm',
            "access_feature": "Access Feature",
            "view_extension": "View Extension",
            "dynamic_contrast": "Dynamic Contrast",
            "dynamic_contrast_text": "Contrast adjustments to balance reading between background and text...",
            "sensitive_palette": "Sensitive Palette",
            "sensitive_palette_text": "Careful color selections that preserve accessibility...",
            "protanopia": "Protanopia",
            "deuteranopia": "Deuteranopia",
            "tritanopia": "Tritanopia"
        }
    },
    de: {
        translation: {
            dashboard_title: 'Dashboard',
            dashboard_subtitle: 'Bedienfeld für Ihre Barrierefreiheitserfahrung.',
            explore: 'Erkunden',
            chroma: 'Chroma',
            aprendizado: 'Lernen',
            'auto-cuidado': 'Selbstfürsorge',
            settings: 'Einstellungen',
            current_settings: 'Aktuelle Einstellungen',
            settings_summary: 'Zusammenfassung der Daten aus dem Onboarding, um Ihnen bei der Anpassung der Erfahrung zu helfen.',
            reset_onboarding: 'Onboarding zurücksetzen',
            language: 'Sprache',
            colorblind: 'Farbblind',
            filter: 'Filter',
            none: 'Kein',
            yes: 'Ja',
            no: 'Nein',
            portuguese: 'Portugiesisch',
            english: 'Englisch',
            german: 'Deutsch',
            chroma_title: 'Chroma',
            chroma_description: 'Verwenden Sie diesen Bereich, um Farb- und Kontrastanpassungen zu erkunden, die entwickelt wurden, um die visuelle Wahrnehmung auf zugängliche Weise zu verbessern.',
            dynamic_contrast: 'Dynamischer Kontrast',
            dynamic_contrast_text: 'Kontrastanpassungen, um das Lesen zwischen Hintergrund und Text auszugleichen, ohne die visuelle Glattheit zu verlieren.',
            sensitive_palette: 'Empfindliche Palette',
            sensitive_palette_text: 'Sorgfältige Farbauswahlen, die die Zugänglichkeit für verschiedene Arten von Sehvermögen erhalten.',
            learning_title: 'Lernen',
            learning_description: 'Bildungsinhalte, um Benutzern zu helfen, Barrierefreiheitsoptionen besser zu verstehen und wie man sie verwendet.',
            vision_tips: 'Sehtipps',
            vision_tips_text: 'Empfehlungen, wie Sie die Ressourcen von Eyecare in verschiedenen Umgebungen besser nutzen können.',
            usage_flow: 'Nutzungsablauf',
            usage_flow_text: 'Schritt-für-Schritt-Anleitung der verfügbaren Tools, um eine komfortablere Leseerfahrung zu schaffen.',
            self_care_title: 'Selbstfürsorge',
            self_care_description: 'Verfolgen Sie visuelle Ruhe-Routinen und Selbstfürsorge-Vorschläge, die an Ihre Vorlieben angepasst sind.',
            scheduled_breaks: 'Geplante Pausen',
            scheduled_breaks_text: 'Erinnerungen, um kurze Pausen zu machen und Ihre Augen während der verlängerten Bildschirmnutzung zu entspannen.',
            ideal_environment: 'Ideale Umgebung',
            ideal_environment_text: 'Ratschläge zur Steuerung von Helligkeit, Farbtemperatur und Ergonomie des Arbeitsbereichs.',
            linkedin: 'LinkedIn',
            github: 'GitHub',
            resume: 'Lebenslauf',
            author: 'Davi Dias de Souza — Urheberschaft und Design',
            learning_title: 'Lernen',
            learning_description: 'Bildungsinhalte, um Benutzern zu helfen, Farben neu zu lernen und Barrierefreiheitsoptionen besser zu verstehen und wie man sie verwendet.',
            'auto-cuidado_title': 'Selbstfürsorge',
            'auto-cuidado_description': 'Verfolgen Sie visuelle Ruhe-Routinen und Selbstfürsorge-Vorschläge, die an Ihre Vorlieben angepasst sind, um eine gesündere Beziehung zur Technologie zu fördern.',
            aprendizado_title: 'Lernen',
            aprendizado_description: 'Bildungsinhalte, um Benutzern zu helfen, Farben neu zu lernen und Barrierefreiheitsoptionen besser zu verstehen und wie man sie verwendet.',
            color_teaching: 'Farben neu lernen',
            color_teaching_text: 'Bildungsinhalte, um Benutzern zu helfen, Farben neu zu lernen und Barrierefreiheitsoptionen besser zu verstehen und wie man sie verwendet.',
            reset_confirm_title: 'Bestätigung zurücksetzen',
            reset_confirm_text: 'Sind Sie sicher, dass Sie das Onboarding zurücksetzen möchten? Dadurch werden Ihre aktuellen Präferenzen gelöscht und Sie kehren zum Anfang zurück.',
            cancel: 'Abbrechen',
            confirm_reset_action: 'Bestätigen',
            "access_feature": "Feature zugreifen",
            "view_extension": "Erweiterung anzeigen",
            "dynamic_contrast": "Dynamischer Kontrast",
            'dynamic_contrast_text': 'Kontrastanpassungen, um das Lesen zwischen Hintergrund und Text auszugleichen...',
            "sensitive_palette_text": "Sorgfaltige Farbauswahlen, die die Zugänglichkeit...",
            "sensitive_palette": "Empfindliche Palette",
            "protanopia": "Protanopie",
            "deuteranopia": "Deuteranopie",
            "tritanopia": "Tritanopie",
        }
    }
};

function updateDashboardContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18next.t(key);
    });
}
function syncSettings() {
    applyAccessibilitySettings();
}
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = document.getElementById('current-lang');
    const currentType = document.getElementById('current-type');
    const currentFilter = document.getElementById('current-filter');
    const resetButton = document.getElementById('reset-onboarding');
    const sidebarButtons = document.querySelectorAll('.sidebar-item');
    const contentTitle = document.getElementById('content-title');
    const contentDescription = document.getElementById('content-description');
    const contentDetails = document.getElementById('content-details');

    const lang = localStorage.getItem('language') || 'en';
    const colorblind = localStorage.getItem('colorblind');
    const type = localStorage.getItem('colorblindType');
    const chosenView = localStorage.getItem('dashboardView') || 'chroma';

    // 1. FUNÇÃO DE APLICAÇÃO GLOBAL
    // Inicializar i18next
    i18next.init({
        lng: lang,
        resources: dashboardI18nResources
    }, function() {
        updateDashboardContent();
        renderView(chosenView);
        syncSettings();

       const storedType = localStorage.getItem('colorblindType') || 'no'; 
        const storedFilter = localStorage.getItem('currentFilter') || 'none';
        const storedLang = localStorage.getItem('language') || 'en';

        if (currentLang) {
            if (storedLang === 'pt-BR') currentLang.textContent = i18next.t('portuguese');
            else if (storedLang === 'en') currentLang.textContent = i18next.t('english');
            else if (storedLang === 'de') currentLang.textContent = i18next.t('german');
        }

        if (currentType) {
            currentType.textContent = i18next.t(storedType.toLowerCase());
        }
        
        if (currentFilter) {
            currentFilter.textContent = i18next.t(storedFilter.toLowerCase());
        }
        
        updateMobileSettings();
    });

// Chame syncSettings() dentro do seu window.onload ou i18next.init

    function renderView(viewKey) {
        const view = dashboardViews[viewKey];
        if (!view) return;

        sidebarButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.view === viewKey);
        });

        contentTitle.textContent = i18next.t(`${viewKey}_title`);
        contentDescription.textContent = i18next.t(`${viewKey}_description`);

        // Mapear títulos dos blocos para chaves de tradução corretas
        const blockKeyMap = {
            'Contraste Dinâmico': 'dynamic_contrast',
            'Paleta Sensível': 'sensitive_palette',
            'Reaprenda as Cores': 'color_teaching',
            'Dicas de Visão': 'vision_tips',
            'Fluxo de Uso': 'usage_flow',
            'Pausas Programadas': 'scheduled_breaks',
            'Ambiente Ideal': 'ideal_environment'
        };

        contentDetails.innerHTML = view.blocks.map(block => {
            const blockKey = blockKeyMap[block.title] || block.title.toLowerCase().replace(/\s+/g, '_');
            
            // Define qual chave de tradução usar para o botão
            const btnTranslationKey = block.title === 'Pausas Programadas' ? 'view_extension' : 'access_feature';

            const buttonHtml = block.url 
                ? `<a href="${block.url}" class="btn-feature">
                    <span data-i18n="${btnTranslationKey}">${i18next.t(btnTranslationKey)}</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                   </a>` 
                : '';

            return `
            <div class="content-block">
                <div class="block-info">
                    <h3 data-i18n="${blockKey}">${i18next.t(blockKey)}</h3>
                    <p data-i18n="${blockKey}_text">${i18next.t(blockKey + '_text')}</p>
                </div>
                ${buttonHtml}
            </div>
        `}).join('');

        localStorage.setItem('dashboardView', viewKey);
    }
    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            renderView(this.dataset.view);
        });
    });

    // Elementos do Modal
const resetModal = document.getElementById('reset-modal');
const btnOpenReset = document.getElementById('reset-onboarding');
const btnCancelReset = document.getElementById('cancel-reset');
const btnConfirmReset = document.getElementById('confirm-reset');

// Abrir o modal ao clicar no botão principal de reset
btnOpenReset.addEventListener('click', () => {
    resetModal.classList.remove('hidden');
});

// Fechar o modal se o usuário cancelar
btnCancelReset.addEventListener('click', () => {
    resetModal.classList.add('hidden');
});

// Fechar se o usuário clicar fora do card (no overlay)
resetModal.addEventListener('click', (e) => {
    if (e.target === resetModal) {
        resetModal.classList.add('hidden');
    }
});

// Executar o reset REAL apenas aqui
btnConfirmReset.addEventListener('click', () => {
    // Remove os dados do LocalStorage
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('colorblind');
    localStorage.removeItem('colorblindType');
    localStorage.removeItem('language'); // Opcional: resetar idioma também
    
    // Feedback visual antes de recarregar (opcional)
    btnConfirmReset.textContent = "Resetando...";
    
    // Redireciona para o onboarding
    window.location.href = '/'; 
});

    // Configurar seletor de idioma
    const languageSelect = document.getElementById('dashboard-language');
    if (languageSelect) {
        languageSelect.value = lang;
        languageSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            localStorage.setItem('language', selectedLang);
            i18next.changeLanguage(selectedLang, () => {
                // Atualizar todos os elementos com data-i18n
                updateDashboardContent();

                // Re-renderizar a view atual com as novas traduções
                const currentView = localStorage.getItem('dashboardView') || 'chroma';
                renderView(currentView);

                // Atualizar as labels das configurações atuais
                currentLang.textContent = selectedLang === 'pt-BR' ? i18next.t('portuguese') : selectedLang === 'de' ? i18next.t('german') : i18next.t('english');

                // Traduzir os valores dependentes de estado (colorblind / filter)
                // `colorblind` e `type` vêm do escopo superior
                if (currentType) {
                    if (colorblind === 'yes') {
                        currentType.textContent = type ? i18next.t(type) : i18next.t('yes');
                    } else {
                        currentType.textContent = i18next.t('no');
                    }
                }

                if (currentFilter) {
                    currentFilter.textContent = type ? i18next.t(type) : i18next.t('none');
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openSettings');
    const closeBtn = document.getElementById('closeSettings');
    const overlay = document.getElementById('settingsOverlay');

    if (openBtn && overlay) {
        openBtn.addEventListener('click', () => {
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            updateMobileSettings(); // Atualiza os dados ao abrir
        });
    }

    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});

function updateMobileSettings() {
    const lang = localStorage.getItem('language') || 'pt-BR';
    const type = localStorage.getItem('colorblindType');
    
    const m_lang = document.getElementById('mobile-current-lang');
    const m_type = document.getElementById('mobile-current-type');
    const m_filter = document.getElementById('mobile-current-filter');
    const filter = localStorage.getItem('currentFilter');

    // Traduz o Idioma pegando do seu dicionário
    if (m_lang) {
        if (lang === 'pt-BR') m_lang.textContent = i18next.t('portuguese');
        else if (lang === 'en') m_lang.textContent = i18next.t('english');
        else if (lang === 'de') m_lang.textContent = i18next.t('german');
    }
    
    // Traduz o tipo de daltonismo ou retorna "No" (Não)
    if (m_type) {
        m_type.textContent = type ? i18next.t(type) : i18next.t('no');
    }
    
    // Traduz o filtro ativo ou retorna "None" (Nenhum)
    if (m_filter) {
        m_filter.textContent = filter ? i18next.t(filter) : i18next.t('none');
    }
}