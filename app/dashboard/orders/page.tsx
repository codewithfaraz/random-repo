"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  Package,
  MoreVertical,
  Trash2,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";

// ─── Order Data ──────────────────────────────────────────
const initialOrders = [
  { id: "#ORD-7821", customer: "Sarah Mitchell", product: "Premium Headphones", amount: "$149.99", status: "completed" as const, date: "2 min ago" },
  { id: "#ORD-7820", customer: "James Chen", product: "Wireless Keyboard", amount: "$89.00", status: "processing" as const, date: "15 min ago" },
  { id: "#ORD-7819", customer: "Emma Rodriguez", product: "USB-C Hub", amount: "$45.50", status: "pending" as const, date: "1 hr ago" },
  { id: "#ORD-7818", customer: "Liam O'Brien", product: "Mechanical Mouse", amount: "$67.00", status: "completed" as const, date: "2 hrs ago" },
  { id: "#ORD-7817", customer: "Aisha Patel", product: "Laptop Stand", amount: "$34.99", status: "cancelled" as const, date: "3 hrs ago" },
  { id: "#ORD-7816", customer: "Noah Williams", product: "Webcam HD", amount: "$112.00", status: "completed" as const, date: "5 hrs ago" },
  { id: "#ORD-7815", customer: "Sophia Lee", product: "Monitor Arm", amount: "$78.50", status: "processing" as const, date: "6 hrs ago" },
  { id: "#ORD-7814", customer: "Oliver Brown", product: "USB-C Hub", amount: "$45.50", status: "completed" as const, date: "8 hrs ago" },
  { id: "#ORD-7813", customer: "Mia Taylor", product: "Mechanical Mouse", amount: "$67.00", status: "pending" as const, date: "10 hrs ago" },
  { id: "#ORD-7812", customer: "Lucas Garcia", product: "Webcam HD", amount: "$112.00", status: "completed" as const, date: "1 day ago" },
];

const statusConfig = {
  completed: { label: "Completed", color: "text-emerald-400", bg: "bg-emerald-400/10", icon: CheckCircle2 },
  processing: { label: "Processing", color: "text-blue-400", bg: "bg-blue-400/10", icon: Clock },
  pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-400/10", icon: Clock },
  cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-400/10", icon: XCircle },
};

const ITEMS_PER_PAGE = 5;

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<"id" | "customer" | "product" | "amount" | "date" | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // Filtered & Sorted
  const filteredOrders = useMemo(() => {
    let result = [...orders];
    if (statusFilter !== "All") result = result.filter((o) => o.status === statusFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((o) =>
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q)
      );
    }
    if (sortField) {
      result.sort((a, b) => {
        const aVal = a[sortField] as string;
        const bVal = b[sortField] as string;
        const cmp = aVal.localeCompare(bVal);
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [orders, searchQuery, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleSort = (field: "id" | "customer" | "product" | "amount" | "date") => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Orders</h1>
          <p className="text-sm text-[var(--text-tertiary)]">Manage and track all orders</p>
        </div>
        <span className="rounded-full bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-400">
          {orders.length} orders
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-64 rounded-full border border-[var(--border)] bg-[var(--hover-bg)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="rounded-full border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2 text-sm text-[var(--text-secondary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
        >
          <option>All</option>
          <option>Completed</option>
          <option>Processing</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="max-h-[520px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-[var(--surface)]/95 backdrop-blur-xl">
              <tr className="border-b border-[var(--border)]">
                {[
                  { key: "id" as const, label: "Order ID" },
                  { key: "customer" as const, label: "Customer" },
                  { key: "product" as const, label: "Product" },
                  { key: "amount" as const, label: "Amount" },
                  { key: "status" as const, label: "Status" },
                  { key: "date" as const, label: "Date" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => key !== "status" && toggleSort(key)}
                    className={`px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] select-none transition-colors ${
                      key !== "status" ? "cursor-pointer hover:text-[var(--text-primary)]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {label}
                      {sortField === key && (
                        <ChevronDown size={10} className={`transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {paginatedOrders.map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={order.id} className="transition-colors hover:bg-[var(--hover-bg)]">
                    <td className="px-6 py-4">
                      <span className="font-medium text-[var(--text-primary)]">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--text-secondary)]">{order.customer}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--text-tertiary)]">{order.product}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{order.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.bg} ${status.color}`}>
                        <StatusIcon size={11} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--text-tertiary)]">{order.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === order.id ? null : order.id)}
                          className="rounded p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                        >
                          <MoreVertical size={15} />
                        </button>
                        {openMenuId === order.id && (
<div className="absolute right-0 top-full z-50 mt-1 w-40 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 shadow-2xl shadow-black/60">
                            <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] focus:bg-[var(--hover-bg)] focus:outline-none">
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => setOrders((p) => p.filter((o) => o.id !== order.id))}
                              className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-red-400/80 hover:bg-red-500/10"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[var(--text-tertiary)]">
                    <ShoppingBag size={48} className="mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No orders match your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--text-tertiary)]">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length}
          </p>
          <div className="flex gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition-all ${
                  currentPage === p
                    ? "border-violet-500 bg-violet-500 text-[var(--text-primary)] shadow-lg shadow-violet-500/25"
                    : "border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)]"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}