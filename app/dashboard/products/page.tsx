"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  SlidersHorizontal,
  X,
  Plus,
  Minus,
  Trash2,
  Heart,
} from "lucide-react";
import { Carousel } from "@/components/Carousel";

// ─── Product Data ───────────────────────────────────────
const allProducts = [
  { id: 1, name: "Wireless Headphones Pro", price: 149.99, image: "🎧", category: "Electronics", rating: 4.8, reviews: 342, inStock: true },
  { id: 2, name: "Smart Watch Ultra", price: 399.00, image: "⌚", category: "Electronics", rating: 4.9, reviews: 512, inStock: true },
  { id: 3, name: "Laptop Stand Ergonomic", price: 79.99, image: "💻", category: "Accessories", rating: 4.6, reviews: 567, inStock: true },
  { id: 4, name: "Mechanical Keyboard RGB", price: 129.99, image: "⌨️", category: "Electronics", rating: 4.7, reviews: 189, inStock: false },
  { id: 5, name: "USB-C Hub 8-in-1", price: 45.50, image: "🔌", category: "Accessories", rating: 4.5, reviews: 401, inStock: true },
  { id: 6, name: "Noise Cancelling Earbuds", price: 199.00, image: "🎵", category: "Electronics", rating: 4.8, reviews: 276, inStock: true },
  { id: 7, name: "4K Webcam", price: 89.99, image: "📷", category: "Electronics", rating: 4.3, reviews: 134, inStock: true },
  { id: 8, name: "Canvas Tote Bag", price: 34.99, image: "👜", category: "Fashion", rating: 4.1, reviews: 89, inStock: true },
  { id: 9, name: "Wireless Mouse", price: 39.99, image: "🖱️", category: "Accessories", rating: 4.4, reviews: 256, inStock: true },
  { id: 10, name: "Desk Lamp LED", price: 54.99, image: "💡", category: "Home", rating: 4.6, reviews: 178, inStock: true },
  { id: 11, name: "Running Shoes Pro", price: 124.99, image: "👟", category: "Sports", rating: 4.7, reviews: 345, inStock: true },
  { id: 12, name: "Ceramic Water Bottle", price: 24.99, image: "🍶", category: "Home", rating: 4.5, reviews: 412, inStock: true },
];

const categories = ["All", "Electronics", "Accessories", "Fashion", "Home", "Sports"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviews" },
];

