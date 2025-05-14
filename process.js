async function send_message(tab_id, message) {
   try {
      await browser.tabs.sendMessage(tab_id, {
         action: message,
      });
   } catch (error) {
      console.error("Failed to send message: ", error);
   }
}

browser.browserAction.onClicked.addListener(async (tab) => {
   const { markedSites = [] } = await browser.storage.local.get("markedSites");
   const url = new URL(tab.url).hostname;

   if (!url) return;

   if (markedSites.includes(url)) {
      await send_message(tab.id, "resetBackground");
      const updated = markedSites.filter((site) => site !== url);
      await browser.storage.local.set({ markedSites: updated });
   } else {
      await send_message(tab.id, "setBackground");
      markedSites.push(url);
      await browser.storage.local.set({ markedSites });
   }
});
