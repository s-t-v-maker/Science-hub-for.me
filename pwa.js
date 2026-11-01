(() => {
  const button = document.getElementById("installBtn");
  if (!button) return;

  let installPrompt = null;
  const help = (message) => {
    button.title = message;
    button.setAttribute("aria-label", message);
  };

  const standalone = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  if (standalone()) {
    button.hidden = true;
    return;
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    button.hidden = false;
    help("Install Science Hub on your device");
  });

  button.addEventListener("click", async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const result = await installPrompt.userChoice;
      installPrompt = null;
      if (result && result.outcome === "accepted") button.hidden = true;
      return;
    }

    const isAppleMobile = /iphone|ipad|ipod/i.test(navigator.userAgent);
    help(isAppleMobile
      ? 'On iPhone/iPad: tap Share, then "Add to Home Screen".'
      : 'Open your browser menu and choose "Install app" or "Add to Home screen" if available.');
  });

  window.addEventListener("appinstalled", () => {
    button.hidden = true;
  });

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js", { scope: "./" })
        .catch((error) => console.error("Science Hub service worker:", error));
    });
  }
})();
