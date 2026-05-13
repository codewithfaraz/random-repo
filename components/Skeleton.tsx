"use client";

import { useEffect, useState } from "react";

interface SkeletonProps {
  className?: string;
  animated?: boolean;
  count?: number;
  heights?: string[];
  widths?: string[];
}

export function Skeleton({
  className = "",
  animated = true,
  count = 1,
  heights = ["h-4"],
  widths = ["w-full"],
}: SkeletonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const items = Array.from({ length: count });

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((_, i) => (
        <div
          key={i}
          className={`${
            heights[i % heights.length]
          } ${widths[i % widths.length]} rounded-lg bg-[var(--hover-bg)] ${
            animated
              ? "animate-pulse"
              : "opacity-40"
          }`}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  animated?: boolean;
  variant?: "default" | "product" | "metric" | "table-row";
}

export function SkeletonCard({
  animated = true,
  variant = "default",
}: SkeletonCardProps) {
  if (variant === "product") {
    return (
      <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300">
        <div className={`aspect-square flex items-center justify-center bg-[var(--hover-bg)] ${animated ? "animate-pulse" : ""}`}>
          <div className="h-16 w-16 rounded-full bg-[var(--border)]" />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className={`h-4 w-3/4 rounded-full bg-[var(--hover-bg-strong)] ${animated ? "animate-pulse" : ""}`} />
          <div className={`h-3 w-1/2 rounded-full bg-[var(--hover-bg-strong)] ${animated ? "animate-pulse" : ""}`} />
          <div className="mt-auto flex items-center justify-between pt-2">
            <div className={`h-5 w-20 rounded-full bg-violet-500/10 ${animated ? "animate-pulse" : ""}`} />
            <div className={`h-8 w-28 rounded-xl bg-violet-500/20 ${animated ? "animate-pulse" : ""}`} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "metric") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 ${animated ? "animate-pulse" : ""}`} />
          <div className={`h-5 w-20 rounded-full bg-[var(--hover-bg-strong)] ${animated ? "animate-pulse" : ""}`} />
        </div>
        <div className="mt-5">
          <div className={`h-3 w-24 rounded-full bg-[var(--hover-bg-strong)] mb-2 ${animated ? "animate-pulse" : ""}`} />
          <div className={`h-7 w-32 rounded-full bg-[var(--hover-bg-strong)] ${animated ? "animate-pulse" : ""}`} />
        </div>
      </div>
    );
  }

  if (variant === "table-row") {
    return (
      <div className="flex items-center gap-4 py-4">
        <div className={`h-4 w-28 rounded-full bg-[var(--hover-bg-strong)] ${animated ? "animate-pulse" : ""}`} />
        <div className={`h-4 w-24 rounded-full bg-[var(--hover-bg-strong)] ${animated ? "animate-pulse" : ""}`} />
        <div className={`h-4 w-20 rounded-full bg-[var(--hover-bg-strong)] ${animated ? "animate-pulse" : ""}`} />
        <div className="ml-auto">
          <div className={`h-5 w-16 rounded-full bg-[var(--hover-bg-strong)] ${animated ? "animate-pulse" : ""}`} />
        </div>
      </div>
    );
  }

  // Default
  return (
    <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl ${animated ? "animate-pulse" : ""}`}>
      <div className="space-y-3">
        <div className={`h-4 w-3/4 rounded-full bg-[var(--hover-bg-strong)]`} />
        <div className={`h-4 w-1/2 rounded-full bg-[var(--hover-bg-strong)]`} />
        <div className={`h-4 w-2/3 rounded-full bg-[var(--hover-bg-strong)]`} />
      </div>
    </div>
  );
}