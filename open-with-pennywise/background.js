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
      fetch(pennywiseUrl + "?url=" + info.linkUrl, {
        method: "GET",
        mode: "no-cors"
      });

      break;
  }
});
