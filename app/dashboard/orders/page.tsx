"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Download,
  MoreHorizontal,
  X,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────── */
interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  quantity: number;
  price: number;
  amount: string;
  status: "completed" | "processing" | "pending" | "cancelled";
  date: string;
}

type SortOption = "newest" | "oldest" | "highest" | "lowest";
type StatusFilter = "all" | "completed" | "processing" | "pending" | "cancelled";

/* ── Sample data (15 rows) ───────────────────────────── */
const initialOrders: Order[] = [
  {
    id: "#ORD-7821",
    customer: "Sarah Mitchell",
    email: "sarah@example.com",
    product: "Premium Headphones",
    quantity: 1,
    price: 149.99,
    amount: "$149.99",
    status: "completed",
    date: "2026-05-12",
  },
  {
    id: "#ORD-7822",
    customer: "Daniel Park",
    email: "daniel.park@mail.com",
    product: "4K Monitor",
    quantity: 1,
    price: 599.0,
    amount: "$599.00",
    status: "processing",
    date: "2026-05-11",
  },
  {
    id: "#ORD-7820",
    customer: "James Chen",
    email: "james.chen@email.com",
    product: "Wireless Keyboard",
    quantity: 2,
    price: 89.0,
    amount: "$178.00",
    status: "processing",
    date: "2026-05-11",
  },
  {
    id: "#ORD-7819",
    customer: "Emma Rodriguez",
    email: "emma.r@email.com",
    product: "USB-C Hub",
    quantity: 3,
    price: 45.5,
    amount: "$136.50",
    status: "pending",
    date: "2026-05-10",
  },
  {
    id: "#ORD-7818",
    customer: "Liam O'Brien",
    email: "liam.obrien@email.com",
    product: "Mechanical Mouse",
    quantity: 1,
    price: 67.0,
    amount: "$67.00",
    status: "completed",
    date: "2026-05-09",
  },
  {
    id: "#ORD-7817",
    customer: "Aisha Patel",
    email: "aisha.p@email.com",
    product: "Laptop Stand",
    quantity: 1,
    price: 34.99,
    amount: "$34.99",
    status: "cancelled",
    date: "2026-05-08",
  },
  {
    id: "#ORD-7816",
    customer: "Noah Williams",
    email: "noah.w@email.com",
    product: "Webcam HD",
    quantity: 2,
    price: 112.0,
    amount: "$224.00",
    status: "completed",
    date: "2026-05-07",
  },
  {
    id: "#ORD-7815",
    customer: "Sophia Lee",
    email: "sophia.lee@email.com",
    product: "Monitor Arm",
    quantity: 1,
    price: 78.5,
    amount: "$78.50",
    status: "processing",
    date: "2026-05-06",
  },
  {
    id: "#ORD-7814",
    customer: "Mason Kim",
    email: "mason.k@email.com",
    product: "Bluetooth Speaker",
    quantity: 4,
    price: 59.99,
    amount: "$239.96",
    status: "pending",
    date: "2026-05-05",
  },
  {
    id: "#ORD-7813",
    customer: "Olivia Davis",
    email: "olivia.d@email.com",
    product: "Desk Lamp",
    quantity: 1,
    price: 42.0,
    amount: "$42.00",
    status: "completed",
    date: "2026-05-04",
  },
  {
    id: "#ORD-7812",
    customer: "Ethan Brown",
    email: "ethan.b@email.com",
    product: "Cable Management Kit",
    quantity: 5,
    price: 24.99,
    amount: "$124.95",
    status: "cancelled",
    date: "2026-05-03",
  },
  {
    id: "#ORD-7811",
    customer: "Ava Thompson",
    email: "ava.t@email.com",
    product: "Wireless Charger",
    quantity: 2,
    price: 39.99,
    amount: "$79.98",
    status: "pending",
    date: "2026-05-02",
  },
  {
    id: "#ORD-7810",
    customer: "Lucas Fernandez",
    email: "lucas.f@email.com",
    product: "Gaming Mousepad",
    quantity: 1,
    price: 34.99,
    amount: "$34.99",
    status: "processing",
    date: "2026-05-01",
  },
  {
    id: "#ORD-7809",
    customer: "Mia Johnson",
    email: "mia.j@email.com",
    product: "USB-C Hub",
    quantity: 1,
    price: 45.5,
    amount: "$45.50",
    status: "completed",
    date: "2026-04-30",
  },
  {
    id: "#ORD-7808",
    customer: "Benjamin Clark",
    email: "ben.c@email.com",
    product: "Laptop Stand",
    quantity: 1,
    price: 34.99,
    amount: "$34.99",
    status: "pending",
    date: "2026-04-29",
  },
];

