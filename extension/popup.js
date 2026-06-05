// popup.js

// ===============================
// 0. ELEMENTOS DO POPUP
// ===============================

const buttons = document.querySelectorAll('.filter-btn');
const pauseSwitch = document.getElementById('pause-switch');
const languageSelect = document.getElementById('language-select');
const contrastSlider = document.getElementById('contrast-slider');
const contrastValue = document.getElementById('contrast-value');
const comfortMode = document.getElementById('comfort-mode');

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const syncNowButton = document.getElementById('sync-now-button');

const authLoggedOut = document.getElementById('auth-logged-out');
const authLoggedIn = document.getElementById('auth-logged-in');
const extensionUserLabel = document.getElementById('extension-user-label');
const authMessage = document.getElementById('auth-message');

const API_BASE = "https://eyecare-prci.onrender.com";

const SUPPORTED_LANGS = ["en", "pt", "es", "de", "fr", "it", "ru", "ja"];

let syncDebounceTimer = null;

let currentAuthMessageState = {
  key: null,
  type: "",
  options: {},
  fallback: ""
};


// ===============================
// 1. HELPERS DO CHROME STORAGE
// ===============================

function chromeGet(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, resolve);
  });
}

function chromeSet(data) {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, resolve);
  });
}

function chromeRemove(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.remove(keys, resolve);
  });
}


// ===============================
// 2. HELPERS GERAIS
// ===============================

function clampContrast(value) {
  return Math.min(130, Math.max(100, Number(value || 100)));
}

function normalizeLanguage(lang) {
  const normalized = String(lang || "en").split("-")[0];

  if (SUPPORTED_LANGS.includes(normalized)) {
    return normalized;
  }

  return "en";
}

function t(key, options = {}, fallback = key) {
  if (typeof i18next !== "undefined" && i18next.isInitialized) {
    return i18next.t(key, {
      defaultValue: fallback,
      ...options
    });
  }

  return fallback;
}

function renderAuthMessage(message, type = "") {
  if (!authMessage) return;

  authMessage.textContent = message;
  authMessage.classList.remove("error", "success");

  if (type) {
    authMessage.classList.add(type);
  }
}

function setAuthMessage(message, type = "") {
  currentAuthMessageState = {
    key: null,
    type,
    options: {},
    fallback: message
  };

  renderAuthMessage(message, type);
}

function setAuthMessageKey(key, type = "", options = {}, fallback = key) {
  currentAuthMessageState = {
    key,
    type,
    options,
    fallback
  };

  renderAuthMessage(t(key, options, fallback), type);
}

function refreshAuthMessage() {
  if (!currentAuthMessageState.key) return;

  renderAuthMessage(
    t(
      currentAuthMessageState.key,
      currentAuthMessageState.options,
      currentAuthMessageState.fallback
    ),
    currentAuthMessageState.type
  );
}

function clearAuthMessage() {
  currentAuthMessageState = {
    key: null,
    type: "",
    options: {},
    fallback: ""
  };

  renderAuthMessage("");
}

function scheduleCloudSync(delay = 800) {
  clearTimeout(syncDebounceTimer);

  syncDebounceTimer = setTimeout(() => {
    pushExtensionPreferencesToCloud();
  }, delay);
}


// ===============================
// 3. API / TOKEN / TIMEOUT
// ===============================

async function getAccessToken() {
  const result = await chromeGet(["access_token"]);
  return result.access_token || null;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 45000) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function apiRequest(path, options = {}) {
  const token = await getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetchWithTimeout(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }

  return response.json();
}


// ===============================
// 4. I18N
// ===============================

async function initI18n() {
  const result = await chromeGet(["userLanguage"]);
  const browserLang = normalizeLanguage(navigator.language);
  const lang = normalizeLanguage(result.userLanguage || browserLang);

  if (languageSelect) {
    languageSelect.value = lang;
  }

  await loadAndInitialize(lang);
}

async function loadAndInitialize(lang) {
  const safeLang = normalizeLanguage(lang);

  try {
    const response = await fetch(
      chrome.runtime.getURL(`locales/${safeLang}/translation.json`)
    );

    if (!response.ok) {
      throw new Error(`Falha ao carregar tradução: ${safeLang}`);
    }

    const translation = await response.json();

    if (i18next.isInitialized) {
      i18next.addResourceBundle(
        safeLang,
        "translation",
        translation,
        true,
        true
      );

      await i18next.changeLanguage(safeLang);
    } else {
      await i18next.init({
        lng: safeLang,
        fallbackLng: "en",
        resources: {
          [safeLang]: {
            translation
          }
        }
      });
    }

    applyTranslations();
    updateTimerDisplay();
  } catch (error) {
    console.error("Erro ao carregar idioma:", error);

    if (safeLang !== "en") {
      await loadAndInitialize("en");
    }
  }
}

