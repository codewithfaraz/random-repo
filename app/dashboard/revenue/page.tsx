"use client";

import { useState, useMemo, useCallback } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Edit,
  Download,
  MoreHorizontal,
  X,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  CreditCard,
  Package,
  Search,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────── */
interface RevenueItem {
  id: string;
  customer: string;
  email: string;
  product: string;
  quantity: number;
  price: number;
  amount: number;
  status: "completed" | "pending" | "refunded" | "disputed";
  paymentMethod: "credit-card" | "paypal" | "apple-pay" | "bank-transfer";
  date: string;
}

type StatusFilter = "all" | "completed" | "pending" | "refunded" | "disputed";
type PaymentFilter = "all" | "credit-card" | "paypal" | "apple-pay" | "bank-transfer";
type SortOption = "newest" | "oldest" | "highest" | "lowest";

/* ── Sample data (20 rows) ───────────────────────────── */
const initialRevenue: RevenueItem[] = [
  {
    id: "#REV-1001",
    customer: "Sarah Mitchell",
    email: "sarah@example.com",
    product: "Premium Headphones",
    quantity: 2,
    price: 149.99,
    amount: 299.98,
    status: "completed",
    paymentMethod: "credit-card",
    date: "2026-05-12",
  },
  {
    id: "#REV-1002",
    customer: "Daniel Park",
    email: "daniel.park@mail.com",
    product: "4K Monitor",
    quantity: 1,
    price: 599.0,
    amount: 599.0,
    status: "completed",
    paymentMethod: "paypal",
    date: "2026-05-11",
  },
  {
    id: "#REV-1003",
    customer: "James Chen",
    email: "james.chen@email.com",
    product: "Wireless Keyboard",
    quantity: 3,
    price: 89.0,
    amount: 267.0,
    status: "pending",
    paymentMethod: "credit-card",
    date: "2026-05-11",
  },
  {
    id: "#REV-1004",
    customer: "Emma Rodriguez",
    email: "emma.r@email.com",
    product: "USB-C Hub",
    quantity: 5,
    price: 45.5,
    amount: 227.5,
    status: "completed",
    paymentMethod: "apple-pay",
    date: "2026-05-10",
  },
  {
    id: "#REV-1005",
    customer: "Liam O'Brien",
    email: "liam.obrien@email.com",
    product: "Mechanical Mouse",
    quantity: 1,
    price: 67.0,
    amount: 67.0,
    status: "refunded",
    paymentMethod: "credit-card",
    date: "2026-05-09",
  },
  {
    id: "#REV-1006",
    customer: "Aisha Patel",
    email: "aisha.p@email.com",
    product: "Laptop Stand",
    quantity: 2,
    price: 34.99,
    amount: 69.98,
    status: "completed",
    paymentMethod: "bank-transfer",
    date: "2026-05-08",
  },
  {
    id: "#REV-1007",
    customer: "Noah Williams",
    email: "noah.w@email.com",
    product: "Webcam HD",
    quantity: 4,
    price: 112.0,
    amount: 448.0,
    status: "completed",
    paymentMethod: "paypal",
    date: "2026-05-07",
  },
  {
    id: "#REV-1008",
    customer: "Sophia Lee",
    email: "sophia.lee@email.com",
    product: "Monitor Arm",
    quantity: 1,
    price: 78.5,
    amount: 78.5,
    status: "pending",
    paymentMethod: "credit-card",
    date: "2026-05-06",
  },
  {
    id: "#REV-1009",
    customer: "Mason Kim",
    email: "mason.k@email.com",
    product: "Bluetooth Speaker",
    quantity: 6,
    price: 59.99,
    amount: 359.94,
    status: "disputed",
    paymentMethod: "paypal",
    date: "2026-05-05",
  },
  {
    id: "#REV-1010",
    customer: "Olivia Davis",
    email: "olivia.d@email.com",
    product: "Desk Lamp",
    quantity: 2,
    price: 42.0,
    amount: 84.0,
    status: "completed",
    paymentMethod: "apple-pay",
    date: "2026-05-04",
  },
  {
    id: "#REV-1011",
    customer: "Ethan Brown",
    email: "ethan.b@email.com",
    product: "Cable Management Kit",
    quantity: 10,
    price: 24.99,
    amount: 249.9,
    status: "refunded",
    paymentMethod: "bank-transfer",
    date: "2026-05-03",
  },
  {
    id: "#REV-1012",
    customer: "Ava Thompson",
    email: "ava.t@email.com",
    product: "Wireless Charger",
    quantity: 3,
    price: 39.99,
    amount: 119.97,
    status: "completed",
    paymentMethod: "credit-card",
    date: "2026-05-02",
  },
  {
    id: "#REV-1013",
    customer: "Lucas Fernandez",
    email: "lucas.f@email.com",
    product: "Gaming Mousepad",
    quantity: 1,
    price: 34.99,
    amount: 34.99,
    status: "pending",
    paymentMethod: "paypal",
    date: "2026-05-01",
  },
  {
    id: "#REV-1014",
    customer: "Mia Johnson",
    email: "mia.j@email.com",
    product: "USB-C Hub",
    quantity: 2,
    price: 45.5,
    amount: 91.0,
    status: "completed",
    paymentMethod: "credit-card",
    date: "2026-04-30",
  },
  {
    id: "#REV-1015",
    customer: "Benjamin Clark",
    email: "ben.c@email.com",
    product: "Laptop Stand",
    quantity: 1,
    price: 34.99,
    amount: 34.99,
    status: "disputed",
    paymentMethod: "bank-transfer",
    date: "2026-04-29",
  },
  {
    id: "#REV-1016",
    customer: "Isabella Martinez",
    email: "isabella.m@email.com",
    product: "Mechanical Keyboard",
    quantity: 1,
    price: 129.99,
    amount: 129.99,
    status: "completed",
    paymentMethod: "apple-pay",
    date: "2026-04-28",
  },
  {
    id: "#REV-1017",
    customer: "Ethan Brown",
    email: "ethan.b@email.com",
    product: "Premium Headphones",
    quantity: 1,
    price: 149.99,
    amount: 149.99,
    status: "pending",
    paymentMethod: "credit-card",
    date: "2026-04-27",
  },
  {
    id: "#REV-1018",
    customer: "Sophia Lee",
    email: "sophia.lee@email.com",
    product: "Bluetooth Speaker",
    quantity: 2,
    price: 59.99,
    amount: 119.98,
    status: "refunded",
    paymentMethod: "paypal",
    date: "2026-04-26",
  },
  {
    id: "#REV-1019",
    customer: "Daniel Park",
    email: "daniel.park@mail.com",
    product: "Webcam HD",
    quantity: 3,
    price: 79.0,
    amount: 237.0,
    status: "completed",
    paymentMethod: "credit-card",
    date: "2026-04-25",
  },
  {
    id: "#REV-1020",
    customer: "Ava Thompson",
    email: "ava.t@email.com",
    product: "4K Monitor",
    quantity: 1,
    price: 599.0,
    amount: 599.0,
    status: "disputed",
    paymentMethod: "bank-transfer",
    date: "2026-04-24",
  },
];

