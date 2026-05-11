// popup.js

const buttons = document.querySelectorAll('button');
const pauseSwitch = document.getElementById('pause-switch');
const languageSelect = document.getElementById('language-select');

// --- 1. INICIALIZAÇÃO E IDIOMAS ---

async function initI18n() {
  chrome.storage.local.get(['userLanguage'], async (result) => {
    let lang = result.userLanguage || navigator.language.split('-')[0];
    
    // Atualiza o select se ele existir no HTML
    if (languageSelect) languageSelect.value = lang;

    await loadAndInitialize(lang);
  });
}

async function loadAndInitialize(lang) {
  try {
    const response = await fetch(chrome.runtime.getURL(`locales/${lang}/translation.json`));
    if (!response.ok) throw new Error('Falha ao carregar tradução');
    
    const translation = await response.json();

    await i18next.init({
      lng: lang,
      resources: {
        [lang]: { translation: translation }
      }
    });

    applyTranslations();
    updateTimerDisplay(); // Atualiza o timer logo após traduzir
  } catch (error) {
    console.error("Erro ao carregar idioma:", error);
    if (lang !== 'en') loadAndInitialize('en');
  }
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerText = i18next.t(key);
  });
}

// Listener para troca de idioma
if (languageSelect) {
  languageSelect.addEventListener('change', async (e) => {
    const newLang = e.target.value;
    chrome.storage.local.set({ userLanguage: newLang }, async () => {
      await loadAndInitialize(newLang);
    });
  });
}

// --- 2. CONTROLE DE FILTROS ---

chrome.storage.local.get(['eyeCareFilter'], (result) => {
  if (result.eyeCareFilter) {
    const activeBtn = document.getElementById(result.eyeCareFilter);
    if (activeBtn) activeBtn.classList.add('active');
  }
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filterId = btn.id;
    chrome.storage.local.set({ eyeCareFilter: filterId });
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs || !tabs[0] || !tabs[0].id) {
    console.warn("EyeCare: nenhuma aba ativa encontrada.");
    return;
  }

  chrome.tabs.sendMessage(
    tabs[0].id,
    { action: "applyFilter", type: filterId },
    () => {
      if (chrome.runtime.lastError) {
        console.warn(
          "Sorry, this page does not support EyeCare filters. Error: " +
          chrome.runtime.lastError.message
        );
      }
    }
  );
});
  });
});

// --- 3. PAUSAS PROGRAMADAS (TIMER) ---

chrome.storage.local.get(['pauseReminders'], (result) => {
  if (pauseSwitch) pauseSwitch.checked = result.pauseReminders || false;
});

if (pauseSwitch) {
  pauseSwitch.addEventListener('change', () => {
    const isEnabled = pauseSwitch.checked;
    chrome.storage.local.set({ pauseReminders: isEnabled });
    chrome.runtime.sendMessage({ action: isEnabled ? "startTimer" : "stopTimer" });
    updateTimerDisplay();
  });
}

function updateTimerDisplay() {
  const timerContainer = document.getElementById('timer-container');
  const display = document.getElementById('timer-display');
  const pauseSwitch = document.getElementById('pause-switch');

  // Segurança: Se os elementos não existirem no HTML, não faz nada
  if (!timerContainer || !display || !pauseSwitch) {
    console.warn("EyeCare: Elementos do timer não encontrados no HTML.");
    return;
  }

  // 1. Se a chave estiver desligada, escondemos o balão
  if (!pauseSwitch.checked) {
    timerContainer.classList.add('hidden');
    return;
  }

  // 2. Se a chave está ligada, mostramos o balão
  timerContainer.classList.remove('hidden');

  // 3. Verificamos o i18next
  if (!i18next.isInitialized) {
    display.innerText = "...";
    return;
  }

  // 4. Perguntamos ao background
  chrome.runtime.sendMessage({ action: "getTimeLeft" }, (response) => {
    // Verifica se houve erro na comunicação com o background
    if (chrome.runtime.lastError) {
      console.error("Erro ao falar com background:", chrome.runtime.lastError);
      return;
    }

    if (response && response.timeLeft !== null) {
      // Tenta traduzir. Se falhar, mostra o tempo puro para não ficar vazio
      try {
        const traduzido = i18next.t('next_pause', { minutes: response.timeLeft });
        display.innerText = traduzido;
      } catch (e) {
        display.innerText = `Pause in ${response.timeLeft} min`;
      }
    } else {
      // Se o background respondeu mas o tempo é null (alarme ainda não criado)
      display.innerText = i18next.t('status_active') || "Iniciando...";
    }
  });
}

// Inicializa o sistema de tradução
initI18n();

// Atualiza o visor do timer a cada segundo
setInterval(updateTimerDisplay, 1000);