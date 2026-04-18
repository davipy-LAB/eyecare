// i18next initialization
const i18nResources = {
  'pt-BR': {
    translation: {
      welcome: 'Bem-vindo ao Eyecare',
      select_language: 'Selecione o idioma:',
      next: 'Próximo',
      back: 'Voltar',
      finish: 'Finalizar',
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
      colorblind_question: 'Are you colorblind?',
      yes: 'Yes',
      no: 'No',
      colorblind_type: 'What type of colorblindness?',
      protanopia: 'Protanopia',
      deuteranopia: 'Deuteranopia',
      tritanopia: 'Tritanopia',
      hero_description: 'Configure your accessibility experience.',
      step_1: 'Step 1',
      step_info: 'Let’s configure your usage profile.',
      language_select: 'Select your preferred language to get started.',
      completion_title: 'All set!',
      completion_text: 'Your preferences are saved. Eyecare is now tuned for your sight.'
    }
  }
};

const formElement = document.getElementById('onboarding-form');
const completionPanel = document.getElementById('completion-panel');
const stepBadge = document.getElementById('step-display');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');

i18next.init({
  lng: 'en',
  resources: i18nResources
}, function() {
  updateContent();
  updateStepInterface();
});

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18next.t(key);
  });
}

let currentStep = 1;
const totalSteps = 3;
const onboardingCompleteKey = 'onboardingComplete';

function showStep(step) {
  currentStep = step;
  for (let i = 1; i <= totalSteps; i += 1) {
    const stepEl = document.getElementById(`step${i}`);
    if (stepEl) {
      stepEl.style.display = i === step ? 'grid' : 'none';
    }
  }
  stepBadge.textContent = `Passo ${step}`;
  updateStepInterface();
}

function updateStepInterface() {
  if (!previousButton || !nextButton) {
    return;
  }

  previousButton.disabled = currentStep === 1;
  nextButton.textContent = currentStep === totalSteps ? i18next.t('finish') : i18next.t('next');
}

function nextStep() {
  if (currentStep === 1) {
    const languageSelect = document.getElementById('language');
    const lang = languageSelect ? languageSelect.value : 'pt-BR';
    i18next.changeLanguage(lang, () => {
      updateContent();
      updateStepInterface();
    });
    localStorage.setItem('language', lang);
    showStep(2);
    return;
  }

  if (currentStep === 2) {
    const selected = document.querySelector('input[name="colorblind"]:checked');
    if (!selected) {
      alert('Por favor, selecione uma opção.');
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
      alert('Por favor, selecione o tipo de daltonismo.');
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
  if (formElement) {
    formElement.style.display = 'none';
  }
  if (completionPanel) {
    completionPanel.classList.remove('hidden');
    completionPanel.style.display = 'grid';
    completionPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function applyFilter(type) {
  document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
  if (type) {
    document.body.classList.add(type);
  }
}

function resetOnboarding() {
  localStorage.removeItem(onboardingCompleteKey);
  localStorage.removeItem('colorblind');
  localStorage.removeItem('colorblindType');
  showStep(1);
  if (formElement) {
    formElement.style.display = 'grid';
  }
  if (completionPanel) {
    completionPanel.classList.add('hidden');
    completionPanel.style.display = 'none';
  }
}

window.onload = function() {
  const storedLang = localStorage.getItem('language');
  const onboardingComplete = localStorage.getItem(onboardingCompleteKey);
  const storedType = localStorage.getItem('colorblindType');

  if (storedLang) {
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
      languageSelect.value = storedLang;
    }
    i18next.changeLanguage(storedLang, () => {
      updateContent();
      updateStepInterface();
    });
  }

  if (onboardingComplete === 'true') {
    if (storedType) {
      applyFilter(storedType);
    }
    finishOnboarding();
  } else {
    showStep(1);
    if (completionPanel) {
      completionPanel.classList.add('hidden');
      completionPanel.style.display = 'none';
    }
  }
};

if (previousButton) {
  previousButton.addEventListener('click', previousStep);
}

if (nextButton) {
  nextButton.addEventListener('click', nextStep);
}
