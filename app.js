chrome.tabs.query({}, function (arr) {
  arr.forEach(function (tab) {
    let span = document.getElementById('tabCount');
    let count = parseInt(span.innerHTML, 10);
    if (isNaN(count)) count = 0;
    span.innerHTML = ++count;
  });
});
