const buttons = document.querySelectorAll('button');

// Carrega o filtro atual ao abrir o popup
chrome.storage.local.get(['eyeCareFilter'], (result) => {
  if (result.eyeCareFilter) {
    document.getElementById(result.eyeCareFilter).classList.add('active');
  }
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filterId = btn.id;

    // 1. Salva no Storage
    chrome.storage.local.set({ eyeCareFilter: filterId });

    // 2. Remove classe active de todos e bota no clicado
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 3. Avisa a aba atual para aplicar o filtro imediatamente
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "applyFilter", type: filterId });
    });
  });
});