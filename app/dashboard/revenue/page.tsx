"use client";

import { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowUpDown,
  ChevronDown,
  Filter,
  ShoppingBag,
} from "lucide-react";

// ─── Revenue Data ───────────────────────────────────────
const monthlyRevenue = [
  { month: "Jan", revenue: 62400, expenses: 38200, orders: 842, growth: 12.4 },
  { month: "Feb", revenue: 58100, expenses: 36100, orders: 791, growth: -6.9 },
  { month: "Mar", revenue: 71500, expenses: 41200, orders: 958, growth: 23.1 },
  { month: "Apr", revenue: 68200, expenses: 39800, orders: 912, growth: -4.6 },
  { month: "May", revenue: 75800, expenses: 44300, orders: 1024, growth: 11.1 },
  { month: "Jun", revenue: 82100, expenses: 48200, orders: 1116, growth: 8.3 },
  { month: "Jul", revenue: 69400, expenses: 42100, orders: 938, growth: -15.5 },
  { month: "Aug", revenue: 78200, expenses: 45600, orders: 1052, growth: 12.7 },
  { month: "Sep", revenue: 85300, expenses: 49300, orders: 1145, growth: 9.1 },
  { month: "Oct", revenue: 91200, expenses: 52100, orders: 1238, growth: 6.9 },
  { month: "Nov", revenue: 98400, expenses: 55800, orders: 1342, growth: 7.9 },
  { month: "Dec", revenue: 124800, expenses: 71200, orders: 1687, growth: 27.0 },
];

const weeklyRevenue = [
  { week: "Week 1", revenue: 18200, expenses: 11200, orders: 234 },
  { week: "Week 2", revenue: 21400, expenses: 13100, orders: 271 },
  { week: "Week 3", revenue: 19800, expenses: 12200, orders: 252 },
  { week: "Week 4", revenue: 24500, expenses: 15000, orders: 312 },
];

// ─── Helper ─────────────────────────────────────────────
function formatCurrency(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

function StatCard({ title, value, change, changeType, icon, subtitle }: {
  title: string;
  value: string;
  change: number;
  changeType: "up" | "down";
  icon: React.ReactNode;
  subtitle: string;
}) {
  const isUp = changeType === "up";
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[var(--border)] hover:bg-[var(--hover-bg-strong)]">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          {icon}
        </div>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
          {isUp ? "↑" : "↓"} {change > 0 ? "+" : ""}{change.toFixed(1)}%
        </span>
      </div>
      <div className="mt-5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">{title}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-[var(--text-primary)]">{value}</p>
        <p className="mt-1 text-[11px] text-[var(--text-tertiary)]">{subtitle}</p>
      </div>
    </div>
  );
}

