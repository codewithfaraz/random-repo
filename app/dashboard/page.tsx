"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { RecentOrders } from "@/components/RecentOrders";
import { SalesChart } from "@/components/SalesChart";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Dashboard
          </h1>
          <p className="text-sm text-[var(--text-tertiary)]">
            Welcome back — here's what's happening with your store today.
          </p>
        </div>
        <div className="flex gap-2">
          {["7d", "30d", "90d", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                timeRange === range
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                  : "bg-[var(--hover-bg)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
              }`}
            >
              {range === "7d"
                ? "Last 7 days"
                : range === "30d"
                ? "Last 30 days"
                : range === "90d"
                ? "Last 90 days"
                : "Last year"}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$24,582"
          change="+12.5%"
          changeType="up"
          icon={<DollarSign size={20} />}
          gradient="from-emerald-400 to-teal-500"
          description="vs. last period"
        />
        <MetricCard
          title="Orders"
          value="1,847"
          change="+8.2%"
          changeType="up"
          icon={<ShoppingBag size={20} />}
          gradient="from-blue-400 to-indigo-500"
          description="vs. last period"
        />
        <MetricCard
          title="Customers"
          value="1,284"
          change="+3.1%"
          changeType="up"
          icon={<Users size={20} />}
          gradient="from-violet-400 to-purple-500"
          description="vs. last period"
        />
        <MetricCard
          title="Conversion Rate"
          value="3.8%"
          change="-0.4%"
          changeType="down"
          icon={<TrendingUp size={20} />}
          gradient="from-amber-400 to-orange-500"
          description="vs. last period"
        />
      </div>

      {/* Charts & Orders grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <SalesChart timeRange={timeRange} />
        </div>

        {/* Quick Summary Card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-[var(--text-secondary)]">
            Order Status
          </h3>
          <div className="space-y-4">
            {[
              {
                label: "Pending",
                value: 24,
                color: "amber-400",
                Icon: Clock,
              },
              {
                label: "Processing",
                value: 18,
                color: "blue-400",
                Icon: Package,
              },
              {
                label: "Shipped",
                value: 156,
                color: "emerald-400",
                Icon: CheckCircle2,
              },
              {
                label: "Delivered",
                value: 1482,
                color: "violet-400",
                Icon: CheckCircle2,
              },
              {
                label: "Cancelled",
                value: 12,
                color: "red-400",
                Icon: XCircle,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${item.color}/10`}
                  >
                    <item.Icon size={16} className={`text-${item.color}`} />
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Top product */}
          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Top Product
            </h4>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
                P
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Premium Wireless Headphones
                </p>
                <p className="text-[11px] text-violet-400">
                  $149.99 • 382 sold
                </p>
              </div>
              <ArrowRight size={16} className="text-[var(--text-tertiary)]" />
            </div>
          </div>

          {/* Alert */}
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-3">
            <div className="flex items-start gap-2">
              <AlertCircle
                size={14}
                className="mt-0.5 shrink-0 text-amber-400"
              />
              <p className="text-xs text-amber-400/80">
                <strong>Low stock:</strong> 3 products are running low. Check
                inventory now.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}