/* ── Status config ────────────────────────────────────── */
const statusConfig: Record<
  Order["status"],
  { label: string; color: string; bg: string; icon: typeof CheckCircle2 }
> = {
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
    icon: RefreshCw,
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
    icon: AlertCircle,
  },
};

/* ── Stat card config ─────────────────────────────────── */
interface StatCard {
  label: string;
  count: number;
  icon: typeof CheckCircle2;
  color: string;
  bg: string;
}

function getStatCards(orders: Order[]): StatCard[] {
  const total = orders.length;
  const completed = orders.filter((o) => o.status === "completed").length;
  const processing = orders.filter((o) => o.status === "processing").length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;

  return [
    {
      label: "Total Orders",
      count: total,
      icon: Filter,
      color: "text-violet-400",
      bg: "bg-violet-400/10",
    },
    {
      label: "Completed",
      count: completed,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Processing",
      count: processing,
      icon: RefreshCw,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Pending",
      count: pending,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Cancelled",
      count: cancelled,
      icon: AlertCircle,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
  ];
}

/* ── Toast notification ───────────────────────────────── */
function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    visible: boolean;
  } | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const Toast = useMemo(
    () =>
      toast
        ? () => (
            <div
              style={{ zIndex: 9999 }}
              className="fixed bottom-6 right-6 transform rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 shadow-lg shadow-[var(--shadow-color)] transition-all animate-in fade-in slide-in-from-bottom-4"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {toast.message}
                </p>
                <button
                  onClick={() => setToast(null)}
                  className="ml-2 rounded-full p-0.5 text-[var(--text-tertiary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )
        : null,
    [toast]
  );

  return { showToast, Toast };
}

