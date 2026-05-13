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
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    icon: CheckCircle2,
  },
  processing: {
    label: "Processing",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    icon: Clock,
  },
  pending: {
    label: "Pending",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    icon: Clock,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-400",
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
      className="absolute right-0 top-2 z-50 w-48 rounded-xl border border-white/10 bg-[#161625] p-1 shadow-2xl shadow-black/60 backdrop-blur-xl"
      role="menu"
      onMouseDown={(e) => e.preventDefault()}
    >
      <button
        onClick={() => {
          onEdit(orderId);
          onClose();
        }}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-white/70 transition-all hover:bg-white/10 hover:text-white focus:bg-white/10 focus:outline-none"
        role="menuitem"
      >
        <span className="text-blue-400">✏️</span>
        <span>Edit Order</span>
      </button>
      <button
        onClick={() => {
          onDelete(orderId);
          onClose();
        }}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-400/80 transition-all hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10 focus:outline-none"
        role="menuitem"
      >
        <span>🗑️</span>
        <span>Delete Order</span>
      </button>
    </div>
  );
}

/* ── Component ─────────────────────────────────────── */
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
          <h2 className="text-lg font-bold tracking-tight text-white">
            Recent Orders
          </h2>
          <p className="text-sm text-white/40">
            Latest transactions from your store
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white">
          Export <ArrowUpDown size={14} />
        </button>
      </div>

      {/* Search & Filter bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white/80 placeholder:text-white/25 outline-none transition-all focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
          />
        </div>
        <select className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/60 outline-none transition-all focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20">
          <option>All Status</option>
          <option>Completed</option>
          <option>Processing</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Table — overflow-visible so dropdowns aren't clipped */}
      <div className="rounded-2xl border border-white/10">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-[#0a0a0f]">
              <tr className="border-b border-white/10">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Date
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                const isOpen = openMenuId === order.id;
                return (
                  <tr
                    key={order.id}
                    className="relative transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-white">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/70">
                        {order.customer}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/60">
                        {order.product}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
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
                      <span className="text-sm text-white/50">
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
                          className="rounded p-1.5 text-white/30 transition-all hover:bg-white/10 hover:text-white"
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
                    <div className="flex flex-col items-center justify-center py-16 text-white/40">
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
        <p className="text-sm text-white/40">
          Showing{" "}
          {orders.length > 0
            ? "1-" + Math.min(7, orders.length)
            : 0}{" "}
          of {orders.length} orders
        </p>
        <div className="flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white">
            <ChevronLeft size={16} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500 bg-violet-500 text-white">
            1
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white">
            2
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white">
            3
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white">
            ...
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white">
            185
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white">
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