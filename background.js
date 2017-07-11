// could this be an event page rather than background?
// https://developer.chrome.com/extensions/event_pages

// load/set chrome.sync settings
const currentVersion = [0, 5, 1];
//chrome.storage.sync.set({ tabScope: 'window', tabLimit: '5', version: currentVersion }, updateBadge);
//*
chrome.storage.sync.get(['tabScope', 'tabLimit', 'version'], function (res) {
  if (!res.tabScope || !res.tabLimit || res.version[0] < currentVersion[0] || res.version[1] < currentVersion[1]) {
    chrome.storage.sync.set({
      'tabScope' : 'window',
      'tabLimit' : '5',
      'version' : currentVersion
    }, updateBadge);
  } else {
    updateBadge();
  }
});
//*/
const colors = {
  green: '#008744',
  blue: '#0057e7',
  red: '#d62d20',
  yellow: '#ffa700',
  white: '#ffffff'
}

function windowUpdate (limit, tabs) {
  let color, length = tabs.length;
  if (tabs.length < limit) color = colors.green;
  else if (length === limit) color = colors.yellow;
  else color = colors.red;

  tabs.forEach(function (tab) {
    chrome.browserAction.setBadgeText({
      text: '' + length,
      tabId: tab.id
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color: color,
      tabId: tab.id
    });
  })
}

function updateBadge () {
  chrome.storage.sync.get(['tabScope', 'tabLimit'], function (res) {
    let config = {};
    
    let limit = parseInt(res.tabLimit, 10);
    let winUpdate = windowUpdate.bind(null, limit);
    if (res.tabScope === 'window') {
      chrome.windows.getAll({populate: true, windowTypes: ['normal']}, function (windows) {
        windows.forEach(function (win) {
          chrome.tabs.query({windowId: win.id}, winUpdate);
        })
      })
    } else {
      chrome.tabs.query({}, winUpdate);
    }
  });
}

chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);
chrome.tabs.onDetached.addListener(updateBadge);
chrome.tabs.onAttached.addListener(updateBadge);

// can we remove this?
chrome.windows.onFocusChanged.addListener(updateBadge);