function applyTranslations() {
  if (!i18next.isInitialized) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerText = i18next.t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", i18next.t(key));
  });

  updateAuthUI();
  refreshAuthMessage();
}


// ===============================
// 5. UI DE AUTH
// ===============================

async function updateAuthUI() {
  const data = await chromeGet(["access_token", "username", "user_email"]);

  const isLoggedIn = Boolean(data.access_token);

  authLoggedOut?.classList.toggle("hidden", isLoggedIn);
  authLoggedIn?.classList.toggle("hidden", !isLoggedIn);

  if (extensionUserLabel && isLoggedIn) {
    const fallbackUser = t("eyecare_user", {}, "usuário EyeCare");
    const user = data.username || data.user_email || fallbackUser;

    extensionUserLabel.textContent = t(
      "logged_as",
      { user },
      `Logado como ${user}`
    );
  }
}

async function loginExtensionUser(email, password) {
  const data = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  await chromeSet({
    access_token: data.access_token,
    username: data.user?.username || "",
    user_email: data.user?.email || "",
    user_plan: data.user?.plan || "standard"
  });

  return data;
}


// ===============================
// 6. MAP EXTENSÃO <-> API
// ===============================

function mapExtensionToApiPrefs(local) {
  const visualFilter = local.eyeCareFilter || "none";
  const contrast = clampContrast(local.eyeCareContrast ?? 100);
  const language = normalizeLanguage(local.userLanguage || "en");

  return {
    language,
    visual_filter: visualFilter,
    colorblind: visualFilter !== "none",
    colorblind_type: visualFilter !== "none" ? visualFilter : null,
    dynamic_contrast_enabled: contrast !== 100,
    contrast,
    comfort_mode: Boolean(local.eyeCareComfortMode),
    pause_reminders: Boolean(local.pauseReminders),
    onboarding_complete: true
  };
}

function mapApiPrefsToExtension(prefs) {
  return {
    userLanguage: normalizeLanguage(prefs.language || "en"),
    eyeCareFilter: prefs.visual_filter || "none",
    eyeCareContrast: clampContrast(prefs.contrast ?? 100),
    eyeCareComfortMode: Boolean(prefs.comfort_mode),
    pauseReminders: Boolean(prefs.pause_reminders)
  };
}


// ===============================
// 7. SYNC CLOUD
// ===============================

async function pushExtensionPreferencesToCloud() {
  const token = await getAccessToken();

  if (!token) return;

  try {
    const local = await chromeGet([
      "userLanguage",
      "eyeCareFilter",
      "eyeCareContrast",
      "eyeCareComfortMode",
      "pauseReminders"
    ]);

    const payload = mapExtensionToApiPrefs(local);

    await apiRequest("/api/preferences", {
      method: "PATCH",
      body: JSON.stringify(payload)
    });

    console.log("EyeCare: preferências sincronizadas com a nuvem.");
  } catch (error) {
    console.warn(
      "EyeCare: sync adiado. Preferências continuam salvas localmente.",
      error
    );
  }
}

async function pullCloudPreferencesToExtension() {
  const prefs = await apiRequest("/api/preferences", {
    method: "GET"
  });

  const extensionPrefs = mapApiPrefsToExtension(prefs);

  await chromeSet(extensionPrefs);

  if (languageSelect) {
    languageSelect.value = extensionPrefs.userLanguage;
    await loadAndInitialize(extensionPrefs.userLanguage);
  }

  if (contrastSlider) {
    contrastSlider.value = extensionPrefs.eyeCareContrast;
  }

  if (contrastValue) {
    contrastValue.textContent = `${extensionPrefs.eyeCareContrast}%`;
  }

  if (comfortMode) {
    comfortMode.checked = extensionPrefs.eyeCareComfortMode;
  }

  if (pauseSwitch) {
    pauseSwitch.checked = extensionPrefs.pauseReminders;
  }

  buttons.forEach((button) => button.classList.remove("active"));

  const activeBtn = document.getElementById(extensionPrefs.eyeCareFilter);

  if (activeBtn) {
    activeBtn.classList.add("active");
  }

  sendAccessibilitySettingsToTab({
    contrast: extensionPrefs.eyeCareContrast,
    comfortMode: extensionPrefs.eyeCareComfortMode
  });

  sendFilterToCurrentTab(extensionPrefs.eyeCareFilter);

  chrome.runtime.sendMessage({
    action: extensionPrefs.pauseReminders ? "startTimer" : "stopTimer"
  });

  updateTimerDisplay();
}

