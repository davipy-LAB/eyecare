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
                title: 'Fluxo de Uso',
                text: 'Passo a passo das ferramentas disponíveis para criar uma experiência de leitura mais confortável.'
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

document.addEventListener('DOMContentLoaded', function() {
    const currentLang = document.getElementById('current-lang');
    const currentType = document.getElementById('current-type');
    const currentFilter = document.getElementById('current-filter');
    const resetButton = document.getElementById('reset-onboarding');
    const sidebarButtons = document.querySelectorAll('.sidebar-item');
    const contentTitle = document.getElementById('content-title');
    const contentDescription = document.getElementById('content-description');
    const contentDetails = document.getElementById('content-details');

    const lang = localStorage.getItem('language') || 'pt-BR';
    const colorblind = localStorage.getItem('colorblind');
    const type = localStorage.getItem('colorblindType');
    const chosenView = localStorage.getItem('dashboardView') || 'chroma';

    currentLang.textContent = lang === 'pt-BR' ? 'Português' : lang === 'de' ? 'Deutsch' : 'English';
    currentType.textContent = colorblind === 'yes' ? (type ? type : 'Sim') : 'Não';
    currentFilter.textContent = type ? type : 'Nenhum';

    if (type) {
        document.body.style.filter = `url('#${type}-filter')`;
    }

    function renderView(viewKey) {
        const view = dashboardViews[viewKey];
        if (!view) return;

        sidebarButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.view === viewKey);
        });

        contentTitle.textContent = view.title;
        contentDescription.textContent = view.description;
        contentDetails.innerHTML = view.blocks.map(block => `
            <div class="content-block">
                <h3>${block.title}</h3>
                <p>${block.text}</p>
            </div>
        `).join('');

        localStorage.setItem('dashboardView', viewKey);
    }

    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            renderView(this.dataset.view);
        });
    });

    renderView(chosenView);

    resetButton.addEventListener('click', function() {
        localStorage.removeItem('onboardingComplete');
        localStorage.removeItem('colorblind');
        localStorage.removeItem('colorblindType');
        localStorage.removeItem('language');
        localStorage.removeItem('dashboardView');
        document.body.style.filter = '';
        window.location.href = '/';
    });
});