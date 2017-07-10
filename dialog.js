const navLinks = document.getElementById('navLinks');
const tabPicker = document.getElementById('tabPicker');

chrome.storage.sync.get(['tabLimit', 'tabScope'], function (res) {
  tabPicker.value = res.tabLimit;
  document.querySelector(`input[value="${res.tabScope}"]`).value = res.tabScope;
});

const updateBadge = chrome.extension.getBackgroundPage().updateBadge;

tabPicker.addEventListener('input', function (e) {
  const limit = e.target.value;
  chrome.storage.sync.set({tabLimit: limit}, updateBadge);
});

document.querySelectorAll('input[name="tabScope"]').forEach(function (radio) {
  radio.addEventListener('change', function (e) {
    let scope = this.value;
    chrome.storage.sync.set({tabScope: scope}, updateBadge);
  })
})

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
