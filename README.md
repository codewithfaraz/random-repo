# Hermes — E-Commerce Dashboard

A modern, real-time admin dashboard built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## ✨ Features

- 🎨 **Dark/Light Theme** — Smooth toggle with localStorage persistence
- 📊 **Dashboard** — Overview with metric cards, sales charts, and order status
- 🛍️ **Products** — Full product grid with filtering, sorting, search, carousels, flash sales, and slide-out cart
- 📦 **Orders** — Order management with search, filter, sort, pagination, and actions
- 👥 **Customers** — Customer directory with search, filter, and sort
- 💰 **Revenue & Finance** — Monthly/weekly revenue tracking with charts and quarterly summaries
- ⚙️ **Settings** — Profile, account, notifications, billing, and danger zone
- 🎠 **Hero Slider** — Full-width auto-rotating carousel on landing page
- 📱 **Responsive** — Works beautifully on mobile, tablet, and desktop

## 🛠️ Tech Stack

| Technology | Version |
|-----------|---------|
| Next.js | 16.2.6 |
| React | 19.2.4 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Recharts | 2.15.4 |
| Lucide React | 0.400.0 |
| Embla Carousel | React |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Home page with hero slider
│   ├── layout.tsx            # Root layout with font & theme
│   ├── globals.css           # Global styles & theme variables
│   ├── ThemeProvider.tsx     # Dark/light theme context
│   ├── ThemeToggle.tsx       # Theme toggle component
│   ├── dashboard/
│   │   ├── layout.tsx       # Dashboard shell with sidebar
│   │   ├── page.tsx         # Dashboard overview
│   │   ├── products/
│   │   │   └── page.tsx     # Products page full CRUD
│   │   ├── orders/
│   │   │   └── page.tsx     # Orders page with search/filter
│   │   ├── customers/
│   │   │   └── page.tsx     # Customers directory
│   │   ├── revenue/
│   │   │   └── page.tsx     # Revenue & finance analytics
│   │   └── settings/
│   │       └── page.tsx     # Settings & preferences
├── components/
│   ├── MetricCard.tsx       # Reusable KPI card
│   ├── RecentOrders.tsx     # Recent orders table
│   ├── SalesChart.tsx       # Recharts bar chart
│   ├── EditOrderModal.tsx   # Order edit modal
│   ├── DeleteConfirmModal.tsx # Delete confirmation
│   └── Carousel.tsx         # Embla carousel wrapper
├── next.config.ts           # Next.js configuration
└── package.json
```

## 🔥 What's Been Built

- [x] Hero slider with auto-play on landing page
- [x] Feature badges section
- [x] Trending products horizontal carousel
- [x] Shop by category grid
- [x] Newsletter subscription CTA
- [x] Full products page with grid, filters, search, sort, cart drawer
- [x] Products carousel in featured & flash sale sections
- [x] Orders page with table, search, filter, sort, pagination
- [x] Customers page with full directory table
- [x] Revenue & finance page with stats, charts, quarterly breakdown
- [x] Settings page with profile, account, notifications, billing, danger zone
- [x] Security headers in Next.js config
- [x] Image optimization configuration

## 📝 TODO

- [ ] Connect a real backend API
- [ ] Add database (SQLite/Prisma or Supabase)
- [ ] Add authentication (NextAuth.js)
- [ ] Add mobile hamburger menu for sidebar
- [ ] Write unit & E2E tests
- [ ] Add 404 and error pages
- [ ] Deploy to Vercel