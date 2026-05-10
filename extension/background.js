chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "eyeCarePause") {
    // 1. Busca o idioma salvo pelo usuário (ou padrão 'pt')
    chrome.storage.local.get(['userLanguage'], (result) => {
      const lang = result.userLanguage || 'pt';

      // 2. Busca o arquivo de tradução que você já tem na pasta locales
      fetch(chrome.runtime.getURL(`locales/${lang}/translation.json`))
        .then(response => response.json())
        .then(data => {
          // 3. Cria a notificação com os dados do JSON
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: data.pause_title || "Hora de descansar!", // Chave do seu JSON
            message: data.pause_desc || "Olhe para longe por 20 segundos.", // Chave do seu JSON
            priority: 2
          });
        })
        .catch(err => console.error("Erro na notificação:", err));
    });
  }
});

// Listening for messages from popup.js to start/stop the timer
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startTimer") {
    // Cria um alarme para tocar a cada 20 minutos
    chrome.alarms.create("eyeCarePause", { periodInMinutes: 20 }); // Use 20 for production, 0.1 for testing
    console.log("Lembretes de pausa ativados!");
  } else if (request.action === "stopTimer") {
    chrome.alarms.clear("eyeCarePause");
    console.log("Lembretes desativados.");
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTimeLeft") {
    chrome.alarms.get("eyeCarePause", (alarm) => {
      if (!alarm) {
        sendResponse({ timeLeft: null });
        return;
      }
      const millisLeft = alarm.scheduledTime - Date.now();
      const minutesLeft = Math.ceil(millisLeft / 1000 / 60);
      sendResponse({ timeLeft: minutesLeft });
    });
    return true; // keep the message channel open for sendResponse
  }
  // ... other actions if (startTimer, etc)
});