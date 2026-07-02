/* js/modules/cart.js
   Module: Shopping Cart
   Manages cart state, persists to localStorage, updates the UI drawer.
*/

const CART_KEY = 'shopfront_cart';

// Internal cart state
let cartItems = [];

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    cartItems = saved ? JSON.parse(saved) : [];
  } catch (e) {
    cartItems = [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

function addToCart(product) {
  const existing = cartItems.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`${product.emoji} ${product.name} added to cart`);
}

function removeFromCart(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
}

function getCartCount() {
  return cartItems.reduce((sum, i) => sum + i.qty, 0);
}

function getCartTotal() {
  return cartItems.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);
}

function updateCartUI() {
  // Update count badge on cart button
  const countEl = document.getElementById('cart-count');
  const count   = getCartCount();
  if (countEl) {
    countEl.textContent = count;
    countEl.classList.toggle('visible', count > 0);
  }

  // Update cart button aria-label
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) cartBtn.setAttribute('aria-label', `Open cart, ${count} item${count !== 1 ? 's' : ''}`);

  // Re-render cart drawer contents
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  if (cartItemsEl) {
    if (cartItems.length === 0) {
      cartItemsEl.innerHTML = `
        <div class="cart-empty" role="status">
          <div class="cart-empty-icon" aria-hidden="true">🛒</div>
          <p>Your cart is empty</p>
          <p style="font-size:0.82rem;color:var(--text-muted);margin-top:0.4rem">Add some products to get started</p>
        </div>`;
    } else {
      cartItemsEl.innerHTML = cartItems.map(item => `
        <div class="cart-item" role="listitem">
          <span class="cart-item-icon" aria-hidden="true">${item.emoji}</span>
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.qty}</div>
          </div>
          <button class="cart-item-remove" data-remove="${item.id}" aria-label="Remove ${item.name} from cart">✕</button>
        </div>
      `).join('');

      // Delegated remove listeners
      cartItemsEl.querySelectorAll('[data-remove]').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
      });
    }
  }

  if (cartTotalEl) cartTotalEl.textContent = `$${getCartTotal()}`;
}

// Toast notification
let toastTimer;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = `toast ${type} visible`;
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// Cart drawer open/close
function openCart() {
  const drawer  = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer) return;
  drawer.removeAttribute('hidden');
  overlay.classList.add('visible');
  // Trap focus on close button
  document.getElementById('cart-close')?.focus();
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer  = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer) return;
  drawer.setAttribute('hidden', '');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
  document.getElementById('cart-btn')?.focus();
}

function setupCartEvents() {
  document.getElementById('cart-btn')?.addEventListener('click', openCart);
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    showToast('🎉 Checkout coming soon! This is a demo.', 'success');
    closeCart();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });
}
