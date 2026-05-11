

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

function updateDashboardContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18next.t(key);
    });
}
function syncSettings() {
    applyAccessibilitySettings();
}

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

        console.log("i18next carregado com sucesso!");

    } catch (err) {
        console.error("Erro crítico ao carregar traduções:", err);
    }
}

const languageLabels = {
    pt: 'portuguese',
    en: 'english',
    de: 'german',
    es: 'spanish',
    it: 'italian',
    fr: 'french',
    ru: 'russian',
    jpn: 'japanese'
};

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
    initI18n().then(() => {
        updateDashboardContent();
        renderView(chosenView);
        syncSettings();

       const storedType = localStorage.getItem('colorblindType') || 'no'; 
        const storedFilter = localStorage.getItem('currentFilter') || 'none';
        const storedLang = localStorage.getItem('language') || 'en';

        if (currentLang) {
            const langKey = languageLabels[storedLang] || 'english';
            currentLang.textContent = i18next.t(langKey);
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
        updateDashboardContent();

        const currentView = localStorage.getItem('dashboardView') || 'chroma';
        renderView(currentView);

        const langKey = languageLabels[selectedLang] || 'english';
        currentLang.textContent = i18next.t(langKey);

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

    syncLocalPreferencesToCloud();
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
    const lang = localStorage.getItem('language') || 'pt';
    const type = localStorage.getItem('colorblindType');
    
    const m_lang = document.getElementById('mobile-current-lang');
    const m_type = document.getElementById('mobile-current-type');
    const m_filter = document.getElementById('mobile-current-filter');
    const filter = localStorage.getItem('currentFilter');

    if (m_lang) {
        const langKey = languageLabels[lang] || 'english';
        m_lang.textContent = i18next.t(langKey);
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