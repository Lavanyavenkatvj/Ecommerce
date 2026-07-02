/* js/app.js
   Entry Point — initializes all modules in the correct order.
   Think of this as the "main()" of the application.

   Load order in index.html:
     data.js → cart.js → router.js → pages.js → ui.js → app.js (this file)
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. UI (theme + nav) — set up first so the page looks right immediately
  setupTheme();
  setupMobileNav();
  setupFooter();

  // 2. Cart — load saved cart from localStorage and set up drawer events
  loadCart();
  updateCartUI();
  setupCartEvents();

  // 3. Router — starts listening to hash changes and renders the first page
  setupRouter();
});