/* ── Status config ────────────────────────────────────── */
const statusConfig: Record<
  RevenueItem["status"],
  { label: string; color: string; bg: string; icon: typeof CheckCircle2 }
> = {
  completed: {
    label: "Completed",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    icon: Clock,
  },
  refunded: {
    label: "Refunded",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    icon: ArrowUpDown,
  },
  disputed: {
    label: "Disputed",
    color: "text-red-400",
    bg: "bg-red-400/10",
    icon: AlertCircle,
  },
};

/* ── Payment method config ────────────────────────────── */
const paymentConfig: Record<
  RevenueItem["paymentMethod"],
  { label: string; icon: typeof CreditCard }
> = {
  "credit-card": { label: "Credit Card", icon: CreditCard },
  paypal: { label: "PayPal", icon: CreditCard },
  "apple-pay": { label: "Apple Pay", icon: CreditCard },
  "bank-transfer": { label: "Bank Transfer", icon: Package },
};

/* ── Stat card interface ──────────────────────────────── */
interface StatCard {
  label: string;
  value: string;
  icon: typeof DollarSign;
  color: string;
  bg: string;
  trend: "up" | "down";
  trendValue: string;
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
                <CheckCircle2
                  size={16}
                  className="text-emerald-400 flex-shrink-0"
                />
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
    [toast],
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

/* ── Action dropdown menu ─────────────────────────────── */
function ActionDropdown({
  item,
  onView,
  onDownload,
  onMarkPaid,
  onMarkRefund,
}: {
  item: RevenueItem;
  onView: (item: RevenueItem) => void;
  onDownload: (item: RevenueItem) => void;
  onMarkPaid: (item: RevenueItem) => void;
  onMarkRefund: (item: RevenueItem) => void;
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
            className="absolute right-0 top-full z-20 mt-1 w-52 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-[var(--shadow-color)]"
            style={{ zIndex: 9998 }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onView(item);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            >
              <Eye size={14} className="text-[var(--text-tertiary)]" />
              View Detail
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDownload(item);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            >
              <Download size={14} className="text-[var(--text-tertiary)]" />
              Download Invoice
            </button>
            {item.status === "pending" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  onMarkPaid(item);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
              >
                <CheckCircle2
                  size={14}
                  className="text-[var(--text-tertiary)]"
                />
                Mark as Paid
              </button>
            )}
            {item.status === "completed" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  onMarkRefund(item);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-400 transition-colors hover:bg-red-400/10"
              >
                <ArrowUpDown size={14} />
                Mark as Refund
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Stat cards calculation ───────────────────────────── */
function getStatCards(items: RevenueItem[]) {
  const totalRevenue = items.reduce((sum, i) => sum + i.amount, 0);
  const completedItems = items.filter((i) => i.status === "completed");
  const completedRevenue = completedItems.reduce(
    (sum, i) => sum + i.amount,
    0,
  );
  const refundedAmount = items
    .filter((i) => i.status === "refunded")
    .reduce((sum, i) => sum + i.amount, 0);
  const netRevenue = totalRevenue - refundedAmount;
  const avgOrderValue =
    items.length > 0 ? totalRevenue / items.length : 0;

  return [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      color: "text-violet-400",
      bg: "bg-violet-400/10",
      trend: "up" as const,
      trendValue: "+12.5%",
    },
    {
      label: "Avg Order Value",
      value: `$${avgOrderValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      trend: "up" as const,
      trendValue: "+5.2%",
    },
    {
      label: "Refunds",
      value: `$${refundedAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: TrendingDown,
      color: "text-red-400",
      bg: "bg-red-400/10",
      trend: "down" as const,
      trendValue: "-3.1%",
    },
    {
      label: "Net Revenue",
      value: `$${netRevenue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      trend: "up" as const,
      trendValue: "+8.7%",
    },
  ];
}

/* ── Main Component ───────────────────────────────────── */
export default function RevenuePage() {
  const [revenue, setRevenue] = useState<RevenueItem[]>(initialRevenue);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState<RevenueItem | null>(null);

  const itemsPerPage = 6;
  const { showToast, Toast } = useToast();

  /* ── Filter & sort logic ────────────────────────────── */
  const filteredAndSortedItems = useMemo(() => {
    let result = [...revenue];

    // Search: customer name or order/revenue ID
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.customer.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter);
    }

    // Payment method filter
    if (paymentFilter !== "all") {
      result = result.filter(
        (item) => item.paymentMethod === paymentFilter,
      );
    }

    // Date range filter
    if (dateFrom) {
      result = result.filter((item) => item.date >= dateFrom);
    }
    if (dateTo) {
      result = result.filter((item) => item.date <= dateTo);
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
        result.sort((a, b) => b.amount - a.amount);
        break;
      case "lowest":
        result.sort((a, b) => a.amount - b.amount);
        break;
    }

    return result;
  }, [revenue, searchQuery, statusFilter, paymentFilter, dateFrom, dateTo, sortBy]);

  /* ── Pagination calc ────────────────────────────────── */
  const totalPages = Math.ceil(
    filteredAndSortedItems.length / itemsPerPage,
  );
  const paginatedItems = filteredAndSortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const showingFrom = (currentPage - 1) * itemsPerPage + 1;
  const showingTo = Math.min(
    currentPage * itemsPerPage,
    filteredAndSortedItems.length,
  );

  // Reset to first page when filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as StatusFilter);
    setCurrentPage(1);
  };
  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentFilter(e.target.value as PaymentFilter);
    setCurrentPage(1);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1);
  };

  /* ── Action handlers ────────────────────────────────── */
  const handleViewItem = useCallback((item: RevenueItem) => {
    setViewItem(item);
    setIsViewModalOpen(true);
  }, []);

  const handleDownloadInvoice = useCallback(
    (item: RevenueItem) => {
      showToast(`Invoice for ${item.id} is being downloaded...`);
    },
    [showToast],
  );

  const handleMarkPaid = useCallback(
    (item: RevenueItem) => {
      setRevenue((prev) =>
        prev.map((r) =>
          r.id === item.id ? { ...r, status: "completed" } : r,
        ),
      );
      showToast(`${item.id} has been marked as paid`);
    },
    [showToast],
  );

  const handleMarkRefund = useCallback(
    (item: RevenueItem) => {
      setRevenue((prev) =>
        prev.map((r) =>
          r.id === item.id ? { ...r, status: "refunded" } : r,
        ),
      );
      showToast(`${item.id} has been marked as refunded`);
    },
    [showToast],
  );

  /* ── Stat cards data ────────────────────────────────── */
  const statCards = useMemo(
    () => getStatCards(revenue),
    [revenue],
  );

  /* ── Export report handler ───────────────────────────── */
  const handleExportReport = useCallback(() => {
    showToast("Revenue report exported successfully!");
  }, [showToast]);

  /* ── Refresh handler ─────────────────────────────────── */
  const handleRefresh = useCallback(() => {
    setSearchQuery("");
    setStatusFilter("all");
    setPaymentFilter("all");
    setDateFrom("");
    setDateTo("");
    setSortBy("newest");
    setCurrentPage(1);
    showToast("Revenue data refreshed");
  }, [showToast]);

  /* ── Render ──────────────────────────────────────────── */
  return (
    <div className="space-y-6">
      {/* Toast */}
      {Toast && Toast()}

      {/* PageHeader */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Revenue
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Track and manage all revenue transactions in one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportReport}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
          >
            <Download size={16} />
            Export Report
          </button>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          const trendColor =
            stat.trend === "up" ? "text-emerald-400" : "text-red-400";
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
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {stat.value}
                </p>
                <span
                  className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}
                >
                  <TrendIcon size={12} />
                  {stat.trendValue}
                </span>
              </div>
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
            placeholder="Search by customer or revenue ID..."
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
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
              <option value="disputed">Disputed</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
          </div>

          {/* Payment Method Filter */}
          <div className="relative">
            <select
              value={paymentFilter}
              onChange={handlePaymentChange}
              className="appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 pr-8 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
            >
              <option value="all">All Payment</option>
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="apple-pay">Apple Pay</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
            <CreditCard
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
          </div>

          {/* Date From */}
          <div className="relative">
            <Calendar
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
            />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] pl-9 pr-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
              title="Date from"
            />
          </div>

          {/* Date To */}
          <div className="relative">
            <Calendar
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] pl-9 pr-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
              title="Date to"
            />
          </div>

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
          {(searchQuery ||
            statusFilter !== "all" ||
            paymentFilter !== "all" ||
            dateFrom ||
            dateTo ||
            sortBy !== "newest") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setPaymentFilter("all");
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
        {filteredAndSortedItems.length} result
        {filteredAndSortedItems.length !== 1 ? "s" : ""}
      </p>

      {/* Data Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[var(--table-divider)] bg-[var(--table-header-bg)]">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Revenue ID
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
                  Date
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--table-divider)]">
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => {
                  const status = statusConfig[item.status];
                  const StatusIcon = status.icon;
                  const PaymentIcon =
                    paymentConfig[item.paymentMethod].icon;
                  return (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-[var(--table-row-hover)]"
                    >
                      {/* Revenue ID */}
                      <td className="px-6 py-4">
                        <span className="font-medium text-[var(--text-primary)]">
                          {item.id}
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
                              {item.customer}
                            </p>
                            <p className="text-xs text-[var(--text-tertiary)]">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Package
                            size={14}
                            className="text-[var(--text-tertiary)] flex-shrink-0"
                          />
                          <span className="text-sm text-[var(--text-secondary)]">
                            {item.product}
                          </span>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-[var(--text-secondary)]">
                          {item.quantity}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          ${item.amount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-[var(--text-secondary)]">
                          {item.date}
                        </span>
                      </td>

                      {/* Payment Method */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <PaymentIcon
                            size={14}
                            className="text-[var(--text-tertiary)]"
                          />
                          <span className="text-sm text-[var(--text-secondary)]">
                            {paymentConfig[item.paymentMethod].label}
                          </span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.bg} ${status.color}`}
                        >
                          <StatusIcon size={12} className={status.color} />
                          {status.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <ActionDropdown
                          item={item}
                          onView={handleViewItem}
                          onDownload={handleDownloadInvoice}
                          onMarkPaid={handleMarkPaid}
                          onMarkRefund={handleMarkRefund}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center"
                  >
                    <Clock
                      size={32}
                      className="mx-auto mb-3 text-[var(--text-tertiary)]"
                    />
                    <p className="text-sm text-[var(--text-secondary)]">
                      No revenue records match your filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setPaymentFilter("all");
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
        <p className="text-sm text-[var(--text-tertiary)]">
          Showing{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {filteredAndSortedItems.length > 0 ? showingFrom : 0}
          </span>{" "}
          –{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {showingTo}
          </span>{" "}
          of{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {filteredAndSortedItems.length}
          </span>{" "}
          revenue records
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(p - 1, 1))
            }
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
            aria-label="Previous page"
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
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
            ),
          )}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
            aria-label="Next page"
          >
            →
          </button>
        </div>
      </div>

      {/* ── View Detail Modal ──────────────────────────── */}
      {isViewModalOpen && viewItem && (
        <ModalOverlay onClose={() => setIsViewModalOpen(false)}>
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--table-divider)] px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  Revenue Details
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                  {viewItem.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusConfig[viewItem.status].bg} ${statusConfig[viewItem.status].color}`}
                >
                  {statusConfig[viewItem.status].label}
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
                <div className="col-span-2 flex items-center gap-1.5">
                  {(() => { const PaymentIcon = paymentConfig[viewItem.paymentMethod]?.icon; return PaymentIcon ? <PaymentIcon size={14} className="text-[var(--text-tertiary)]" /> : null; })()}
                  <span className="text-sm text-[var(--text-secondary)]">
                    {paymentConfig[viewItem.paymentMethod].label}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Customer
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {viewItem.customer}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {viewItem.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Product
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {viewItem.product}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Quantity
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {viewItem.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Unit Price
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    ${viewItem.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Total Amount
                  </p>
                  <p className="text-lg font-bold text-[var(--text-primary)]">
                    ${viewItem.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Date
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {viewItem.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Status
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusConfig[viewItem.status].bg} ${statusConfig[viewItem.status].color}`}
                    >
                      {statusConfig[viewItem.status].label}
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
                  showToast(`Opening editor for ${viewItem.id}`);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleDownloadInvoice(viewItem);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
              >
                <Download size={14} />
                Download Invoice
              </button>
              {viewItem.status === "completed" && (
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleMarkRefund(viewItem);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-400/20"
                >
                  <ArrowUpDown size={14} />
                  Mark as Refund
                </button>
              )}
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}