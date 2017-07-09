chrome.tabs.query({}, function (arr) {
  let tabCount = '' + arr.length;
  document.getElementById('globalTabCount').innerHTML = tabCount;
});
