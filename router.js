/* js/modules/router.js
   Module: Client-Side Router
   Uses the URL hash (#) for routing — no server config needed,
   works on Netlify/Vercel/Render out of the box with no setup.

   Routes:
     #/           → Home page
     #/catalog    → Product catalog (with filter/search)
     #/product/ID → Product detail page
     #/about      → About page
     *            → 404 Not found
*/

const routes = {
  '/':            'renderHome',
  '/catalog':     'renderCatalog',
  '/about':       'renderAbout',
  '/product/:id': 'renderProductDetail',
};

// Parse the current hash into a route + params
function parseRoute(hash) {
  const path = hash.replace(/^#/, '') || '/';

  // Check static routes first
  if (routes[path]) {
    return { handler: routes[path], params: {} };
  }

  // Check dynamic routes (e.g. /product/:id)
  for (const pattern of Object.keys(routes)) {
    if (!pattern.includes(':')) continue;
    const regexStr = '^' + pattern.replace(/:([^/]+)/g, '(?<$1>[^/]+)') + '$';
    const match    = path.match(new RegExp(regexStr));
    if (match) {
      return { handler: routes[pattern], params: match.groups || {} };
    }
  }

  return { handler: 'render404', params: {} };
}

// Navigate to a route by setting the hash
function navigate(path) {
  window.location.hash = path;
}

// Called on every hashchange — renders the matching page
async function handleRoute() {
  const hash   = window.location.hash || '#/';
  const { handler, params } = parseRoute(hash);
  const app    = document.getElementById('app');

  // Show spinner while rendering
  app.innerHTML = `<div class="page-loading"><div class="spinner" aria-hidden="true"></div></div>`;

  // Small delay to show spinner on fast renders (feels more professional)
  await new Promise(r => setTimeout(r, 80));

  // Call the page renderer — all defined in pages.js
  if (typeof window[handler] === 'function') {
    window[handler](params);
  } else {
    window.render404();
  }

  // Scroll to top on navigation
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update active nav link
  updateNavLinks(hash);
}

function updateNavLinks(hash) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    const isActive =
      (href === '#/' && (hash === '#/' || hash === '#' || hash === '')) ||
      (href !== '#/' && hash.startsWith(href));
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

function setupRouter() {
  window.addEventListener('hashchange', handleRoute);
  // Handle initial page load
  handleRoute();
}
