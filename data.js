/* js/modules/data.js
   Module: Product Data
   All product data lives here. In a real app this would be a fetch() API call.
   Having it in one module means you only update one file to change the catalog.
*/

const PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    price: 299.99,
    originalPrice: 399.99,
    emoji: '🎧',
    badge: 'sale',
    rating: 4.8,
    reviews: 1243,
    description: 'Immersive sound with industry-leading noise cancellation. Up to 30 hours battery life and foldable design for portability.',
    inStock: true,
    tags: ['audio', 'wireless', 'premium']
  },
  {
    id: '2',
    name: 'Mechanical Keyboard — TKL',
    category: 'Electronics',
    price: 149.00,
    originalPrice: null,
    emoji: '⌨️',
    badge: 'new',
    rating: 4.7,
    reviews: 876,
    description: 'Compact tenkeyless layout with tactile switches. Customizable RGB backlighting and detachable USB-C cable.',
    inStock: true,
    tags: ['keyboard', 'gaming', 'productivity']
  },
  {
    id: '3',
    name: 'Ultrawide Curved Monitor 34"',
    category: 'Electronics',
    price: 699.00,
    originalPrice: 849.00,
    emoji: '🖥️',
    badge: 'sale',
    rating: 4.9,
    reviews: 542,
    description: '34-inch ultrawide curved display with 144Hz refresh rate. Perfect for productivity and immersive gaming.',
    inStock: true,
    tags: ['monitor', 'ultrawide', 'gaming']
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: 449.00,
    originalPrice: null,
    emoji: '🪑',
    badge: 'hot',
    rating: 4.6,
    reviews: 2104,
    description: 'Lumbar support, adjustable armrests, and breathable mesh back. Designed for 8+ hour comfort.',
    inStock: true,
    tags: ['chair', 'ergonomic', 'office']
  },
  {
    id: '5',
    name: 'Minimalist Leather Wallet',
    category: 'Accessories',
    price: 59.99,
    originalPrice: null,
    emoji: '👛',
    badge: null,
    rating: 4.5,
    reviews: 3287,
    description: 'Slim profile genuine leather wallet. Holds up to 8 cards with RFID blocking technology.',
    inStock: true,
    tags: ['wallet', 'leather', 'accessories']
  },
  {
    id: '6',
    name: 'Smart Fitness Watch',
    category: 'Wearables',
    price: 249.00,
    originalPrice: 299.00,
    emoji: '⌚',
    badge: 'sale',
    rating: 4.7,
    reviews: 1897,
    description: 'Track heart rate, sleep, and 40+ workout modes. 7-day battery with always-on display.',
    inStock: true,
    tags: ['watch', 'fitness', 'smart']
  },
  {
    id: '7',
    name: 'Portable Bluetooth Speaker',
    category: 'Electronics',
    price: 89.99,
    originalPrice: null,
    emoji: '🔊',
    badge: 'new',
    rating: 4.4,
    reviews: 672,
    description: 'Waterproof IPX7 rating, 360° sound, and 20-hour playtime. Perfect companion for outdoors.',
    inStock: true,
    tags: ['speaker', 'bluetooth', 'outdoor']
  },
  {
    id: '8',
    name: 'Standing Desk — Electric',
    category: 'Furniture',
    price: 549.00,
    originalPrice: 699.00,
    emoji: '🪵',
    badge: 'sale',
    rating: 4.8,
    reviews: 934,
    description: 'Dual motor electric height adjustment. Bamboo surface, cable management tray, programmable presets.',
    inStock: true,
    tags: ['desk', 'standing', 'ergonomic']
  },
  {
    id: '9',
    name: 'Premium Webcam 4K',
    category: 'Electronics',
    price: 179.99,
    originalPrice: null,
    emoji: '📷',
    badge: null,
    rating: 4.6,
    reviews: 451,
    description: '4K/30fps with Sony sensor, built-in ring light, and AI-powered autofocus. Studio quality from home.',
    inStock: true,
    tags: ['webcam', 'streaming', 'remote work']
  },
  {
    id: '10',
    name: 'Ceramic Pour-Over Set',
    category: 'Kitchen',
    price: 48.00,
    originalPrice: null,
    emoji: '☕',
    badge: 'new',
    rating: 4.9,
    reviews: 2341,
    description: 'Hand-crafted ceramic dripper with stainless steel stand and reusable filter. Makes the perfect cup every time.',
    inStock: true,
    tags: ['coffee', 'kitchen', 'ceramics']
  },
  {
    id: '11',
    name: 'Noise-Isolating Earbuds',
    category: 'Electronics',
    price: 129.00,
    originalPrice: 159.00,
    emoji: '🎵',
    badge: 'sale',
    rating: 4.5,
    reviews: 1567,
    description: 'True wireless earbuds with 8mm drivers, 28 hours total battery, and IPX4 water resistance.',
    inStock: true,
    tags: ['earbuds', 'wireless', 'audio']
  },
  {
    id: '12',
    name: 'Desk Organizer Set',
    category: 'Accessories',
    price: 34.99,
    originalPrice: null,
    emoji: '🗂️',
    badge: null,
    rating: 4.3,
    reviews: 829,
    description: 'Bamboo desk organizer with phone holder, pen cup, and document sorter. Keeps your workspace tidy.',
    inStock: true,
    tags: ['organizer', 'desk', 'bamboo']
  }
];

// Get all unique categories
function getCategories() {
  return ['All', ...new Set(PRODUCTS.map(p => p.category))];
}

// Filter and sort products
function getProducts({ category = 'All', search = '', sort = 'default' } = {}) {
  let result = [...PRODUCTS];

  if (category !== 'All') {
    result = result.filter(p => p.category === category);
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }

  switch (sort) {
    case 'price-asc':   result.sort((a, b) => a.price - b.price); break;
    case 'price-desc':  result.sort((a, b) => b.price - a.price); break;
    case 'rating':      result.sort((a, b) => b.rating - a.rating); break;
    case 'reviews':     result.sort((a, b) => b.reviews - a.reviews); break;
  }

  return result;
}

// Get one product by ID
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

// Generate star string from rating
function getStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}
