const browser = window.browser || window.chrome;
browser.menus = browser.contextMenus;

const pennywiseUrl = "http://localhost:6280";
const menuItemId = "open-with-pennywise";

const iconSizes = [16, 32, 48];

const icons = iconSizes.reduce(
  (obj, num) => (obj[num] = `icon/pennywise-${num}.png`, obj), {}
);

const iconsInactive = iconSizes.reduce(
  (obj, num) => (obj[num] = `icon/pennywise-inactive-${num}.png`, obj), {}
);

var checker = setInterval(ping, 5000);

ping();

function ping() {
  fetch(pennywiseUrl, {
    method: "GET",
    mode: "no-cors"
  })
    .then(response => {
      browser.menus.remove(menuItemId, () => {
        browser.menus.create({
          id: menuItemId,
          title: "Open in pennywise",
          contexts: ["link"]
        });
      });
      browser.browserAction.setIcon({ path: icons })
      browser.browserAction.setPopup({ popup: "" })
    })
    .catch(error => {
      browser.menus.remove(menuItemId);
      browser.browserAction.setIcon({ path: iconsInactive })
      browser.browserAction.setPopup({ popup: "error.html" })
    });
}

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case menuItemId:
      openInPennywise(info.linkUrl)
      break;
  }
});


browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({ currentWindow: true, active: true },
    (tabs) => {
      openInPennywise(tabs[0].url);
    })
})


var openInPennywise = (url) => {
  fetch(pennywiseUrl + "?url=" + url, {
    method: "GET",
    mode: "no-cors"
  });
}