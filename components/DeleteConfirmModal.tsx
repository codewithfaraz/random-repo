"use client";

interface DeleteConfirmModalProps {
  orderId: string;
  open?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  orderId,
  open = true,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--modal-overlay)] backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      aria-describedby="delete-desc"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-sm rounded-2xl border border-[var(--danger-border)] border-[var(--border)]/30 bg-[var(--surface)]/[0.95] p-6 shadow-2xl shadow-red-500/10 backdrop-blur-xl animate-fade-in-up transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/20">
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--danger-bg)] shadow-lg shadow-red-500/20">
          <svg
            className="h-8 w-8 text-[var(--text-danger)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        {/* Title */}
        <h2
          id="delete-title"
          className="mt-4 text-center text-lg font-bold text-[var(--text-primary)]"
        >
          Delete Order?
        </h2>

        {/* Description */}
        <p
          id="delete-desc"
          className="mt-2 text-center text-sm text-[var(--text-tertiary)]"
        >
          Are you sure you want to delete order{" "}
          <span className="font-mono text-[var(--text-primary)]">
            {orderId}
          </span>
          ? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 rounded-xl bg-gradient-to-r from-[var(--danger)] to-[var(--danger-hover)] px-4 py-3 text-sm font-bold text-[var(--text-primary)] shadow-lg shadow-red-500/25 transition-all hover:shadow-xl hover:shadow-red-500/40"
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
}