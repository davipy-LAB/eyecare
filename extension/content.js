// content.js

// ===============================
// 1. ESTADO ATUAL DO EYECARE
// ===============================

let currentEyeCareFilter = 'none';
let currentEyeCareContrast = 100;
let currentEyeCareComfortMode = false;


// ===============================
// 2. SVG FILTERS DE DALTONISMO
// ===============================

const injectSVGFilters = () => {
  if (document.getElementById('eyecare-svg-filters')) return;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.id = "eyecare-svg-filters";
  svg.style.position = "absolute";
  svg.style.width = "0";
  svg.style.height = "0";
  svg.setAttribute("aria-hidden", "true");

  svg.innerHTML = `
    <defs>
      <filter id="protanopia-filter">
        <feColorMatrix
          type="matrix"
          values="0.567 0.433 0 0 0
                  0.558 0.442 0 0 0
                  0 0.242 0.758 0 0
                  0 0 0 1 0"
        />
      </filter>

      <filter id="deuteranopia-filter">
        <feColorMatrix
          type="matrix"
          values="0.625 0.375 0 0 0
                  0.7 0.3 0 0 0
                  0 0.3 0.7 0 0
                  0 0 0 1 0"
        />
      </filter>

      <filter id="tritanopia-filter">
        <feColorMatrix
          type="matrix"
          values="0.95 0.05 0 0 0
                  0 0.433 0.567 0 0
                  0 0.475 0.525 0 0
                  0 0 0 1 0"
        />
      </filter>
    </defs>
  `;

  document.body.appendChild(svg);
};


// ===============================
// 3. CONTRASTE SUAVE
// ===============================

const clampContrast = (value) => {
  return Math.min(130, Math.max(100, Number(value || 100)));
};

const hasColorblindFilter = () => {
  return currentEyeCareFilter && currentEyeCareFilter !== 'none';
};

const getSoftContrastValue = (contrastPercent) => {
  const clamped = clampContrast(contrastPercent);

  /*
    Sem filtro de daltonismo:
    100% -> contrast(1.00)
    130% -> contrast(1.15)

    Com filtro de daltonismo:
    100% -> contrast(1.00)
    130% -> contrast(1.06)

    Isso evita que YouTube, vídeos e páginas escuras estourem.
  */
  const maxBoost = hasColorblindFilter() ? 0.01 : 0.15;

  return 1 + ((clamped - 100) / 30) * maxBoost;
};


// ===============================
// 4. MONTA O FILTER FINAL
// ===============================

const buildEyeCareFilterValue = () => {
  const filters = [];
  const colorblindEnabled = hasColorblindFilter();

  if (colorblindEnabled) {
    filters.push(`url('#${currentEyeCareFilter}-filter')`);
  }

  if (currentEyeCareContrast && currentEyeCareContrast !== 100) {
    filters.push(`contrast(${getSoftContrastValue(currentEyeCareContrast)})`);

    /*
      Compensação leve.
      O filtro de daltonismo + contraste tende a escurecer demais.
      Esse brightness ajuda sem lavar a imagem.
    */
    if (colorblindEnabled) {
      filters.push('brightness(1.03)');
    }
  }

  if (currentEyeCareComfortMode) {
    filters.push('sepia(0.18)');
    filters.push('saturate(0.88)');
    filters.push('brightness(0.96)');
  }

  return filters.length ? filters.join(' ') : 'none';
};


// ===============================
// 5. APLICA NO SITE
// ===============================

const applyEyeCareVisualSettings = () => {
  injectSVGFilters();

  document.documentElement.style.transition = 'filter 180ms ease';
  document.documentElement.style.filter = buildEyeCareFilterValue();
};

const applyFilter = (type) => {
  currentEyeCareFilter = type || 'none';
  applyEyeCareVisualSettings();
};

const applyAccessibilitySettings = (settings = {}) => {
  currentEyeCareContrast = clampContrast(settings.contrast ?? 100);
  currentEyeCareComfortMode = Boolean(settings.comfortMode);

  applyEyeCareVisualSettings();
};


// ===============================
// 6. CARREGA CONFIGURAÇÕES SALVAS
// ===============================

chrome.storage.local.get(
  ['eyeCareFilter', 'eyeCareContrast', 'eyeCareComfortMode'],
  (result) => {
    currentEyeCareFilter = result.eyeCareFilter || 'none';
    currentEyeCareContrast = clampContrast(result.eyeCareContrast ?? 100);
    currentEyeCareComfortMode = Boolean(result.eyeCareComfortMode);

    applyEyeCareVisualSettings();
  }
);


// ===============================
// 7. RECEBE MENSAGENS DO POPUP
// ===============================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applyFilter") {
    applyFilter(request.type);
    sendResponse({ status: "success" });
    return true;
  }

  if (request.action === "applyAccessibilitySettings") {
    applyAccessibilitySettings(request.settings);
    sendResponse({ status: "success" });
    return true;
  }

  return false;
});