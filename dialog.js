const navLinks = document.getElementById('nav-links');

function getSectionFromNav (nav) {
  return document.getElementById(nav.getAttribute('data-section'));
}

navLinks.addEventListener('click', function (e) {
  target = e.target;
  if (target.nodeName !== 'LI' || target.classList.contains('active')) return;
  let lastNav = navLinks.querySelector('.active')
  lastNav.classList.remove('active');
  lastSection = getSectionFromNav(lastNav);
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
