# ShopFront — Capstone Project (Task 5)

A modular, client-side e-commerce product catalog built with semantic HTML5, CSS3, and vanilla JavaScript.

## Features
- ✅ Client-side routing (hash-based, no server required)
- ✅ Modular JavaScript architecture (5 separate modules)
- ✅ Full product catalog with search, filter, and sort
- ✅ Product detail pages
- ✅ Shopping cart with localStorage persistence
- ✅ Light / dark theme toggle
- ✅ Fully responsive (mobile-first)
- ✅ Accessible (ARIA, skip link, focus management)

## Project Structure
```
shopfront/
├── index.html              # App shell (single HTML entry point)
├── netlify.toml            # Netlify deployment config
├── vercel.json             # Vercel deployment config
├── css/
│   ├── reset.css           # Browser normalization
│   ├── tokens.css          # Design tokens (colors, fonts, spacing)
│   ├── layout.css          # Header, nav, footer, page grid
│   ├── components.css      # Reusable UI components
│   └── pages.css           # Page-specific styles
└── js/
    ├── app.js              # Entry point — initializes all modules
    └── modules/
        ├── data.js         # Product data + filter/sort logic
        ├── cart.js         # Cart state + localStorage + drawer UI
        ├── router.js       # Client-side hash router
        ├── pages.js        # Page renderers (Home, Catalog, Detail, About, 404)
        └── ui.js           # Theme toggle, mobile nav, footer
```

## How to run locally
1. Open `index.html` with VS Code Live Server
2. Navigate between pages using the nav links

## How to deploy (Netlify — recommended, free)
1. Create a free account at https://netlify.com
2. Drag and drop the `shopfront` folder onto the Netlify dashboard
3. Done — you'll get a live URL in under 60 seconds

## How to deploy (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` inside the `shopfront` folder
3. Follow the prompts — choose defaults

## How to deploy (GitHub + Netlify auto-deploy)
1. Push this folder to a GitHub repository
2. In Netlify: New site → Import from GitHub → select your repo
3. Build command: (leave empty)
4. Publish directory: `.`
5. Click Deploy
