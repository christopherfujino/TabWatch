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
