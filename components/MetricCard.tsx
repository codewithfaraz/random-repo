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
  const changeColor = isUp ? "text-[var(--text-success)]" : "text-[var(--text-danger)]";

  return (
    <div className="glass-strong rounded-2xl border border-[var(--border)]/[0.5] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-xl hover:shadow-[var(--accent)]/5 animate-fade-in-up">
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
              ? "bg-[var(--success-bg)] text-[var(--text-success)]"
              : "bg-[var(--danger-bg)] text-[var(--text-danger)]"
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