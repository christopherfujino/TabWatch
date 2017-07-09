// could this be an event page rather than background?
// https://developer.chrome.com/extensions/event_pages

const colors = {
  green: '#008744',
  blue: '#0057e7',
  red: '#d62d20',
  yellow: '#ffa700',
  white: '#ffffff'
}

function updateBadge () {
  chrome.tabs.query({}, function (tabs) {
    chrome.browserAction.setBadgeText({
      text: '' + tabs.length
    });
  }); // query onLoad
}

updateBadge();  // onLoad
chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);
chrome.tabs.onDetached.addListener(updateBadge);
chrome.tabs.onAttached.addListener(updateBadge);
