chrome.runtime.onInstalled.addListener(() => {
  const browserAction = chrome.browserAction || chrome.action;
  browserAction.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id ?? 0 },
          func: function () {
            const body = document.body;
            body.style.backgroundColor = "lightblue";
            const overlay = document.createElement("div");
            overlay.textContent = 'Appended by the extension';
            const css = `
                            position: fixed;
                            pointer-events: none;
                            top: 0;
                            left: 0;
                            width: 100vw;
                            height: 100vh;
                            background-color: white;
                            mix-blend-mode: difference;
                            z-index: 1;
                        `;
            overlay.setAttribute("style", css);
            body.appendChild(overlay);
          },
        });
      } else {
        console.log("No active tab found.");
      }
    });
  });
});
