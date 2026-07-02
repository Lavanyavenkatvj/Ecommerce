/* js/modules/ui.js
   Module: UI Utilities
   Theme toggle, mobile nav, and global UI setup.
*/

function setupTheme() {
  const btn   = document.getElementById('theme-toggle');
  let theme   = localStorage.getItem('shopfront_theme') || 'dark';

  function applyTheme(t) {
    theme = t;
    localStorage.setItem('shopfront_theme', t);
    if (t === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    btn?.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }

  applyTheme(theme);
  btn?.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
}

function setupMobileNav() {
  const toggle  = document.getElementById('nav-toggle');
  const navList = document.getElementById('primary-nav');

  toggle?.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close nav when a link is clicked
  navList?.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      navList.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

// Dynamic footer year
function setupFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  footer.innerHTML = `
    <p>
      &copy; ${new Date().getFullYear()} ShopFront.
      Built with semantic HTML5, CSS3 &amp; vanilla JavaScript.
      <br>
      <a href="#/about">About</a> &middot;
      <a href="#/catalog">Catalog</a>
    </p>
  `;
}
