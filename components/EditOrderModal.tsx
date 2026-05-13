"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "completed" | "processing" | "pending" | "cancelled";
  date: string;
}

interface EditOrderModalProps {
  order: Order;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
}

export function EditOrderModal({ order, onClose, onSave }: EditOrderModalProps) {
  const [form, setForm] = useState<Order>(order);

  useEffect(() => setForm(order), [order]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  function handleInputClick(
    e: React.MouseEvent<HTMLInputElement | HTMLSelectElement, MouseEvent>
  ) {
    e.stopPropagation();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--modal-overlay)] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-order-title"
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl shadow-[var(--shadow-color)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            id="edit-order-title"
            className="text-lg font-bold tracking-tight text-[var(--text-primary)]"
          >
            Edit Order
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" onClick={(e) => e.stopPropagation()}>
          {/* Order ID (read-only) */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Order ID
            </label>
            <input
              type="text"
              value={form.id}
              readOnly
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-tertiary)] outline-none"
            />
          </div>

          {/* Customer */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Customer Name
            </label>
            <input
              type="text"
              value={form.customer}
              onChange={(e) => setForm({ ...form, customer: e.target.value })}
              onClick={handleInputClick}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-violet-500/20"
              placeholder="Enter customer name"
              required
            />
          </div>

          {/* Product */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Product
            </label>
            <input
              type="text"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
              onClick={handleInputClick}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-violet-500/20"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Amount
            </label>
            <input
              type="text"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              onClick={handleInputClick}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-violet-500/20"
              placeholder="$0.00"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as Order["status"],
                })}
              onClick={handleInputClick}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-violet-500/20"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date (read-only) */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Date
            </label>
            <input
              type="text"
              value={form.date}
              readOnly
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-tertiary)] outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-6 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] px-6 py-2.5 text-sm font-bold text-[var(--text-primary)] shadow-lg shadow-[var(--accent)]/25 transition-all hover:shadow-xl hover:shadow-[var(--accent)]/40"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}