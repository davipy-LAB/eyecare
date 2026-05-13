const onboardingCompleteKey = 'onboardingComplete';
let currentStep = 1;
const totalSteps = 2;;

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
                    loadPath: '/static/locales/{{lng}}/translation.json?v=auth-logout-1'
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
        return;
    }

    if (isLoggedIn()) {
        const authCard = document.getElementById('auth-card');
        const onboardingCard = document.getElementById('onboarding-card');

        authCard?.classList.add('hidden');
        onboardingCard?.classList.remove('hidden');

        showStep(1);
        return;
    }

    const authCard = document.getElementById('auth-card');
    const onboardingCard = document.getElementById('onboarding-card');

    authCard?.classList.remove('hidden');
    onboardingCard?.classList.add('hidden');
}

// 3. Declare as referências dos elementos (serão preenchidas no window.onload)
let formElement, completionPanel, stepBadge, previousButton, nextButton, goToDashboardButton, onboardingCard;

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18next.t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', i18next.t(key));
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
      stepEl.classList.toggle('hidden', i !== step);
    }
  }

  if (stepBadge) {
    stepBadge.textContent = i18next.t('step_' + step);
  }

  updateStepInterface();
}

async function nextStep() {
  if (currentStep === 1) {
    const selected = document.querySelector('input[name="colorblind"]:checked');

    if (!selected) {
      alert(i18next.t('colorblind_question') + ' ' + i18next.t('yes') + '/' + i18next.t('no'));
      return;
    }

    localStorage.setItem('colorblind', selected.value);

    if (selected.value === 'yes') {
      await syncLocalPreferencesToCloud();
      showStep(2);
      return;
    }

    localStorage.removeItem('colorblindType');
    localStorage.setItem('currentFilter', 'none');

    await finishOnboarding();
    return;
  }

  if (currentStep === 2) {
    const selected = document.querySelector('input[name="type"]:checked');

    if (!selected) {
      alert(i18next.t('colorblind_type'));
      return;
    }

    localStorage.setItem('colorblindType', selected.value);
    localStorage.setItem('currentFilter', selected.value);

    applyFilter(selected.value);

    await finishOnboarding();
  }
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
    onboardingCard = document.getElementById('onboarding-card');

const authCard = document.getElementById('auth-card');
const showLogin = document.getElementById('show-login');
const showRegister = document.getElementById('show-register');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const continueGuest = document.getElementById('continue-guest');
const authMessage = document.getElementById('auth-message');

function setAuthMessage(message, type = '') {
    if (!authMessage) return;

    authMessage.textContent = message;
    authMessage.classList.remove('error', 'success');

    if (type) {
        authMessage.classList.add(type);
    }
}

function showAuthMode(mode) {
    const isLogin = mode === 'login';

    loginForm?.classList.toggle('hidden', !isLogin);
    registerForm?.classList.toggle('hidden', isLogin);

    showLogin?.classList.toggle('active', isLogin);
    showRegister?.classList.toggle('active', !isLogin);

    setAuthMessage('');
}

function showOnboardingFlow() {
    authCard?.classList.add('hidden');
    onboardingCard?.classList.remove('hidden');
    showStep(1);
}

showLogin?.addEventListener('click', () => showAuthMode('login'));
showRegister?.addEventListener('click', () => showAuthMode('register'));

continueGuest?.addEventListener('click', () => {
    showOnboardingFlow();
});

loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    try {
        setAuthMessage(i18next.t('logging_in'));

        await loginUser(email, password);

        const prefs = await apiGetPreferences();

        if (prefs) {
            applyCloudPreferencesLocally(prefs);
        }

        setAuthMessage(i18next.t('login_success'), 'success');

        if (localStorage.getItem('onboardingComplete') === 'true') {
            window.location.href = '/dashboard';
            return;
        }

        showOnboardingFlow();
        updateContent();
        updateStepInterface();

    } catch (error) {
        setAuthMessage(error.message, 'error');
    }
});

registerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;

    try {
        setAuthMessage(i18next.t('creating_account'));

        await registerUser(username, email, password);
        await syncLocalPreferencesToCloud();

        setAuthMessage(i18next.t('register_success'), 'success');

        showOnboardingFlow();

    } catch (error) {
        setAuthMessage(error.message, 'error');
    }
});

if (isLoggedIn()) {
    authCard?.classList.add('hidden');
    onboardingCard?.classList.remove('hidden');
}

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
}