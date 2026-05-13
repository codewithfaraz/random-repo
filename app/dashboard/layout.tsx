"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/app/ThemeToggle";

const navSections = [
  {
    label: "Overview",
    items: [{ href: "/dashboard", icon: BarChart3, label: "Overview" }],
  },
  {
    label: "Management",
    items: [
      { href: "/dashboard/orders", icon: ShoppingBag, label: "Orders" },
      { href: "/dashboard/products", icon: Package, label: "Products" },
      { href: "/dashboard/customers", icon: Users, label: "Customers" },
    ],
  },
  {
    label: "Finance",
    items: [{ href: "/dashboard/revenue", icon: DollarSign, label: "Revenue" }],
  },
  {
    label: "Account",
    items: [{ href: "/dashboard/settings", icon: Settings, label: "Settings" }],
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[260px] border-r border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-black shadow-lg shadow-violet-500/25">
            H
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
            Hermes <span className="text-xs font-medium text-violet-400">Admin</span>
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="px-6 py-3 border-b border-[var(--border)] flex items-center gap-3">
          <ThemeToggle />
          <span className="text-xs text-[var(--text-tertiary)]">
            {pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}
          </span>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navSections.map((section) => (
            <div key={section.label}>
              <div className="mb-1 px-3 text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">
                {section.label}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-violet-500/10 text-[var(--text-primary)] border-l-2 border-violet-500 shadow-inner shadow-violet-500/5"
                        : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] hover:translate-x-0.5"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon size={18} strokeWidth={1.5} className="shrink-0" />
                    {item.label}
                    {isActive && (
                      <span className="ml-auto text-[10px] text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        ●
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--border)] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-[var(--text-primary)] shadow-lg shadow-amber-500/20">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Admin User
              </p>
              <p className="text-[11px] text-[var(--text-tertiary)]">
                admin@store.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-[260px] min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-2xl px-8">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2">
            <Search size={16} className="text-[var(--text-tertiary)] shrink-0" />
            <input
              type="text"
              placeholder="Search orders, products, customers..."
              className="flex-1 bg-transparent text-sm text-[var(--text-secondary)] outline-none placeholder:text-[var(--text-tertiary)]"
            />
          </div>
          <button className="relative rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-2.5 text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]">
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
              3
            </span>
          </button>
        </header>

        {/* Page content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}