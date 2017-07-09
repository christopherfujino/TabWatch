chrome.tabs.query({}, function (arr) {
  let tabCount = '' + arr.length;
  document.getElementById('tabCount').innerHTML = tabCount;
});
