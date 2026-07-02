/* js/modules/pages.js
   Module: Page Renderers
   Each function builds a page's HTML string and injects it into #app.
   This is client-side rendering without a framework.
*/

// ============================================================
// HOME PAGE
// ============================================================
function renderHome() {
  const featured = getProducts().slice(0, 4);

  document.getElementById('app').innerHTML = `
    <!-- HERO -->
    <section class="hero-section" aria-labelledby="hero-heading">
      <div class="page-wrapper">
        <div class="hero-grid">
          <div class="hero-text">
            <p class="hero-eyebrow">New arrivals &amp; deals</p>
            <h1 class="hero-title" id="hero-heading">
              Shop smarter.<br><span>Not harder.</span>
            </h1>
            <p class="hero-sub">Discover curated products with transparent pricing, honest reviews, and fast delivery. No dark patterns.</p>
            <div class="hero-actions">
              <a href="#/catalog" class="btn btn-primary">Browse catalog</a>
              <a href="#/about" class="btn btn-ghost">Our story</a>
            </div>
          </div>
          <div class="hero-visual" aria-hidden="true">
            ${featured.map(p => `
              <div class="hero-card-mini">
                <div class="icon">${p.emoji}</div>
                <div class="label">${p.name.split(' ').slice(0, 2).join(' ')}</div>
                <div class="price">$${p.price}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section aria-labelledby="features-heading">
      <div class="page-wrapper">
        <div class="section-header">
          <div>
            <h2 class="section-title" id="features-heading">Why ShopFront?</h2>
            <p class="section-sub">We built the shopping experience we always wanted.</p>
          </div>
        </div>
        <div class="features-grid">
          ${[
            { icon: '🚀', title: 'Fast Delivery', desc: 'Free shipping on orders over $50. Most orders delivered in 2 business days.' },
            { icon: '🔒', title: 'Secure Checkout', desc: 'End-to-end encrypted payments. We never store your card details.' },
            { icon: '↩️', title: '30-Day Returns', desc: 'No questions asked. If it\'s not right, we\'ll sort it out immediately.' },
            { icon: '💬', title: 'Real Support', desc: 'Talk to an actual human, not a bot. Available Mon–Sat, 9am–6pm.' },
          ].map(f => `
            <article class="feature-card">
              <span class="feature-icon" aria-hidden="true">${f.icon}</span>
              <div>
                <h3 class="feature-title">${f.title}</h3>
                <p class="feature-desc">${f.desc}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section aria-labelledby="featured-heading">
      <div class="page-wrapper">
        <div class="section-header">
          <div>
            <h2 class="section-title" id="featured-heading">Featured Products</h2>
            <p class="section-sub">Handpicked by our team this week.</p>
          </div>
          <a href="#/catalog" class="btn btn-ghost btn-sm">View all →</a>
        </div>
        <ul class="product-grid" role="list">
          ${featured.map(p => renderProductCard(p)).join('')}
        </ul>
      </div>
    </section>
  `;

  // Attach add-to-cart handlers
  attachAddToCartHandlers();
}

// ============================================================
// CATALOG PAGE
// ============================================================
function renderCatalog(params, options = {}) {
  const categories = getCategories();
  const activeCategory = options.category || 'All';
  const searchVal      = options.search   || '';
  const sortVal        = options.sort     || 'default';
  const products       = getProducts({ category: activeCategory, search: searchVal, sort: sortVal });

  document.getElementById('app').innerHTML = `
    <div class="page-wrapper">
      <h1 class="section-title" style="margin-bottom:1.5rem">Product Catalog</h1>

      <!-- TOOLBAR -->
      <div class="catalog-toolbar" role="search">
        <div class="search-wrap">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <label for="catalog-search" class="sr-only">Search products</label>
          <input
            type="search"
            id="catalog-search"
            placeholder="Search products..."
            value="${escapeHtml(searchVal)}"
            aria-label="Search products"
          >
        </div>

        <label for="sort-select" class="sr-only">Sort by</label>
        <select id="sort-select" aria-label="Sort products by">
          <option value="default"    ${sortVal==='default'    ? 'selected':''}>Featured</option>
          <option value="price-asc"  ${sortVal==='price-asc'  ? 'selected':''}>Price: Low → High</option>
          <option value="price-desc" ${sortVal==='price-desc' ? 'selected':''}>Price: High → Low</option>
          <option value="rating"     ${sortVal==='rating'     ? 'selected':''}>Top Rated</option>
          <option value="reviews"    ${sortVal==='reviews'    ? 'selected':''}>Most Reviewed</option>
        </select>

        <span class="catalog-count" aria-live="polite">${products.length} product${products.length !== 1 ? 's' : ''}</span>
      </div>

      <!-- CATEGORY FILTERS -->
      <nav aria-label="Filter by category">
        <ul class="filter-tags" role="list">
          ${categories.map(cat => `
            <li>
              <button
                class="tag ${cat === activeCategory ? 'active' : ''}"
                data-category="${cat}"
                aria-pressed="${cat === activeCategory}"
              >${cat}</button>
            </li>
          `).join('')}
        </ul>
      </nav>

      <!-- PRODUCT GRID -->
      ${products.length > 0
        ? `<ul class="product-grid" role="list">${products.map(p => renderProductCard(p)).join('')}</ul>`
        : `<div class="cart-empty" role="status" style="padding:4rem 1rem;text-align:center">
             <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
             <p style="font-weight:600;margin-bottom:0.5rem">No products found</p>
             <p style="color:var(--text-muted);font-size:0.88rem">Try a different search or category</p>
           </div>`
      }
    </div>
  `;

  attachAddToCartHandlers();

  // Live search
  const searchInput = document.getElementById('catalog-search');
  let searchDebounce;
  searchInput?.addEventListener('input', () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      renderCatalog({}, { category: activeCategory, search: searchInput.value, sort: document.getElementById('sort-select')?.value });
    }, 300);
  });

  // Sort change
  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    renderCatalog({}, { category: activeCategory, search: searchInput?.value || '', sort: e.target.value });
  });

  // Category filter
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      renderCatalog({}, { category: btn.dataset.category, search: searchInput?.value || '', sort: document.getElementById('sort-select')?.value });
    });
  });
}

