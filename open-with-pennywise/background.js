const browser = window.browser || window.chrome;
browser.menus = browser.contextMenus;

const pennywiseUrl = "http://localhost:6280";
const menuItemId = "open-with-pennywise";

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
    })
    .catch(error => {
      browser.menus.remove(menuItemId);
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