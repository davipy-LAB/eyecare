// Dashboard script
const dashboardViews = {
    chroma: {
        title: 'Chroma',
        description: 'Use esta área para explorar ajustes de cor e contraste pensados para melhorar a percepção visual de modo acessível.',
        blocks: [
            {
                title: 'Contraste Dinâmico',
                text: 'Ajustes de contraste para equilibrar a leitura entre fundo e texto sem perder a suavidade visual.'
            },
            {
                title: 'Paleta Sensível',
                text: 'Seleções de cores cuidadosas que preservam acessibilidade para diferentes tipos de visão.'
            }
        ]
    },
    aprendizado: {
        title: 'Aprendizado',
        description: 'Conteúdo educativo para ajudar o usuário a entender melhor as opções de acessibilidade e como usá-las.',
        blocks: [
            {
                title: 'Dicas de Visão',
                text: 'Recomendações sobre como aproveitar melhor os recursos do Eyecare em diferentes ambientes.'
            },
            {
                title: 'Reaprenda as Cores',
                text: 'Conteúdo educativo para ajudar o usuário a reaprender as cores e entender melhor as opções de acessibilidade e como usá-las.'
            }
        ]
    },
    'auto-cuidado': {
        title: 'Auto-Cuidado',
        description: 'Acompanhe rotinas de descanso visual e sugestões de autocuidado adaptadas às suas preferências.',
        blocks: [
            {
                title: 'Pausas Programadas',
                text: 'Lembretes para fazer pequenas pausas e relaxar os olhos durante o uso prolongado da tela.'
            },
            {
                title: 'Ambiente Ideal',
                text: 'Conselhos para controlar brilho, temperatura de cor e ergonomia do espaço de trabalho.'
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
            'auto-cuidado_description': 'Acompanhe rotinas de descanso visual e sugestões de autocuidado adaptadas às suas preferências para promover uma relação mais saudável com a tecnologia.'
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
        }
    }
};

function updateDashboardContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18next.t(key);
    });
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

    // Inicializar i18next
    i18next.init({
        lng: lang,
        resources: dashboardI18nResources
    }, function() {
        updateDashboardContent();
        renderView(chosenView);

        // Atualizar configurações atuais após i18next estar pronto
        currentLang.textContent = lang === 'pt-BR' ? i18next.t('portuguese') : lang === 'de' ? i18next.t('german') : i18next.t('english');
        currentType.textContent = colorblind === 'yes' ? (type ? type : i18next.t('yes')) : i18next.t('no');
        currentFilter.textContent = type ? type : i18next.t('none');
    });

    if (type) {
        document.body.style.filter = `url('#${type}-filter')`;
    }

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
            return `
            <div class="content-block">
                <h3>${i18next.t(blockKey)}</h3>
                <p>${i18next.t(blockKey + '_text')}</p>
            </div>
        `}).join('');

        localStorage.setItem('dashboardView', viewKey);
    }

    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            renderView(this.dataset.view);
        });
    });

    resetButton.addEventListener('click', function() {
        localStorage.removeItem('onboardingComplete');
        localStorage.removeItem('colorblind');
        localStorage.removeItem('colorblindType');
        localStorage.removeItem('language');
        localStorage.removeItem('dashboardView');
        document.body.style.filter = '';
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