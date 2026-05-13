"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpDown,
} from "lucide-react";
import { EditOrderModal } from "@/components/EditOrderModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "completed" | "processing" | "pending" | "cancelled";
  date: string;
}

/* ── Initial data ──────────────────────────────────── */
const initialOrders: Order[] = [
  {
    id: "#ORD-7821",
    customer: "Sarah Mitchell",
    product: "Premium Headphones",
    amount: "$149.99",
    status: "completed",
    date: "2 min ago",
  },
  {
    id: "#ORD-7820",
    customer: "James Chen",
    product: "Wireless Keyboard",
    amount: "$89.00",
    status: "processing",
    date: "15 min ago",
  },
  {
    id: "#ORD-7819",
    customer: "Emma Rodriguez",
    product: "USB-C Hub",
    amount: "$45.50",
    status: "pending",
    date: "1 hr ago",
  },
  {
    id: "#ORD-7818",
    customer: "Liam O'Brien",
    product: "Mechanical Mouse",
    amount: "$67.00",
    status: "completed",
    date: "2 hrs ago",
  },
  {
    id: "#ORD-7817",
    customer: "Aisha Patel",
    product: "Laptop Stand",
    amount: "$34.99",
    status: "cancelled",
    date: "3 hrs ago",
  },
  {
    id: "#ORD-7816",
    customer: "Noah Williams",
    product: "Webcam HD",
    amount: "$112.00",
    status: "completed",
    date: "5 hrs ago",
  },
  {
    id: "#ORD-7815",
    customer: "Sophia Lee",
    product: "Monitor Arm",
    amount: "$78.50",
    status: "processing",
    date: "6 hrs ago",
  },
];

const statusConfig = {
  completed: {
    label: "Completed",
    color: "text-[var(--text-success)]",
    bg: "bg-emerald-400/10",
    icon: CheckCircle2,
  },
  processing: {
    label: "Processing",
    color: "text-[var(--text-info)]",
    bg: "bg-blue-400/10",
    icon: Clock,
  },
  pending: {
    label: "Pending",
    color: "text-[var(--text-warning)]",
    bg: "bg-amber-400/10",
    icon: Clock,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-[var(--text-danger)]",
    bg: "bg-red-400/10",
    icon: XCircle,
  },
};

/* ── Dropdown Menu ─────────────────────────────────── */
function ActionMenu({
  orderId,
  onClose,
  onEdit,
  onDelete,
}: {
  orderId: string;
  onClose: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="absolute right-0 top-2 z-50 w-48 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 shadow-2xl shadow-[var(--shadow-color)] backdrop-blur-xl"
      role="menu"
      onMouseDown={(e) => e.preventDefault()}
    >
      <button
        onClick={() => {
          onEdit(orderId);
          onClose();
        }}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] focus:bg-[var(--hover-bg)] focus:outline-none"
        role="menuitem"
      >
        <span className="text-[var(--text-info)]">✏️</span>
        <span>Edit Order</span>
      </button>
      <button
        onClick={() => {
          onDelete(orderId);
          onClose();
        }}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-[var(--text-danger)]/80 transition-all hover:bg-[var(--danger-bg)] hover:text-[var(--text-danger)] focus:bg-[var(--danger-bg)] focus:outline-none"
        role="menuitem"
      >
        <span>🗑️</span>
        <span>Delete Order</span>
      </button>
    </div>
  );
}

/* ── Component ─────────────────────────────── */
export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!openMenuId) return;

    function handler(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenMenuId(null);
      }
    }

    /* Use capture phase for more reliable detection */
    document.addEventListener("mousedown", handler, true);
    return () =>
      document.removeEventListener("mousedown", handler, true);
  }, [openMenuId]);

  const handleSaveEdit = (updatedOrder: Order) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
  };

  const handleDeleteConfirm = () => {
    if (deletingOrderId) {
      setOrders((prev) => prev.filter((o) => o.id !== deletingOrderId));
      setDeletingOrderId(null);
    }
  };

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            Recent Orders
          </h2>
          <p className="text-sm text-[var(--text-tertiary)]">
            Latest transactions from your store
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]">
          Export <ArrowUpDown size={14} />
        </button>
      </div>

      {/* Search & Filter bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
          />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-violet-500/20"
          />
        </div>
        <select className="rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-violet-500/20">
          <option>All Status</option>
          <option>Completed</option>
          <option>Processing</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Table — overflow-visible so dropdowns aren't clipped */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-[var(--surface)]/95 backdrop-blur-xl">
              <tr className="border-b border-[var(--border)]">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Date
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/50">
              {orders.map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                const isOpen = openMenuId === order.id;
                return (
                  <tr
                    key={order.id}
                    className="relative transition-colors duration-150 hover:bg-[var(--hover-bg)]"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-[var(--text-primary)]">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--text-secondary)]">
                        {order.customer}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--text-secondary)]">
                        {order.product}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {order.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.bg} ${status.color}`}
                      >
                        <StatusIcon size={12} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[var(--text-tertiary)]">
                        {order.date}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(
                              isOpen ? null : order.id
                            );
                          }}
                          className="rounded p-1.5 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {isOpen && (
                          <ActionMenu
                            orderId={order.id}
                            onClose={() => setOpenMenuId(null)}
                            onEdit={(id) => {
                              const orderToEdit = orders.find(
                                (o) => o.id === id
                              );
                              if (orderToEdit) {
                                setOpenMenuId(null);
                                setEditingOrder(orderToEdit);
                              }
                            }}
                            onDelete={(id) => {
                              setOpenMenuId(null);
                              setDeletingOrderId(id);
                            }}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {orders.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-16 text-[var(--text-tertiary)]">
                      <ShoppingBag
                        size={48}
                        className="mb-4 opacity-50"
                      />
                      <p className="text-sm">No orders yet</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-tertiary)]">
          Showing{" "}
          {orders.length > 0
            ? "1-" + Math.min(7, orders.length)
            : 0}{" "}
          of {orders.length} orders
        </p>
        <div className="flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]">
            <ChevronLeft size={16} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500 bg-[var(--accent)] text-[var(--text-primary)]">
            1
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]">
            2
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]">
            3
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]">
            ...
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]">
            185
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Delete Modal */}
      {deletingOrderId && (
        <DeleteConfirmModal
          orderId={deletingOrderId}
          onClose={() => setDeletingOrderId(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}