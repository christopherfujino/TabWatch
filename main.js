// could this be an event page rather than background?
// https://developer.chrome.com/extensions/event_pages
let limit = 5;

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
    let color;
    if (tabs.length < limit) color = colors.green;
    else if (tabs.length === limit) color = colors.yellow;
    else color = colors.red;
    chrome.browserAction.setBadgeBackgroundColor({
      color: color
    })
  }); // query onLoad
}

updateBadge();  // onLoad
chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);
chrome.tabs.onDetached.addListener(updateBadge);
chrome.tabs.onAttached.addListener(updateBadge);