// ─── Product Card ───────────────────────────────────────
function ProductCard({ product, onAddToCart }: { product: typeof allProducts[0]; onAddToCart: (p: typeof allProducts[0]) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image area */}
      <div className="relative aspect-square flex items-center justify-center bg-[var(--hover-bg)] overflow-hidden">
        <span className="text-7xl transition-transform duration-500 group-hover:scale-110">{product.image}</span>

        {/* Quick actions overlay */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)]/95 backdrop-blur-xl text-[var(--text-primary)] hover:bg-[var(--hover-bg-strong)] transition-all"
              aria-label="Add to wishlist"
            >
              <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/80 backdrop-blur-sm text-[var(--text-primary)] hover:bg-violet-500 transition-all"
              aria-label="Add to cart"
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        )}

        {/* Badges */}
        {!product.inStock && (
          <span className="absolute top-3 left-3 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-bold text-[var(--text-primary)]">
            Sold Out
          </span>
        )}
        {product.rating >= 4.8 && (
          <span className="absolute top-3 right-3 rounded-full bg-amber-400/90 px-2.5 py-1 text-[10px] font-bold text-[var(--text-primary)]">
            ⭐ Best Seller
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Link
          href={`/dashboard/products/${product.id}`}
          className="text-sm font-semibold text-[var(--text-primary)] hover:text-violet-400 line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, s) => (
              <Star
                key={s}
                size={11}
                className={s < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-600"}
              />
            ))}
          </div>
          <span className="text-[11px] text-[var(--text-tertiary)]">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price & Category */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-violet-400">${product.price.toFixed(2)}</span>
          <span className="text-[11px] text-[var(--text-tertiary)] capitalize">{product.category}</span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`mt-3 w-full rounded-xl py-2.5 text-sm font-semibold transition-all ${
            product.inStock
              ? "bg-violet-500 text-[var(--text-primary)] hover:bg-violet-600 shadow-lg shadow-violet-500/25"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

// ─── Featured Products Carousel Data ─────────────────────
const featuredProducts = [
  { id: 1, name: "Wireless Headphones Pro", price: 149.99, image: "🎧", rating: 4.8 },
  { id: 2, name: "Smart Watch Ultra", price: 399.00, image: "⌚", rating: 4.9 },
  { id: 3, name: "Noise Cancelling Earbuds", price: 199.00, image: "🎵", rating: 4.8 },
  { id: 4, name: "Running Shoes Pro", price: 124.99, image: "👟", rating: 4.7 },
  { id: 5, name: "Desk Lamp LED", price: 54.99, image: "💡", rating: 4.6 },
];

// ─── Flash Sale Data ─────────────────────────────────────
const flashSales = [
  { id: 1, name: "USB-C Hub 8-in-1", original: 69.99, sale: 45.50, discount: "35%", image: "🔌" },
  { id: 2, name: "Canvas Tote Bag", original: 49.99, sale: 34.99, discount: "30%", image: "👜" },
  { id: 3, name: "Ceramic Water Bottle", original: 34.99, sale: 24.99, discount: "28%", image: "🍶" },
  { id: 4, name: "Wireless Mouse", original: 59.99, sale: 39.99, discount: "33%", image: "🖱️" },
];

export default function ProductsPage() {
  const [cart, setCart] = useState<typeof allProducts>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartSlideOpen, setCartSlideOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, sortBy, searchQuery]);

  const addToCart = (product: typeof allProducts[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing) {
        return prev.map((c) => (c.id === product.id ? { ...c, quantity: (c as any).quantity + 1 } : c));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartSlideOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((c) => {
        const newQty = (c as any).quantity + delta;
        if (newQty <= 0) return null;
        return { ...c, quantity: newQty };
      }).filter(Boolean) as typeof allProducts
    );
  };

  const cartCount = (id: number) => {
    const item = cart.find((c) => c.id === id);
    return item ? (item as any).quantity || 1 : 0;
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.price * ((c as any).quantity || 1), 0);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ═══════════════════════════════════════════
          FEATURED PRODUCTS CAROUSEL
          ═══════════════════════════════════════════ */}
      <section className="pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tighter text-[var(--text-primary)]">
                ⭐ Featured Products
              </h2>
              <p className="mt-1 text-sm text-[var(--text-tertiary)]">Hand-picked just for you</p>
            </div>
          </div>
        </div>

        <Carousel opts={{ loop: true, align: "start", slidesToScroll: 1 }} arrows dots>
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[200px] max-w-[260px] px-2">
              <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 group cursor-pointer">
                <div className="aspect-square flex items-center justify-center bg-[var(--hover-bg)]">
                  <span className="text-7xl transition-transform duration-500 group-hover:scale-110">{product.image}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-1">{product.name}</h3>
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={12} className={s < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-600"} />
                    ))}
                    <span className="ml-1 text-[11px] text-[var(--text-tertiary)]">{product.rating}</span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-violet-400">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* ═══════════════════════════════════════════
          FLASH SALE SECTION
          ═══════════════════════════════════════════ */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-bold uppercase text-red-400">
              🔥 Flash Sale
            </span>
            <span className="text-sm text-[var(--text-tertiary)]">Ends in 3h 24m 18s</span>
          </div>

          <Carousel opts={{ loop: true, align: "start", slidesToScroll: 1 }} arrows dots>
            {flashSales.map((item) => (
              <div key={item.id} className="min-w-[220px] max-w-[280px] px-2">
                <div className="flex flex-col overflow-hidden rounded-2xl border border-red-500/20 bg-[var(--surface)] transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/5">
                  <div className="relative aspect-square flex items-center justify-center bg-red-500/5">
                    <span className="text-7xl">{item.image}</span>
                    <span className="absolute top-3 right-3 rounded-full bg-gradient-to-br from-red-500 to-rose-600 px-2.5 py-1 text-[10px] font-black text-[var(--text-primary)]">
                      {item.discount}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{item.name}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-red-400">${item.sale.toFixed(2)}</span>
                      <span className="text-sm text-[var(--text-tertiary)] line-through">${item.original.toFixed(2)}</span>
                    </div>
                    <button
                      className="mt-3 w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-600 py-2.5 text-sm font-bold text-[var(--text-primary)] shadow-lg shadow-red-500/25 transition-all hover:shadow-xl hover:shadow-red-500/40"
                      onClick={() => alert(`Added ${item.name} to cart!`)}
                    >
                      Grab Deal!
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FULL PRODUCT GRID
          ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            All Products
          </h2>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            Browse our curated collection
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "border-violet-500 bg-violet-500 text-[var(--text-primary)] shadow-lg shadow-violet-500/25"
                    : "border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] hover:border-violet-500/50 hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Search */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 rounded-full border border-[var(--border)] bg-[var(--hover-bg)] py-1.5 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-1.5 text-sm text-[var(--text-secondary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filters */}
{(activeCategory !== "All" || searchQuery || sortBy !== "featured") && (
            <div className="mb-6 flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-[var(--text-tertiary)]" />
              <span className="text-sm text-[var(--text-tertiary)]">
                {activeCategory !== "All" && (
                  <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-400">
                    {activeCategory}
                    <button onClick={() => setActiveCategory("All")} aria-label="Clear category">
                      <X size={10} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} aria-label="Clear search">
                      <X size={10} />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                    setSortBy("featured");
                  }}
                  className="ml-2 text-xs font-medium text-violet-400 hover:underline"
                >
                  Clear All ✕
                </button>
              </span>
            </div>
          )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--text-tertiary)]">
            <ShoppingBag size={64} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 rounded-full border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          SLIDE CART (Drawer from right)
          ═══════════════════════════════════════════ */}
      {cartSlideOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:left-[260px]"
          onClick={() => setCartSlideOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[var(--surface)] shadow-2xl shadow-black/40 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] p-6">
              <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
                🛒 Cart ({cart.reduce((n, c) => n + ((c as any).quantity || 1), 0)} items)
              </h2>
              <button
                onClick={() => setCartSlideOpen(false)}
                className="rounded-lg p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-[var(--text-tertiary)]">
                  <ShoppingBag size={48} className="mb-4 opacity-50" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => {
                  const qty = (item as any).quantity || 1;
                  return (
                    <div key={item.id} className="mb-4 flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-4">
                      <span className="text-3xl">{item.image}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{item.name}</p>
                        <p className="text-sm font-bold text-violet-400">
                          ${(item.price * qty).toFixed(2)}
                        </p>
                      </div>
                      {/* Qty Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-violet-500/50 hover:text-violet-400"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-sm font-bold text-[var(--text-primary)]">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-violet-500/50 hover:text-violet-400"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-[var(--border)] p-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-[var(--text-tertiary)]">Subtotal</span>
                  <span className="font-bold text-[var(--text-primary)]">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[var(--text-tertiary)]">Shipping</span>
                  <span className="text-emerald-400">Free</span>
                </div>
                <div className="mb-4 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="text-base font-bold text-[var(--text-primary)]">Total</span>
                  <span className="text-xl font-black text-violet-400">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3.5 text-sm font-bold text-[var(--text-primary)] shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40">
                  Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}