// could this be an event page rather than background?
// https://developer.chrome.com/extensions/event_pages

// load/set chrome.sync settings
const currentVersion = [0, 4, 0];
//chrome.storage.sync.set({ tabScope: 'window', tabLimit: '5', version: currentVersion }, updateBadge);
chrome.storage.sync.get(['tabScope', 'tabLimit', 'version'], function (res) {
  if (!res.tabScope || !res.tabLimit) {
    chrome.storage.sync.set({
      'tabScope' : 'window',
      'tabLimit' : '5'
    }, updateBadge);
  } else {
    updateBadge();
  }
});

const colors = {
  green: '#008744',
  blue: '#0057e7',
  red: '#d62d20',
  yellow: '#ffa700',
  white: '#ffffff'
}

function updateBadge () {
  chrome.storage.sync.get(['tabScope', 'tabLimit'], function (res) {
    console.log(res);
    let config = {};
    if (res.tabScope === 'window') config.currentWindow = true;

    chrome.tabs.query(config, function (tabs) {
      chrome.browserAction.setBadgeText({
        text: '' + tabs.length
      });
      let color;
      limit = parseInt(res.tabLimit, 10);
      if (tabs.length < limit) color = colors.green;
      else if (tabs.length === limit) color = colors.yellow;
      else color = colors.red;
      chrome.browserAction.setBadgeBackgroundColor({
        color: color
      });
    });
  })
}

chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);
chrome.tabs.onDetached.addListener(updateBadge);
chrome.tabs.onAttached.addListener(updateBadge);

// can we remove this?
chrome.windows.onFocusChanged.addListener(updateBadge);
