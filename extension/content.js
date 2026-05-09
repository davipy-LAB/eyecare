// Injects SVG filters into the page and applies the selected color blindness simulation filter
const injectSVGFilters = () => {
  if (document.getElementById('eyecare-svg-filters')) return;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = "eyecare-svg-filters";
  // Em vez de display none, usar position absolute evita bugs em alguns sites
  svg.style.position = "absolute"; 
  svg.style.width = "0";
  svg.style.height = "0";
  svg.setAttribute("aria-hidden", "true");

  // My SVG filters for color blindness simulation
  svg.innerHTML = `
    <defs>
      <filter id="protanopia-filter">
          <feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"/>
      </filter>
      <filter id="deuteranopia-filter">
          <feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"/>
      </filter>
      <filter id="tritanopia-filter">
          <feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"/>
      </filter>
    </defs>`;
  
  document.body.appendChild(svg);
};

const applyFilter = (type) => {
  if (type === 'none') {
    document.documentElement.style.filter = "none";
  } else {
    document.documentElement.style.filter = `url('#${type}-filter')`;
  }
};

// 1. Apllying the saved filter on page load
chrome.storage.local.get(['eyeCareFilter'], (result) => {
  if (result.eyeCareFilter) {
    injectSVGFilters();
    applyFilter(result.eyeCareFilter);
  }
});

// 2. Listening for messages from popup.js to apply filter immediately
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applyFilter") {
    injectSVGFilters();
    applyFilter(request.type);
    sendResponse({status: "success"}); // Responde pra evitar erro de porta fechada
  }
});