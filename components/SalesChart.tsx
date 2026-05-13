"use client";

import { useState, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SalesData {
  name: string;
  revenue: number;
  orders: number;
}

interface SalesChartProps {
  timeRange: string;
}

export function SalesChart({ timeRange }: SalesChartProps) {
  const data = useMemo(() => {
    const dataMap: Record<string, SalesData[]> = {
      "7d": [
        { name: "Mon", revenue: 3240, orders: 42 },
        { name: "Tue", revenue: 2810, orders: 38 },
        { name: "Wed", revenue: 4150, orders: 51 },
        { name: "Thu", revenue: 3680, orders: 45 },
        { name: "Fri", revenue: 4920, orders: 62 },
        { name: "Sat", revenue: 5130, orders: 68 },
        { name: "Sun", revenue: 2852, orders: 31 },
      ],
      "30d": [
        { name: "Week 1", revenue: 18200, orders: 234 },
        { name: "Week 2", revenue: 21400, orders: 271 },
        { name: "Week 3", revenue: 19800, orders: 252 },
        { name: "Week 4", revenue: 24500, orders: 312 },
      ],
      "90d": [
        { name: "Jan", revenue: 62400, orders: 842 },
        { name: "Feb", revenue: 58100, orders: 791 },
        { name: "Mar", revenue: 71500, orders: 958 },
      ],
      "1y": [
        { name: "Q1", revenue: 185000, orders: 2480 },
        { name: "Q2", revenue: 212000, orders: 2810 },
        { name: "Q3", revenue: 198000, orders: 2650 },
        { name: "Q4", revenue: 248500, orders: 3290 },
      ],
    };
    return dataMap[timeRange] || dataMap["7d"];
  }, [timeRange]);

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);
  const prevRevenue = totalRevenue * 0.875;
  const growth = ((totalRevenue - prevRevenue) / prevRevenue) * 100;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            Sales Overview
          </h2>
          <p className="text-sm text-[var(--text-tertiary)]">
            Revenue & orders over time
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-1.5">
          {growth >= 0 ? (
            <TrendingUp size={14} className="text-emerald-400" />
          ) : (
            <TrendingDown size={14} className="text-red-400" />
          )}
          <span
            className={`text-xs font-semibold ${
              growth >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {growth >= 0 ? "+" : ""}
            {growth.toFixed(1)}% vs prev period
          </span>
        </div>
      </div>

      {/* Summary row */}
      <div className="mb-4 flex items-center gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
            Total Revenue
          </p>
          <p className="text-xl font-bold text-[var(--text-primary)]">
            $
            {totalRevenue.toLocaleString("en-US", {
              minimumFractionDigits: 0,
            })}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
            Total Orders
          </p>
          <p className="text-xl font-bold text-[var(--text-primary)]">
            {totalOrders}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
            Avg. Order Value
          </p>
          <p className="text-xl font-bold text-[var(--text-primary)]">
            $
            {(totalRevenue / totalOrders).toLocaleString("en-US", {
              minimumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="barGradientOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--table-divider)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="var(--text-tertiary)"
              tick={{ fill: "var(--text-tertiary)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-tertiary)"
              tick={{ fill: "var(--text-tertiary)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--text-primary)",
                boxShadow: "0 8px 32px var(--shadow-color)",
              }}
              labelStyle={{ color: "var(--text-tertiary)", fontSize: 12 }}
              itemStyle={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 600 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Bar
              dataKey="revenue"
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
              animationDuration={800}
              animationBegin={0}
            />
            <Bar
              dataKey="orders"
              fill="url(#barGradientOrders)"
              radius={[6, 6, 0, 0]}
              maxBarSize={24}
              animationDuration={800}
              animationBegin={200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}