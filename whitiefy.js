const default_background_value = document.body.style.background;

browser.runtime.onMessage.addListener((msg) => {
   if (msg.action === "setBackground") {
      document.body.style.background = "white";
   } else if (msg.action === "resetBackground") {
      document.body.style.background = default_background_value;
   }
   //return;
});

browser.storage.local.get("markedSites").then(async ({ markedSites = [] }) => {
   const current_url = window.location.hostname;
   console.log(current_url);
   if (markedSites.includes(current_url)) {
      document.body.style.background = "white";
   }
});