// ============================================================
// PRODUCT DETAIL PAGE
// ============================================================
function renderProductDetail({ id }) {
  const product = getProductById(id);

  if (!product) {
    render404();
    return;
  }

  document.getElementById('app').innerHTML = `
    <div class="page-wrapper">
      <!-- BREADCRUMB -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="#/">Home</a>
        <span aria-hidden="true">›</span>
        <a href="#/catalog">Catalog</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">${escapeHtml(product.name)}</span>
      </nav>

      <div class="detail-grid">
        <!-- PRODUCT IMAGE -->
        <div class="detail-thumb" aria-hidden="true">${product.emoji}</div>

        <!-- PRODUCT INFO -->
        <div class="detail-info">
          <p class="detail-category">${product.category}</p>
          <h1 class="detail-title">${escapeHtml(product.name)}</h1>

          <div class="rating" aria-label="Rated ${product.rating} out of 5 from ${product.reviews} reviews">
            <span class="stars" aria-hidden="true">${getStars(product.rating)}</span>
            <span>${product.rating}</span>
            <span class="rating-count">(${product.reviews.toLocaleString()} reviews)</span>
          </div>

          <div class="detail-price">
            $${product.price.toFixed(2)}
            ${product.originalPrice ? `<span class="product-price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>

          <p class="detail-desc">${escapeHtml(product.description)}</p>

          <div class="detail-meta">
            <span>Category: <strong>${product.category}</strong></span>
            <span>Availability: <strong style="color:var(--accent-alt)">${product.inStock ? 'In Stock ✓' : 'Out of Stock'}</strong></span>
            <span>Tags: <strong>${product.tags.join(', ')}</strong></span>
          </div>

          <div class="detail-actions">
            <button class="btn btn-primary" id="detail-add-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
              🛒 Add to Cart
            </button>
            <a href="#/catalog" class="btn btn-ghost">← Back to Catalog</a>
          </div>
        </div>
      </div>

      <!-- RELATED PRODUCTS -->
      <section aria-labelledby="related-heading" style="margin-top:3rem">
        <div class="section-header">
          <h2 class="section-title" id="related-heading">More in ${product.category}</h2>
        </div>
        <ul class="product-grid" role="list">
          ${getProducts({ category: product.category })
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map(p => renderProductCard(p))
              .join('')}
        </ul>
      </section>
    </div>
  `;

  // Detail page add to cart
  document.getElementById('detail-add-cart')?.addEventListener('click', () => {
    addToCart(product);
  });

  attachAddToCartHandlers();
}

// ============================================================
// ABOUT PAGE
// ============================================================
function renderAbout() {
  document.getElementById('app').innerHTML = `
    <!-- HERO -->
    <section class="about-hero" aria-labelledby="about-heading">
      <h1 id="about-heading">Built by people who love good products</h1>
      <p>ShopFront started because we were frustrated by cluttered stores, fake reviews, and dark patterns. We built something honest instead.</p>
    </section>

    <div class="page-wrapper">
      <!-- STATS -->
      <section aria-labelledby="stats-heading">
        <h2 class="section-title" id="stats-heading" style="margin-bottom:1rem">By the numbers</h2>
        <div class="stats-row">
          ${[
            { number: '12K+', label: 'Happy customers' },
            { number: '200+', label: 'Curated products' },
            { number: '4.8★', label: 'Average rating' },
            { number: '2 days', label: 'Avg. delivery time' },
          ].map(s => `
            <div class="stat-card">
              <span class="stat-number">${s.number}</span>
              <span class="stat-label">${s.label}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- TEAM -->
      <section aria-labelledby="team-heading" style="margin-top:3rem">
        <h2 class="section-title" id="team-heading" style="margin-bottom:1rem">The team</h2>
        <div class="team-grid">
          ${[
            { avatar: '👩‍💻', name: 'Jane Doe',     role: 'Founder & Developer' },
            { avatar: '👨‍🎨', name: 'Alex Park',    role: 'Design Lead' },
            { avatar: '👩‍📦', name: 'Sara Chen',    role: 'Head of Logistics' },
            { avatar: '👨‍💼', name: 'Omar Hassan',  role: 'Product Curation' },
          ].map(m => `
            <article class="team-card">
              <div class="team-avatar" aria-hidden="true">${m.avatar}</div>
              <h3 class="team-name">${m.name}</h3>
              <p class="team-role">${m.role}</p>
            </article>
          `).join('')}
        </div>
      </section>

      <section style="margin-top:3rem;max-width:65ch">
        <h2 class="section-title" style="margin-bottom:1rem">Our commitment</h2>
        <p style="color:var(--text-muted);line-height:1.9;margin-bottom:1rem">
          Every product in our catalog is personally tested or verified by our curation team. We don't accept paid placements — if it's here, it earned its spot.
        </p>
        <p style="color:var(--text-muted);line-height:1.9">
          We publish supplier information, fair trade certifications, and honest descriptions including known limitations. Shopping here should feel like getting advice from a knowledgeable friend.
        </p>
      </section>
    </div>
  `;
}

// ============================================================
// 404 PAGE
// ============================================================
function render404() {
  document.getElementById('app').innerHTML = `
    <div class="not-found" role="main">
      <div class="not-found-code" aria-hidden="true">404</div>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <a href="#/" class="btn btn-primary">← Go home</a>
    </div>
  `;
}

// ============================================================
// SHARED: product card HTML
// ============================================================
function renderProductCard(product) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const savePct     = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return `
    <li class="product-card" role="listitem">
      <a href="#/product/${product.id}" class="product-thumb-link" aria-label="View ${product.name}">
        <div class="product-thumb">
          <span aria-hidden="true">${product.emoji}</span>
          ${product.badge ? `<span class="product-badge ${product.badge}" aria-label="${product.badge} item">${product.badge === 'sale' ? `−${savePct}%` : product.badge}</span>` : ''}
        </div>
      </a>
      <div class="product-body">
        <p class="product-category">${product.category}</p>
        <h2 class="product-name">
          <a href="#/product/${product.id}">${escapeHtml(product.name)}</a>
        </h2>
        <p class="product-desc">${escapeHtml(product.description.substring(0, 90))}…</p>
        <div class="rating" aria-label="${product.rating} stars from ${product.reviews} reviews">
          <span class="stars" aria-hidden="true">${getStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews.toLocaleString()})</span>
        </div>
      </div>
      <div class="product-footer">
        <div>
          <span class="product-price">$${product.price.toFixed(2)}</span>
          ${hasDiscount ? `<span class="product-price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">
          + Cart
        </button>
      </div>
    </li>
  `;
}

// ============================================================
// SHARED: attach add-to-cart handlers to .add-to-cart-btn buttons
// ============================================================
function attachAddToCartHandlers() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = getProductById(btn.dataset.id);
      if (product) addToCart(product);
    });
  });
}

// XSS prevention
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}
