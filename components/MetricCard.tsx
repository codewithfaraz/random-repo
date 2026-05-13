"use client";

import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: ReactNode;
  gradient: string;
  description: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon,
  gradient,
  description,
}: MetricCardProps) {
  const isUp = changeType === "up";
  const changeColor = isUp ? "text-emerald-400" : "text-red-400";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[var(--border)] hover:bg-[var(--hover-bg-strong)]">
      {/* Glow effect */}
      <div
        className={`pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-3xl`}
      />

      <div className="relative flex items-start justify-between">
        {/* Icon */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} bg-opacity-15`}
        >
          <div
            className={`bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
          >
            {icon}
          </div>
        </div>

        {/* Change badge */}
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            isUp
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {isUp ? "↑" : "↓"} {change}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
          {title}
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          {value}
        </p>
        <p className="mt-1 text-[11px] text-[var(--text-tertiary)]">
          {description}
        </p>
      </div>
    </div>
  );
}