export default function RevenuePage() {
  const [period, setPeriod] = useState<"monthly" | "weekly">("monthly");
  const [searchQuery, setSearchQuery] = useState("");
  const [rangeFilter, setRangeFilter] = useState<"all" | "Q1" | "Q2" | "Q3" | "Q4">("all");

  const data = period === "monthly" ? monthlyRevenue : weeklyRevenue;

  const filtered = useMemo(() => {
    let result = [...data];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((r) => {
        const label = "month" in r ? r.month : r.week;
        return label.toLowerCase().includes(q);
      });
    }
    if (rangeFilter !== "all") {
      const quarterMap: Record<string, number[]> = { Q1: [0, 1, 2], Q2: [3, 4, 5], Q3: [6, 7, 8], Q4: [9, 10, 11] };
      const indices = quarterMap[rangeFilter] || [];
      result = period === "monthly" ? result.filter((_, i) => indices.includes(i)) : result;
    }
    return result;
  }, [searchQuery, rangeFilter, period, data]);

  // Summary stats
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const totalExpenses = data.reduce((s, d) => s + d.expenses, 0);
  const totalOrders = data.reduce((s, d) => s + d.orders, 0);
  const avgGrowth = data.reduce((s, d) => s + (d as any).growth, 0) / data.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Revenue & Finance</h1>
          <p className="text-sm text-[var(--text-tertiary)]">Track revenue, expenses, and growth metrics</p>
        </div>
        <div className="flex gap-2">
          {["monthly", "weekly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p as any)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase transition-all ${
                period === p
                  ? "bg-violet-500 text-[var(--text-primary)] shadow-lg shadow-violet-500/25"
                  : "bg-[var(--hover-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={avgGrowth}
          changeType="up"
          icon={<DollarSign size={20} />}
          subtitle="vs. last period"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          change={-5.2}
          changeType="down"
          icon={<TrendingDown size={20} />}
          subtitle="Operating costs"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          change={18.3}
          changeType="up"
          icon={<ShoppingBag size={20} />}
          subtitle="All time"
        />
        <StatCard
          title="Avg. Growth"
          value={avgGrowth.toFixed(1) + "%"}
          change={avgGrowth}
          changeType={avgGrowth >= 0 ? "up" : "down"}
          icon={<TrendingUp size={20} />}
          subtitle="Monthly avg"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search months..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-48 rounded-full border border-[var(--border)] bg-[var(--hover-bg)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
          />
        </div>
        {period === "monthly" && (
          <select
            value={rangeFilter}
            onChange={(e) => setRangeFilter(e.target.value as any)}
            className="rounded-full border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2 text-sm text-[var(--text-secondary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
          >
            <option value="all">All Months</option>
            <option value="Q1">Q1 (Jan–Mar)</option>
            <option value="Q2">Q2 (Apr–Jun)</option>
            <option value="Q3">Q3 (Jul–Sep)</option>
            <option value="Q4">Q4 (Oct–Dec)</option>
          </select>
        )}
      </div>

      {/* Revenue Table */}
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-[var(--surface)]/95 backdrop-blur-xl">
            <tr className="border-b border-[var(--border)]">
              {period === "monthly" ? (
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Month</th>
              ) : (
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Week</th>
              )}
              {[
                { key: "revenue" as const, label: "Revenue" },
                { key: "expenses" as const, label: "Expenses" },
                { key: "profit" as const, label: "Profit" },
                { key: "orders" as const, label: "Orders" },
                ...(period === "monthly" ? [{ key: "growth" as const, label: "Growth" }] : []),
              ].map(({ key, label }) => (
                <th key={key} className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map((d, i) => {
              const profit = d.revenue - d.expenses;
              const profitMargin = ((profit / d.revenue) * 100).toFixed(1);
              const isPositive = profit >= 0;
              const growth = (d as any).growth;
              return (
                <tr key={i} className="transition-colors hover:bg-[var(--hover-bg)]">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {period === "monthly"
                        ? (d as (typeof monthlyRevenue)[0]).month
                        : (d as (typeof weeklyRevenue)[0]).week}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{formatCurrency(d.revenue)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-red-400">-{formatCurrency(d.expenses)}</span>
                  </td>
                  <td className={`px-6 py-4 text-right text-sm font-bold ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                    {isPositive ? "+" : "-"}{formatCurrency(Math.abs(profit))}
                    <span className="ml-1 text-[10px] text-[var(--text-tertiary)]">({profitMargin}%)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{d.orders.toLocaleString()}</span>
                  </td>
                  {period === "monthly" && (
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-semibold ${growth >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Quarterly Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Q1 Revenue", value: 191900, growth: 12.5 },
          { label: "Q2 Revenue", value: 224900, growth: 17.3 },
          { label: "Q3 Revenue", value: 232900, growth: 3.6 },
          { label: "Q4 Revenue", value: 313700, growth: 34.7 },
        ].map((q, i) => (
          <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--text-tertiary)]">{q.label}</p>
            <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">{formatCurrency(q.value)}</p>
            <p className="mt-1 text-sm font-semibold text-emerald-400">↑ {q.growth}% vs prev</p>
          </div>
        ))}
      </div>
    </div>
  );
}