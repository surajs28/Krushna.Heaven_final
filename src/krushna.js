const root = document.documentElement;
const trigger = document.querySelector('.menu-trigger');
const overlay = document.querySelector('.menu-overlay');
const header = document.querySelector('[data-header]');

function setMenu(open) {
  root.classList.toggle('menu-open', open);
  trigger?.setAttribute('aria-expanded', String(open));
  trigger?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  overlay?.setAttribute('aria-hidden', String(!open));

  if (overlay) {
    if (open) overlay.removeAttribute('inert');
    else overlay.setAttribute('inert', '');
  }
}

trigger?.addEventListener('click', () => {
  setMenu(!root.classList.contains('menu-open'));
});

overlay?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && root.classList.contains('menu-open')) {
    setMenu(false);
    trigger?.focus();
  }
});

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
