const onboardingCompleteKey = 'onboardingComplete';
let currentStep = 1;
const totalSteps = 3;

async function initI18n() {
    // 1. Tenta pegar o idioma salvo, senão usa 'en' como padrão absoluto
    const storedLang = localStorage.getItem('language') || 'en'; 

    try {
        await i18next
            .use(i18nextHttpBackend)
            .init({
                lng: storedLang,
                fallbackLng: 'en', // Se o 'pt' falhar, ele carrega o 'en'
                load: 'languageOnly',
                backend: {
                    loadPath: '/static/locales/{{lng}}/translation.json'
                }
            });

        // 2. AGORA SIM: i18next está pronto e com os dados carregados
        console.log("i18next carregado com sucesso!");
        
        // Atualiza a interface ANTES de mostrar o passo
        updateContent();
        updateStepInterface();
        
        // Só depois de traduzir, iniciamos a lógica de exibição
        startApp();

    } catch (err) {
        console.error("Erro crítico ao carregar traduções:", err);
    }
}

function startApp() {
    const onboardingComplete = localStorage.getItem(onboardingCompleteKey);
    updateContent();
    updateStepInterface();
    
    if (onboardingComplete === 'true') {
        window.location.href = '/dashboard';
    } else {
        showStep(1);
    }
}

// Função para aplicar as traduções nos elementos com [data-i18n]
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18next.t(key);
    });
}

// 3. Declare as referências dos elementos (serão preenchidas no window.onload)
let formElement, completionPanel, stepBadge, previousButton, nextButton, goToDashboardButton, onboardingCard;

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18next.t(key);
  });
}

function updateStepInterface() {
  if (!previousButton || !nextButton) return;
  
  previousButton.disabled = currentStep === 1;
  nextButton.textContent = currentStep === totalSteps ? i18next.t('finish') : i18next.t('next');
}

function showStep(step) {
  currentStep = step;
  for (let i = 1; i <= totalSteps; i++) {
    const stepEl = document.getElementById(`step${i}`);
    if (stepEl) {
      stepEl.style.display = i === step ? 'grid' : 'none';
    }
  }
  if (stepBadge) {
    stepBadge.textContent = i18next.t('step_' + step);
  }
  updateStepInterface();
}

async function nextStep() {
  if (currentStep === 1) {
    showStep(2);
    return;
  }

  if (currentStep === 2) {
  const selected = document.querySelector('input[name="colorblind"]:checked');
  if (!selected) {
    alert(i18next.t('colorblind_question') + ' ' + i18next.t('yes') + '/' + i18next.t('no'));
    return;
  }

  localStorage.setItem('colorblind', selected.value);
  await syncLocalPreferencesToCloud();

  if (selected.value === 'yes') {
    showStep(3);
    return;
  }

  finishOnboarding();
  return;
}

  if (currentStep === 3) {
  const selected = document.querySelector('input[name="type"]:checked');
  if (!selected) {
    alert(i18next.t('colorblind_type'));
    return;
  }

  localStorage.setItem('colorblindType', selected.value);
  localStorage.setItem('currentFilter', selected.value);

  applyFilter(selected.value);

  await syncLocalPreferencesToCloud();
  finishOnboarding();
}
function previousStep() {
  if (currentStep > 1) {
    showStep(currentStep - 1);
  }
}

async function finishOnboarding() {
  localStorage.setItem(onboardingCompleteKey, 'true');
  await syncLocalPreferencesToCloud();

  if (onboardingCard) onboardingCard.style.display = 'none';
  if (formElement) formElement.style.display = 'none';

  if (completionPanel) {
    completionPanel.style.display = 'grid';
    completionPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function applyFilter(type) {
  if (type) {
    document.body.style.filter = `url('#${type}-filter')`;
  } else {
    document.body.style.filter = '';
  }
}

// 4. Inicialização única e segura
// 3. Remova o initI18n() solto e deixe apenas dentro do onload para evitar execuções duplas
window.onload = () => {
    // Referências dos elementos
    formElement = document.getElementById('onboarding-form');
    completionPanel = document.getElementById('completion-panel');
    stepBadge = document.getElementById('step-display');
    previousButton = document.getElementById('previousButton');
    nextButton = document.getElementById('nextButton');
    goToDashboardButton = document.getElementById('goToDashboard');

    // Listeners
    if (previousButton) previousButton.addEventListener('click', previousStep);
    if (nextButton) nextButton.addEventListener('click', nextStep);
    
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        // Define o valor do select para o que está no localStorage
        languageSelect.value = localStorage.getItem('language') || 'en';
        
        languageSelect.addEventListener('change', async function() {
    const lang = this.value;

    localStorage.setItem('language', lang);

    i18next.changeLanguage(lang, () => {
        updateContent();
        updateStepInterface();
    });

    await syncLocalPreferencesToCloud();
});
    }
    if (goToDashboardButton) {
    goToDashboardButton.addEventListener('click', () => {
        // Salva que o onboarding terminou ANTES de ir embora
        localStorage.setItem('onboardingComplete', 'true');
        window.location.href = '/dashboard';
    });
}

    // Inicia o processo de tradução e app
    initI18n();
}};