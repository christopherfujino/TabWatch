const navLinks = document.getElementById('nav-links');

let tabPicker = document.getElementById('tabPicker');
console.log(tabPicker);
chrome.storage.sync.get('tabLimit', function (res) {
  tabPicker.value = res.tabLimit;
});

tabPicker.addEventListener('input', function (e) {
  console.log(e.target);
  let value = e.target.value;
  let updateBadge = chrome.extension.getBackgroundPage().updateBadge;
  chrome.storage.sync.set({tabLimit: value},updateBadge);
});

function getSectionFromNav (nav) {
  return document.getElementById(nav.getAttribute('data-section'));
}

navLinks.addEventListener('click', function (e) {
  let target = e.target;
  if (target.nodeName !== 'LI' || target.classList.contains('active')) return;
  let lastNav = navLinks.querySelector('.active')
  lastNav.classList.remove('active');
  let lastSection = getSectionFromNav(lastNav);
  lastSection.classList.remove('active');
  target.classList.add('active'); // change styling of clicked nav el
  let nextSection = getSectionFromNav(target);
  nextSection.classList.add('active');
})

chrome.tabs.query({}, function (arr) {
  let tabCount = '' + arr.length;
  document.getElementById('globalTabCount').innerHTML = tabCount;
});

chrome.tabs.query({currentWindow: true}, function (arr) {
  let tabCount = '' + arr.length;
  document.getElementById('localTabCount').innerHTML = tabCount;
});