/* ── Modal overlay ────────────────────────────────────── */
function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4"
      style={{ backgroundColor: "var(--modal-overlay)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl shadow-[var(--shadow-color)]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Dropdown menu for actions ────────────────────────── */
function ActionDropdown({
  order,
  onView,
  onEdit,
  onCancel,
}: {
  order: Order;
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onCancel: (order: Order, setOrders: React.Dispatch<React.SetStateAction<Order[]>>) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="rounded-lg p-1.5 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
        aria-label="Actions"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-[var(--shadow-color)]"
            style={{ zIndex: 9998 }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onView(order);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            >
              <Eye size={14} className="text-[var(--text-tertiary)]" />
              View Order
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onEdit(order);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            >
              <ArrowUpDown size={14} className="text-[var(--text-tertiary)]" />
              Edit Order
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onCancel(order, () => {});
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-400 transition-colors hover:bg-red-400/10"
            >
              <Trash2 size={14} />
              Cancel Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Main Component ───────────────────────────────────── */
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const itemsPerPage = 6;
  const { showToast, Toast } = useToast();

  /* ── Filter & sort logic ────────────────────────────── */
  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];

    // Search: customer name or order ID
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.customer.toLowerCase().includes(q) ||
          o.id.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }

    // Date range filter
    if (dateFrom) {
      result = result.filter((o) => o.date >= dateFrom);
    }
    if (dateTo) {
      result = result.filter((o) => o.date <= dateTo);
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => (a.date > b.date ? -1 : 1));
        break;
      case "oldest":
        result.sort((a, b) => (a.date < b.date ? -1 : 1));
        break;
      case "highest":
        result.sort((a, b) => b.price * b.quantity - a.price * a.quantity);
        break;
      case "lowest":
        result.sort((a, b) => a.price * a.quantity - b.price * b.quantity);
        break;
    }

    return result;
  }, [orders, searchQuery, statusFilter, dateFrom, dateTo, sortBy]);

  /* ── Pagination calc ────────────────────────────────── */
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const paginatedOrders = filteredAndSortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const showingFrom = (currentPage - 1) * itemsPerPage + 1;
  const showingTo = Math.min(currentPage * itemsPerPage, filteredAndSortedOrders.length);

  // Reset to first page when filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as StatusFilter);
    setCurrentPage(1);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1);
  };

  /* ── Action handlers ────────────────────────────────── */
  const handleViewOrder = useCallback((order: Order) => {
    setViewOrder(order);
    setIsViewModalOpen(true);
  }, []);

  const handleEditOrder = useCallback(
    (order: Order) => {
      showToast(`Opening editor for ${order.id}`);
    },
    [showToast]
  );

  const handleCancelOrder = useCallback(
    (order: Order) => {
      if (window.confirm(`Are you sure you want to cancel order ${order.id}?`)) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === order.id ? { ...o, status: "cancelled" } : o
          )
        );
        showToast(`Order ${order.id} has been cancelled`);
      }
    },
    [showToast]
  );

  /* ── New Order submit ───────────────────────────────── */
  const handleNewOrderSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const customerName = formData.get("customerName") as string;
      const email = formData.get("email") as string;
      const product = formData.get("product") as string;
      const quantity = parseInt(formData.get("quantity") as string, 10);
      const price = parseFloat(formData.get("price") as string);

      if (!customerName || !email || !product || !quantity || !price) {
        showToast("Please fill in all fields");
        return;
      }

      const newOrder: Order = {
        id: `#ORD-${7830 + orders.length}`,
        customer: customerName,
        email,
        product,
        quantity,
        price,
        amount: `$${(quantity * price).toFixed(2)}`,
        status: "pending",
        date: new Date().toISOString().split("T")[0],
      };

      setOrders((prev) => [newOrder, ...prev]);
      setIsNewOrderModalOpen(false);
      showToast(`Order #${newOrder.id} created successfully`);
    },
    [orders.length, showToast]
  );

  /* ── Stat cards data ────────────────────────────────── */
  const statCards = useMemo(() => getStatCards(orders), [orders]);

  /* ── Render ──────────────────────────────────────────── */
  return (
    <div className="space-y-6">
      {/* PageHeader */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Orders
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Manage and track all your orders in one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
          >
            <Download size={16} />
            Export
          </button>
          <button
            onClick={() => setIsNewOrderModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
          >
            <Plus size={16} />
            New Order
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--text-secondary)]">
                  {stat.label}
                </p>
                <div
                  className={`rounded-lg bg-[var(--hover-bg)] p-2 ${stat.color.replace("text-", "text-opacity-60 ")}`}
                >
                  <Icon size={18} className={`${stat.color} flex-shrink-0`} />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                {stat.count}
              </p>
            </div>
          );
        })}
      </div>

      {/* Search, Filter & Sort Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
          />
          <input
            type="text"
            placeholder="Search by customer or order ID..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 pr-8 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
          </div>

          {/* Date From */}
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
            title="Date from"
          />

          {/* Date To */}
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
            title="Date to"
          />

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 pr-8 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </select>
            <ArrowUpDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
          </div>

          {/* Clear Filters */}
          {(searchQuery || statusFilter !== "all" || dateFrom || dateTo || sortBy !== "newest") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setDateFrom("");
                setDateTo("");
                setSortBy("newest");
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--text-tertiary)]">
        {filteredAndSortedOrders.length} result
        {filteredAndSortedOrders.length !== 1 ? "s" : ""}
      </p>

      {/* Data Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--table-divider)] bg-[var(--table-header-bg)]">
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
                  Qty
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
                <th className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--table-divider)]">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;
                  return (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-[var(--table-row-hover)]"
                    >
                      {/* Order ID */}
                      <td className="px-6 py-4">
                        <span className="font-medium text-[var(--text-primary)]">
                          {order.id}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--hover-bg)]">
                            <Eye size={14} className="text-[var(--text-secondary)]" />
                          </div>
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">
                              {order.customer}
                            </p>
                            <p className="text-xs text-[var(--text-tertiary)]">
                              {order.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-[var(--text-secondary)]">
                          {order.product}
                        </span>
                      </td>

                      {/* Quantity */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-[var(--text-secondary)]">
                          {order.quantity}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {order.amount}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.bg} ${status.color}`}
                        >
                          <StatusIcon size={12} className={`${status.color}`} />
                          {status.label}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-[var(--text-secondary)]">
                          {order.date}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <ActionDropdown
                          order={order}
                          onView={handleViewOrder}
                          onEdit={handleEditOrder}
                          onCancel={handleCancelOrder}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center"
                  >
                    <Clock
                      size={32}
                      className="mx-auto mb-3 text-[var(--text-tertiary)]"
                    />
                    <p className="text-sm text-[var(--text-secondary)]">
                      No orders match your filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setDateFrom("");
                        setDateTo("");
                        setSortBy("newest");
                      }}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
                    >
                      <RefreshCw size={14} />
                      Reset Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          Showing{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {filteredAndSortedOrders.length > 0 ? showingFrom : 0}
          </span>{" "}
          –{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {showingTo}
          </span>{" "}
          of{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {filteredAndSortedOrders.length}
          </span>{" "}
          orders
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
            aria-label="Previous page"
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
                page === currentPage
                  ? "border-violet-500 bg-violet-500/10 text-violet-400 font-semibold"
                  : "border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
              }`}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
            aria-label="Next page"
          >
            →
          </button>
        </div>
      </div>

      {/* ── New Order Modal ──────────────────────────── */}
      {isNewOrderModalOpen && (
        <ModalOverlay onClose={() => setIsNewOrderModalOpen(false)}>
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--table-divider)] px-6 py-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                New Order
              </h2>
              <button
                onClick={() => setIsNewOrderModalOpen(false)}
                className="rounded-lg p-1 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleNewOrderSubmit} className="space-y-4 p-6">
              <div>
                <label
                  htmlFor="customerName"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Customer Name
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="product"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Product
                </label>
                <input
                  id="product"
                  name="product"
                  type="text"
                  placeholder="Wireless Mouse"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                  >
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    placeholder="1"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                  >
                    Price ($)
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="29.99"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-transparent bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-violet-600"
                >
                  <Plus size={14} />
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* ── View Order Detail Modal ─────────────────────── */}
      {isViewModalOpen && viewOrder && (
        <ModalOverlay onClose={() => setIsViewModalOpen(false)}>
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--table-divider)] px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  Order Details
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                  {viewOrder.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    statusConfig[viewOrder.status].bg
                  } ${statusConfig[viewOrder.status].color}`}
                >
                  {statusConfig[viewOrder.status].label}
                </span>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="rounded-lg p-1 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Detail body */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Customer
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {viewOrder.customer}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {viewOrder.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Product
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {viewOrder.product}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Quantity
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {viewOrder.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Unit Price
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    ${viewOrder.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Total Amount
                  </p>
                  <p className="text-lg font-bold text-[var(--text-primary)]">
                    {viewOrder.amount}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Order Date
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {viewOrder.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Status
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        statusConfig[viewOrder.status].bg
                      } ${statusConfig[viewOrder.status].color}`}
                    >
                      {statusConfig[viewOrder.status].label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-3 border-t border-[var(--table-divider)] px-6 py-4">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  showToast(`Opening editor for ${viewOrder.id}`);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
              >
                <ArrowUpDown size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleCancelOrder(viewOrder);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-400/20"
              >
                <Trash2 size={14} />
                Cancel Order
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Toast */}
      {Toast && Toast()}
    </div>
  );
}