async function tryInitialCloudSync() {
  const token = await getAccessToken();

  if (!token) return;

  try {
    setAuthMessageKey(
      "msg_syncing_cloud",
      "",
      {},
      "Sincronizando com a nuvem..."
    );

    await pullCloudPreferencesToExtension();

    setAuthMessageKey(
      "msg_cloud_synced",
      "success",
      {},
      "Preferências sincronizadas."
    );
  } catch (error) {
    console.warn("EyeCare: usando preferências locais. Cloud sync falhou.", error);

    setAuthMessageKey(
      "msg_server_preparing",
      "success",
      {},
      "Quase lá! Preparando o servidor..."
    );
  }
}


// ===============================
// 8. COMUNICAÇÃO COM CONTENT.JS
// ===============================

function sendFilterToCurrentTab(filterType) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0] || !tabs[0].id) {
      console.warn("EyeCare: nenhuma aba ativa encontrada.");
      return;
    }

    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        action: "applyFilter",
        type: filterType
      },
      () => {
        if (chrome.runtime.lastError) {
          console.warn(
            "EyeCare: filtro não aplicado nesta página. Error: " +
            chrome.runtime.lastError.message
          );
        }
      }
    );
  });
}

function sendAccessibilitySettingsToTab(settings) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0] || !tabs[0].id) {
      console.warn("EyeCare: nenhuma aba ativa encontrada.");
      return;
    }

    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        action: "applyAccessibilitySettings",
        settings
      },
      () => {
        if (chrome.runtime.lastError) {
          console.warn(
            "EyeCare: esta página não suporta ajustes visuais. Error: " +
            chrome.runtime.lastError.message
          );
        }
      }
    );
  });
}


// ===============================
// 9. EVENTOS DE AUTH
// ===============================

loginButton?.addEventListener("click", async () => {
  try {
    const email = loginEmail?.value.trim();
    const password = loginPassword?.value || "";

    if (!email || !password) {
      setAuthMessageKey(
        "msg_fill_email_password",
        "error",
        {},
        "Preencha email e senha."
      );
      return;
    }

    loginButton.disabled = true;

    setAuthMessageKey(
      "msg_server_waking_login",
      "",
      {},
      "Entrando... o servidor pode levar alguns segundos para acordar."
    );

    await loginExtensionUser(email, password);
    await updateAuthUI();

    setAuthMessageKey(
      "msg_login_syncing",
      "",
      {},
      "Login feito. Sincronizando preferências..."
    );

    await pullCloudPreferencesToExtension();

    setAuthMessageKey(
      "msg_login_success_synced",
      "success",
      {},
      "Login realizado e preferências sincronizadas."
    );
  } catch (error) {
    if (error.name === "AbortError") {
      setAuthMessageKey(
        "msg_server_preparing",
        "success",
        {},
        "Quase lá! Preparando o servidor..."
      );
    } else {
      setAuthMessageKey(
        "msg_login_invalid",
        "error",
        {},
        "Erro ao entrar. Verifique email e senha."
      );
    }

    console.error(error);
  } finally {
    loginButton.disabled = false;
  }
});

logoutButton?.addEventListener("click", async () => {
  await chromeRemove([
    "access_token",
    "username",
    "user_email",
    "user_plan"
  ]);

  clearAuthMessage();
  await updateAuthUI();
});

syncNowButton?.addEventListener("click", async () => {
  try {
    syncNowButton.disabled = true;
    syncNowButton.textContent = t(
      "msg_sync_now_loading",
      {},
      "Sincronizando..."
    );

    setAuthMessageKey(
      "msg_sync_now_start",
      "",
      {},
      "Acordando servidor e sincronizando..."
    );

    await pullCloudPreferencesToExtension();

    setAuthMessageKey(
      "msg_cloud_synced",
      "success",
      {},
      "Preferências sincronizadas."
    );
  } catch (error) {
    if (error.name === "AbortError") {
      setAuthMessageKey(
        "msg_server_preparing",
        "success",
        {},
        "Quase lá! Preparando o servidor..."
      );
    } else {
      setAuthMessageKey(
        "msg_sync_failed_local",
        "error",
        {},
        "Não consegui sincronizar agora. Preferências locais continuam salvas."
      );
    }

    console.error(error);
  } finally {
    syncNowButton.disabled = false;
    syncNowButton.textContent = t(
      "sync_now",
      {},
      "Sincronizar agora"
    );
  }
});


