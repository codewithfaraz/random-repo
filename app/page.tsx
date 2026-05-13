import Link from "next/link";
import { Carousel } from "@/components/Carousel";
import { ShoppingBag, Package, Users, DollarSign, TrendingUp, Star, ArrowRight, Zap, Shield, Truck } from "lucide-react";

// ─── Hero Slide Data ────────────────────────────────────
const heroSlides = [
  {
    title: "Summer Sale is Live!",
    subtitle: "Up to 50% off on premium electronics & gadgets",
    cta: "Shop Now",
    bg: "from-violet-600 via-fuchsia-600 to-pink-600",
    icon: <Zap size={120} className="text-[var(--text-primary)]/20" />,
  },
  {
    title: "New Arrivals Just Dropped",
    subtitle: "Discover the latest in tech, fashion, and home essentials",
    cta: "Explore New",
    bg: "from-blue-600 via-cyan-500 to-teal-500",
    icon: <Package size={120} className="text-[var(--text-primary)]/20" />,
  },
  {
    title: "Free Shipping on Orders $50+",
    subtitle: "Fast, reliable delivery straight to your doorstep",
    cta: "Learn More",
    bg: "from-emerald-600 via-green-500 to-lime-500",
    icon: <Truck size={120} className="text-[var(--text-primary)]/20" />,
  },
];

// ─── Feature Cards ──────────────────────────────────────
const features = [
  { icon: <Shield size={28} />, title: "Secure Payments", desc: "256-bit SSL encrypted checkout" },
  { icon: <Truck size={28} />, title: "Fast Delivery", desc: "Free shipping on orders over $50" },
  { icon: <Star size={28} />, title: "Top Rated", desc: "4.8★ average customer rating" },
  { icon: <Users size={28} />, title: "24/7 Support", desc: "Always here to help you out" },
];

// ─── Trending Products ───────────────────────────────────
const trendingProducts = [
  { name: "Wireless Headphones", price: "$149.99", image: "🎧", rating: 4.8, reviews: 342 },
  { name: "Smart Watch Pro", price: "$299.00", image: "⌚", rating: 4.9, reviews: 218 },
  { name: "Laptop Stand", price: "$79.99", image: "💻", rating: 4.6, reviews: 567 },
  { name: "Mechanical Keyboard", price: "$129.99", image: "⌨️", rating: 4.7, reviews: 189 },
  { name: "USB-C Hub", price: "$45.50", image: "🔌", rating: 4.5, reviews: 401 },
  { name: "Noise Cancelling Earbuds", price: "$199.00", image: "🎵", rating: 4.8, reviews: 276 },
];

// ─── Category Cards ──────────────────────────────────────
const categories = [
  { name: "Electronics", icon: "⚡", count: 128 },
  { name: "Fashion", icon: "👕", count: 86 },
  { name: "Home & Garden", icon: "🏠", count: 64 },
  { name: "Sports", icon: "⚽", count: 42 },
  { name: "Books", icon: "📚", count: 256 },
  { name: "Beauty", icon: "💄", count: 73 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ═══════════════════════════════════════════
          HERO SECTION — Full-width slider
          ═══════════════════════════════════════════ */}
      <section className="relative w-full">
        <Carousel
          opts={{ loop: true, align: "center" }}
          arrows
          dots
          className="w-full"
        >
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className="relative flex min-h-[460px] w-full flex-col items-center justify-center px-8 text-center"
              style={{
                background: `linear-gradient(135deg, ${slide.bg})`,
              }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-[var(--surface)]/5 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-[var(--surface)]/5 blur-3xl" />
              </div>

              <div className="relative z-10 max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)]/70">
                  Limited Time Offer
                </p>
                <h1 className="mb-4 text-5xl font-black tracking-tighter text-[var(--text-primary)] sm:text-6xl md:text-7xl">
                  {slide.title}
                </h1>
                <p className="mb-8 max-w-lg text-lg text-[var(--text-primary)]/60 sm:text-xl">
                  {slide.subtitle}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-base font-bold text-[var(--text-primary)] shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    {slide.cta} <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/dashboard/products"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[var(--surface)]/10 px-8 py-4 text-base font-semibold text-[var(--text-primary)] backdrop-blur-sm transition-all hover:bg-[var(--surface)]/20"
                  >
                    Browse All
                  </Link>
                </div>
              </div>

              {/* Decorative icon */}
              <div className="absolute right-8 top-1/2 hidden lg:block -translate-y-1/2">
                {slide.icon}
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES — 4-column trust badges
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-8 text-center transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-[var(--hover-bg)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                {f.icon}
              </div>
              <h3 className="text-base font-bold tracking-tight text-[var(--text-primary)]">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--text-tertiary)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING PRODUCTS — Horizontal carousel
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              🔥 Trending Now
            </h2>
            <p className="mt-1 text-sm text-[var(--text-tertiary)]">
              Most popular products this week
            </p>
          </div>
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <Carousel opts={{ loop: true, align: "start", slidesToScroll: 2 }} arrows dots>
          {trendingProducts.map((product, i) => (
            <div key={i} className="min-w-[240px] max-w-[280px] px-2">
              <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-2xl hover:shadow-[var(--accent)]/5">
                <div className="flex aspect-square items-center justify-center bg-[var(--hover-bg)] text-6xl">
                  {product.image}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {product.name}
                    </h3>
                    <span className="text-sm font-bold text-[var(--accent)]">{product.price}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          size={12}
                          className={
                            s < Math.floor(product.rating)
                              ? "text-[var(--text-warning)] fill-[var(--warning)]"
                              : "text-[var(--text-tertiary)]"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[var(--text-tertiary)]">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <button className="mt-auto rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 py-2.5 text-sm font-semibold text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-[var(--text-primary)]">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* ═══════════════════════════════════════════
          CATEGORIES — Grid
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              🛍️ Shop by Category
            </h2>
            <p className="mt-1 text-sm text-[var(--text-tertiary)]">
              Browse your favorite categories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/dashboard/products?category=${cat.name.toLowerCase()}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-[var(--hover-bg)]"
            >
              <span className="text-4xl">{cat.icon}</span>
              <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                {cat.name}
              </span>
              <span className="text-[11px] text-[var(--text-tertiary)]">
                {cat.count} products
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — Newsletter / Bottom Banner
          ═══════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-7xl my-20 px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 px-12 py-16 text-center">
          <h2 className="mb-3 text-3xl font-black tracking-tighter text-[var(--text-primary)] sm:text-4xl">
            Stay in the Loop 📬
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-[var(--text-primary)]/70">
            Get exclusive deals, new arrivals, and trend alerts delivered to your inbox weekly.
          </p>
          <form className="mx-auto flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-white/20 bg-[var(--surface)]/10 px-5 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-bold text-violet-600 shadow-lg shadow-[var(--shadow-color)] transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Subscribe ✨
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}