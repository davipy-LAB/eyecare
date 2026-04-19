// 1. Mova as constantes e variáveis de estado para o TOPO do arquivo
const onboardingCompleteKey = 'onboardingComplete';
let currentStep = 1;
const totalSteps = 3;

// 2. Defina os recursos de tradução
const i18nResources = {
  'pt-BR': {
    translation: {
      welcome: 'Bem-vindo ao Eyecare',
      select_language: 'Selecione o idioma:',
      next: 'Próximo',
      back: 'Voltar',
      finish: 'Finalizar',
      go_to_dashboard: 'Ir para Dashboard',
      colorblind_question: 'Você é daltônico?',
      yes: 'Sim',
      no: 'Não',
      colorblind_type: 'Qual tipo de daltonismo?',
      protanopia: 'Protanopia',
      deuteranopia: 'Deuteranopia',
      tritanopia: 'Tritanopia',
      hero_description: 'Configure a sua experiência de acessibilidade.',
      step_info: 'Vamos configurar seu perfil de uso.',
      language_select: 'Selecione seu idioma preferido para começar.',
      step_1: 'Passo 1',
      step_2: 'Passo 2',
      step_3: 'Passo 3',
      completion_title: 'Tudo pronto!',
      completion_text: 'Suas preferências foram gravadas. Agora o Eyecare está ajustado para sua visão.'
    }
  },
  en: {
    translation: {
      welcome: 'Welcome to Eyecare',
      select_language: 'Select language:',
      next: 'Next',
      back: 'Back',
      finish: 'Finish',
      go_to_dashboard: 'Go to Dashboard',
      colorblind_question: 'Are you colorblind?',
      yes: 'Yes',
      no: 'No',
      colorblind_type: 'What type of colorblindness?',
      protanopia: 'Protanopia',
      deuteranopia: 'Deuteranopia',
      tritanopia: 'Tritanopia',
      hero_description: 'Configure your accessibility experience.',
      step_1: 'Step 1',
      step_2: 'Step 2',
      step_3: 'Step 3',
      step_info: 'Let’s configure your usage profile.',
      language_select: 'Select your preferred language to get started.',
      completion_title: 'All set!',
      completion_text: 'Your preferences are saved. Eyecare is now tuned for your sight.'
    }
  },
  de: {
    translation: {
      welcome: 'Willkommen bei Eyecare',
      select_language: 'Sprache auswählen:',
      next: 'Weiter',
      back: 'Zurück',
      finish: 'Fertigstellen',
      go_to_dashboard: 'Zum Dashboard',
      colorblind_question: 'Sind Sie farbenblind?',
      yes: 'Ja',
      no: 'Nein',
      colorblind_type: 'Welche Art von Farbenblindheit?',
      protanopia: 'Protanopie',
      deuteranopia: 'Deuteranopie',
      tritanopia: 'Tritanopie',
      hero_description: 'Konfigurieren Sie Ihre Barrierefreiheitserfahrung.',
      step_1: 'Schritt 1',
      step_2: 'Schritt 2',
      step_3: 'Schritt 3',
      step_info: 'Lassen Sie uns Ihr Nutzungsprofil konfigurieren.',
      language_select: 'Wählen Sie Ihre bevorzugte Sprache, um loszulegen.',
      completion_title: 'Alles bereit!',
      completion_text: 'Ihre Präferenzen wurden gespeichert. Eyecare ist jetzt auf Ihre Sicht abgestimmt.'
    }
  }
};

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

function nextStep() {
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
    applyFilter(selected.value);
    finishOnboarding();
  }
}

function previousStep() {
  if (currentStep > 1) {
    showStep(currentStep - 1);
  }
}

function finishOnboarding() {
  localStorage.setItem(onboardingCompleteKey, 'true');
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
window.onload = function() {
  // Captura os elementos do DOM agora que a página carregou
  formElement = document.getElementById('onboarding-form');
  completionPanel = document.getElementById('completion-panel');
  onboardingCard = document.querySelector('.onboarding-card');
  stepBadge = document.getElementById('step-display');
  previousButton = document.getElementById('previousButton');
  nextButton = document.getElementById('nextButton');
  goToDashboardButton = document.getElementById('goToDashboard');

  // Adiciona os ouvintes de evento
  if (previousButton) previousButton.addEventListener('click', previousStep);
  if (nextButton) nextButton.addEventListener('click', nextStep);
  if (goToDashboardButton) goToDashboardButton.addEventListener('click', () => window.location.href = '/dashboard');

  const storedLang = localStorage.getItem('language') || 'en';
  const onboardingComplete = localStorage.getItem(onboardingCompleteKey);
  const storedType = localStorage.getItem('colorblindType');

  // Aplica o filtro se definido
  if (storedType) {
    applyFilter(storedType);
  }

  // Inicializa o i18next
  i18next.init({
    lng: storedLang,
    resources: i18nResources
  }, function() {
    updateContent();
    
    if (onboardingComplete === 'true') {
      window.location.href = '/dashboard';
    } else {
      showStep(1);
    }
  });

  // Adiciona ouvinte para mudança de idioma imediata
  const languageSelect = document.getElementById('language');
  if (languageSelect) {
    languageSelect.addEventListener('change', function() {
      const lang = this.value;
      i18next.changeLanguage(lang, () => {
        updateContent();
        updateStepInterface();
      });
      localStorage.setItem('language', lang);
    });
    languageSelect.value = storedLang;
  }
};