// ===============================
// 10. EVENTO DE IDIOMA
// ===============================

if (languageSelect) {
  languageSelect.addEventListener("change", async (e) => {
    const newLang = normalizeLanguage(e.target.value);

    await chromeSet({ userLanguage: newLang });
    await loadAndInitialize(newLang);
    await updateAuthUI();

    refreshAuthMessage();
    scheduleCloudSync();
  });
}


// ===============================
// 11. EVENTOS DE FILTRO
// ===============================

chrome.storage.local.get(["eyeCareFilter"], (result) => {
  const savedFilter = result.eyeCareFilter || "none";

  const activeBtn = document.getElementById(savedFilter);

  if (activeBtn) {
    buttons.forEach((button) => button.classList.remove("active"));
    activeBtn.classList.add("active");
  }
});

buttons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const filterId = btn.id;

    await chromeSet({ eyeCareFilter: filterId });

    buttons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    sendFilterToCurrentTab(filterId);
    scheduleCloudSync();
  });
});


// ===============================
// 12. CONTRASTE DINÂMICO / CONFORTO
// ===============================

function updateExtensionAccessibilitySettings() {
  const contrast = clampContrast(contrastSlider?.value || 100);
  const comfort = Boolean(comfortMode?.checked);

  if (contrastSlider) {
    contrastSlider.value = contrast;
  }

  if (contrastValue) {
    contrastValue.textContent = `${contrast}%`;
  }

  const settings = {
    contrast,
    comfortMode: comfort
  };

  chrome.storage.local.set({
    eyeCareContrast: contrast,
    eyeCareComfortMode: comfort
  }, () => {
    sendAccessibilitySettingsToTab(settings);
    scheduleCloudSync();
  });
}

chrome.storage.local.get(
  ["eyeCareContrast", "eyeCareComfortMode"],
  (result) => {
    const savedContrast = clampContrast(result.eyeCareContrast ?? 100);
    const savedComfort = Boolean(result.eyeCareComfortMode);

    if (contrastSlider) {
      contrastSlider.value = savedContrast;
    }

    if (contrastValue) {
      contrastValue.textContent = `${savedContrast}%`;
    }

    if (comfortMode) {
      comfortMode.checked = savedComfort;
    }

    sendAccessibilitySettingsToTab({
      contrast: savedContrast,
      comfortMode: savedComfort
    });
  }
);

if (contrastSlider) {
  contrastSlider.addEventListener("input", updateExtensionAccessibilitySettings);
}

if (comfortMode) {
  comfortMode.addEventListener("change", updateExtensionAccessibilitySettings);
}


// ===============================
// 13. PAUSAS PROGRAMADAS / TIMER
// ===============================

chrome.storage.local.get(["pauseReminders"], (result) => {
  if (pauseSwitch) {
    pauseSwitch.checked = Boolean(result.pauseReminders);
  }
});

if (pauseSwitch) {
  pauseSwitch.addEventListener("change", async () => {
    const isEnabled = pauseSwitch.checked;

    await chromeSet({ pauseReminders: isEnabled });

    chrome.runtime.sendMessage({
      action: isEnabled ? "startTimer" : "stopTimer"
    });

    updateTimerDisplay();
    scheduleCloudSync();
  });
}

function updateTimerDisplay() {
  const timerContainer = document.getElementById("timer-container");
  const display = document.getElementById("timer-display");
  const pauseSwitch = document.getElementById("pause-switch");

  if (!timerContainer || !display || !pauseSwitch) {
    return;
  }

  if (!pauseSwitch.checked) {
    timerContainer.classList.add("hidden");
    return;
  }

  timerContainer.classList.remove("hidden");

  if (typeof i18next === "undefined" || !i18next.isInitialized) {
    display.innerText = "...";
    return;
  }

  chrome.runtime.sendMessage({ action: "getTimeLeft" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Erro ao falar com background:", chrome.runtime.lastError);
      return;
    }

    if (response && response.timeLeft !== null) {
      try {
        display.innerText = i18next.t("next_pause", {
          minutes: response.timeLeft
        });
      } catch (error) {
        display.innerText = `Pause in ${response.timeLeft} min`;
      }
    } else {
      display.innerText = i18next.t("status_active") || "Iniciando...";
    }
  });
}


// ===============================
// 14. INICIALIZAÇÃO FINAL
// ===============================

async function startPopup() {
  await initI18n();
  await updateAuthUI();
  await tryInitialCloudSync();

  updateTimerDisplay();

  setInterval(updateTimerDisplay, 1000);
}

startPopup();