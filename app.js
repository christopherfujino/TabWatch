chrome.tabs.query({}, function (arr) {
  let count = '' + arr.length;

  chrome.browserAction.setBadgeText(count);
  document.getElementById('tabCount').innerHTML = count;
});
