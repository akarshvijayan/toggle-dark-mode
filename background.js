const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();

const runExtension = () => {
  const browserAction = chrome.browserAction || chrome.action;
  browserAction.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id ?? 0 },
          func: function () {
            const body = document.body;
            const overlay = document.createElement("div");
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
}

chrome.runtime.onStartup.addListener(runExtension);
chrome.runtime.onInstalled.addListener(runExtension);
