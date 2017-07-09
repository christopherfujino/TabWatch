chrome.tabs.query({}, function (arr) {
  let tabCount = '' + arr.length;
  chrome.browserAction.setBadgeText({
    text: tabCount
  });
  document.getElementById('tabCount').innerHTML = tabCount;
});
