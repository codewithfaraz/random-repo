"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  User,
  Mail,
  Phone,
  Building2,
  MoreHorizontal,
  X,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────── */
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  orders: number;
  totalSpent: number;
  status: "active" | "inactive" | "suspended";
  joined: string;
  address: string;
}

type SortOption = "az" | "za" | "orders-asc" | "orders-desc" | "joined-newest" | "joined-oldest";
type StatusFilter = "all" | "active" | "inactive" | "suspended";

/* ── Sample data (18 rows) ───────────────────────────── */
const initialCustomers: Customer[] = [
  {
    id: "CUS-001",
    name: "Sarah Mitchell",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    company: "Mitchell & Associates",
    orders: 24,
    totalSpent: 2340.0,
    status: "active",
    joined: "2024-01-15",
    address: "123 Oak St, San Francisco, CA",
  },
  {
    id: "CUS-002",
    name: "James Chen",
    email: "james.chen@email.com",
    phone: "+1 (555) 345-6789",
    company: "Chen Industries",
    orders: 18,
    totalSpent: 1890.5,
    status: "active",
    joined: "2024-02-20",
    address: "456 Pine Ave, Seattle, WA",
  },
  {
    id: "CUS-003",
    name: "Emma Rodriguez",
    email: "emma.r@email.com",
    phone: "+1 (555) 456-7890",
    company: "Rodriguez LLC",
    orders: 42,
    totalSpent: 4120.75,
    status: "active",
    joined: "2023-11-05",
    address: "789 Elm Blvd, Austin, TX",
  },
  {
    id: "CUS-004",
    name: "Liam O'Brien",
    email: "liam.obrien@email.com",
    phone: "+1 (555) 567-8901",
    company: "O'Brien Consulting",
    orders: 7,
    totalSpent: 560.0,
    status: "inactive",
    joined: "2024-06-12",
    address: "321 Maple Dr, Denver, CO",
  },
  {
    id: "CUS-005",
    name: "Aisha Patel",
    email: "aisha.p@email.com",
    phone: "+1 (555) 678-9012",
    company: "Patel Technologies",
    orders: 31,
    totalSpent: 3450.2,
    status: "active",
    joined: "2024-03-08",
    address: "654 Cedar Ln, Boston, MA",
  },
  {
    id: "CUS-006",
    name: "Noah Williams",
    email: "noah.w@email.com",
    phone: "+1 (555) 789-0123",
    company: "Williams Group",
    orders: 12,
    totalSpent: 980.0,
    status: "suspended",
    joined: "2024-04-22",
    address: "987 Birch Way, Chicago, IL",
  },
  {
    id: "CUS-007",
    name: "Sophia Lee",
    email: "sophia.lee@email.com",
    phone: "+1 (555) 890-1234",
    company: "Lee Enterprises",
    orders: 56,
    totalSpent: 6780.9,
    status: "active",
    joined: "2023-09-14",
    address: "246 Walnut St, Portland, OR",
  },
  {
    id: "CUS-008",
    name: "Mason Kim",
    email: "mason.k@email.com",
    phone: "+1 (555) 901-2345",
    company: "Kim Design Studio",
    orders: 3,
    totalSpent: 245.0,
    status: "inactive",
    joined: "2025-01-30",
    address: "135 Spruce Ct, Miami, FL",
  },
  {
    id: "CUS-009",
    name: "Olivia Davis",
    email: "olivia.d@email.com",
    phone: "+1 (555) 012-3456",
    company: "Davis Media",
    orders: 15,
    totalSpent: 1670.3,
    status: "active",
    joined: "2024-07-19",
    address: "864 Ash Pl, Atlanta, GA",
  },
  {
    id: "CUS-010",
    name: "Ethan Brown",
    email: "ethan.b@email.com",
    phone: "+1 (555) 123-4567",
    company: "Brown & Sons",
    orders: 9,
    totalSpent: 830.0,
    status: "active",
    joined: "2024-09-02",
    address: "753 Willow Rd, Denver, CO",
  },
  {
    id: "CUS-011",
    name: "Isabella Martinez",
    email: "isabella.m@email.com",
    phone: "+1 (555) 234-5679",
    company: "Martinez Holdings",
    orders: 28,
    totalSpent: 3210.0,
    status: "active",
    joined: "2024-05-10",
    address: "159 Poplar Ave, Phoenix, AZ",
  },
  {
    id: "CUS-012",
    name: "William Johnson",
    email: "w.johnson@email.com",
    phone: "+1 (555) 345-6790",
    company: "Johnson Corp",
    orders: 5,
    totalSpent: 420.0,
    status: "inactive",
    joined: "2024-08-25",
    address: "753 Hickory St, Dallas, TX",
  },
  {
    id: "CUS-013",
    name: "Ava Thompson",
    email: "ava.t@email.com",
    phone: "+1 (555) 456-7891",
    company: "Thompson Solutions",
    orders: 37,
    totalSpent: 5430.0,
    status: "active",
    joined: "2023-12-01",
    address: "246 Sycamore Dr, San Diego, CA",
  },
  {
    id: "CUS-014",
    name: "Lucas Fernandez",
    email: "lucas.f@email.com",
    phone: "+1 (555) 567-8902",
    company: "Fernandez Inc",
    orders: 11,
    totalSpent: 1150.0,
    status: "suspended",
    joined: "2024-10-15",
    address: "369 Juniper Blvd, Orlando, FL",
  },
  {
    id: "CUS-015",
    name: "Mia Johnson",
    email: "mia.j@email.com",
    phone: "+1 (555) 678-9013",
    company: "Johnson Creative",
    orders: 6,
    totalSpent: 680.0,
    status: "active",
    joined: "2025-02-14",
    address: "147 Redwood Way, San Jose, CA",
  },
  {
    id: "CUS-016",
    name: "Benjamin Clark",
    email: "ben.c@email.com",
    phone: "+1 (555) 789-0124",
    company: "Clark Analytics",
    orders: 20,
    totalSpent: 2560.0,
    status: "active",
    joined: "2024-04-03",
    address: "258 Sycamore Ln, Nashville, TN",
  },
  {
    id: "CUS-017",
    name: "Harper Wilson",
    email: "harper.w@email.com",
    phone: "+1 (555) 890-1235",
    company: "Wilson Digital",
    orders: 2,
    totalSpent: 175.0,
    status: "inactive",
    joined: "2025-03-20",
    address: "369 Cypress Ct, Raleigh, NC",
  },
  {
    id: "CUS-018",
    name: "Daniel Park",
    email: "daniel.park@mail.com",
    phone: "+1 (555) 901-2346",
    company: "Park Ventures",
    orders: 44,
    totalSpent: 8920.0,
    status: "active",
    joined: "2023-06-18",
    address: "741 Birch Ave, Los Angeles, CA",
  },
];

/* ── Status config ────────────────────────────────────── */
const statusConfig: Record<
  Customer["status"],
  { label: string; color: string; bg: string; icon: typeof CheckCircle2 }
> = {
  active: {
    label: "Active",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    icon: CheckCircle2,
  },
  inactive: {
    label: "Inactive",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    icon: Clock,
  },
  suspended: {
    label: "Suspended",
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

function getStatCards(customers: Customer[]): StatCard[] {
  const total = customers.length;
  const active = customers.filter((c) => c.status === "active").length;
  const inactive = customers.filter((c) => c.status === "inactive").length;
  const suspended = customers.filter((c) => c.status === "suspended").length;

  return [
    {
      label: "Total Customers",
      count: total,
      icon: User,
      color: "text-violet-400",
      bg: "bg-violet-400/10",
    },
    {
      label: "Active",
      count: active,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Inactive",
      count: inactive,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Suspended",
      count: suspended,
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
    type?: "success" | "error";
  } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, visible: true, type });
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
                {toast.type === "success" ? (
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                )}
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
  customer,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  customer: Customer;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onToggleStatus: (customer: Customer) => void;
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
                onView(customer);
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
                onEdit(customer);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            >
              <Edit size={14} className="text-[var(--text-tertiary)]" />
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onToggleStatus(customer);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            >
              {customer.status === "active" ? (
                <>
                  <X size={14} className="text-[var(--text-tertiary)]" />
                  Suspend
                </>
              ) : (
                <>
                  <CheckCircle2 size={14} className="text-[var(--text-tertiary)]" />
                  Activate
                </>
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDelete(customer);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-400 transition-colors hover:bg-red-400/10"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Main Component ───────────────────────────────────── */
export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("joined-newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Customer | null>(null);

  const itemsPerPage = 6;
  const { showToast, Toast } = useToast();

  /* ── Filter & sort logic ────────────────────────────── */
  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...customers];

    // Search: name, email, or ID
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "orders-asc":
        result.sort((a, b) => a.orders - b.orders);
        break;
      case "orders-desc":
        result.sort((a, b) => b.orders - a.orders);
        break;
      case "joined-newest":
        result.sort((a, b) => (a.joined > b.joined ? -1 : 1));
        break;
      case "joined-oldest":
        result.sort((a, b) => (a.joined < b.joined ? -1 : 1));
        break;
    }

    return result;
  }, [customers, searchQuery, statusFilter, sortBy]);

  /* ── Pagination calc ────────────────────────────────── */
  const totalPages = Math.ceil(filteredAndSortedCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredAndSortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const showingFrom = (currentPage - 1) * itemsPerPage + 1;
  const showingTo = Math.min(currentPage * itemsPerPage, filteredAndSortedCustomers.length);

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
  const handleViewCustomer = useCallback((customer: Customer) => {
    setViewCustomer(customer);
    setIsViewModalOpen(true);
  }, []);

  const handleEditCustomer = useCallback((customer: Customer) => {
    setEditCustomer({ ...customer });
    setIsEditModalOpen(true);
  }, []);

  const handleDeleteCustomer = useCallback(
    (customer: Customer) => {
      setDeleteConfirm(customer);
    },
    []
  );

  const confirmDelete = useCallback(() => {
    if (!deleteConfirm) return;
    setCustomers((prev) => prev.filter((c) => c.id !== deleteConfirm.id));
    showToast(`Customer ${deleteConfirm.name} has been deleted`, "success");
    setDeleteConfirm(null);
  }, [deleteConfirm, showToast]);

  const handleToggleStatus = useCallback(
    (customer: Customer) => {
      const newStatus: Customer["status"] =
        customer.status === "active" ? "suspended" : "active";
      setCustomers((prev) =>
        prev.map((c) => (c.id === customer.id ? { ...c, status: newStatus } : c))
      );
      showToast(
        `${customer.name} has been ${newStatus === "active" ? "activated" : "suspended"}`,
        "success"
      );
    },
    [showToast]
  );

  /* ── Add Customer submit ────────────────────────────── */
  const handleAddCustomerSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("fullName") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const company = formData.get("company") as string;

      if (!name || !email || !phone || !company) {
        showToast("Please fill in all fields", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address", "error");
        return;
      }

      // Check duplicate email
      if (customers.some((c) => c.email.toLowerCase() === email.toLowerCase())) {
        showToast("A customer with this email already exists", "error");
        return;
      }

      const newCustomer: Customer = {
        id: `CUS-${String(customers.length + 1).padStart(3, "0")}`,
        name,
        email,
        phone,
        company,
        orders: 0,
        totalSpent: 0,
        status: "active",
        joined: new Date().toISOString().split("T")[0],
        address: "",
      };

      setCustomers((prev) => [newCustomer, ...prev]);
      setIsAddModalOpen(false);
      showToast(`Customer ${name} added successfully`, "success");
    },
    [customers, showToast]
  );

  /* ── Edit Customer submit ───────────────────────────── */
  const handleEditCustomerSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!editCustomer) return;

      const formData = new FormData(e.currentTarget);
      const name = formData.get("fullName") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const company = formData.get("company") as string;

      if (!name || !email || !phone || !company) {
        showToast("Please fill in all fields", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address", "error");
        return;
      }

      // Check duplicate email (excluding current customer)
      if (
        customers.some(
          (c) =>
            c.email.toLowerCase() === email.toLowerCase() && c.id !== editCustomer.id
        )
      ) {
        showToast("A customer with this email already exists", "error");
        return;
      }

      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editCustomer.id
            ? { ...c, name, email, phone, company }
            : c
        )
      );
      setIsEditModalOpen(false);
      setEditCustomer(null);
      showToast(`Customer ${name} has been updated`, "success");
    },
    [editCustomer, customers, showToast]
  );

  /* ── Stat cards data ────────────────────────────────── */
  const statCards = useMemo(() => getStatCards(customers), [customers]);

  /* ── Format currency helper ─────────────────────────── */
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  /* ── Render ──────────────────────────────────────────── */
  return (
    <div className="space-y-6">
      {/* Toast */}
      {Toast && Toast()}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <ModalOverlay onClose={() => setDeleteConfirm(null)}>
          <div>
            <div className="flex items-center justify-between border-b border-[var(--table-divider)] px-6 py-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Confirm Deletion
              </h2>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="rounded-lg p-1 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-[var(--text-secondary)]">
                Are you sure you want to delete{" "}
                <span className="font-medium text-[var(--text-primary)]">
                  {deleteConfirm.name}
                </span>{" "}
                (ID: {deleteConfirm.id})? This action cannot be undone and all
                associated data will be permanently removed.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-[var(--table-divider)] px-6 py-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
              >
                <X size={14} />
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-400/20"
              >
                <Trash2 size={14} />
                Delete Customer
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* View Customer Detail Modal */}
      {isViewModalOpen && viewCustomer && (
        <ModalOverlay onClose={() => setIsViewModalOpen(false)}>
          <div>
            <div className="flex items-center justify-between border-b border-[var(--table-divider)] px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  Customer Details
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                  {viewCustomer.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    statusConfig[viewCustomer.status].bg
                  } ${statusConfig[viewCustomer.status].color}`}
                >
                  {statusConfig[viewCustomer.status].label}
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

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-xl bg-[var(--hover-bg)] flex items-center justify-center">
                  <User size={28} className="text-[var(--text-secondary)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    {viewCustomer.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {viewCustomer.company}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Email
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Mail size={13} className="text-[var(--text-tertiary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      {viewCustomer.email}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Phone
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Phone size={13} className="text-[var(--text-tertiary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      {viewCustomer.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Company
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Building2 size={13} className="text-[var(--text-tertiary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      {viewCustomer.company}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Total Spent
                  </p>
                  <p className="text-lg font-bold text-[var(--text-primary)] mt-1">
                    {formatCurrency(viewCustomer.totalSpent)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Orders
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mt-1">
                    {viewCustomer.orders} orders
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    Joined
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock size={13} className="text-[var(--text-tertiary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      {viewCustomer.joined}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[var(--table-divider)] px-6 py-4">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setTimeout(() => handleEditCustomer(viewCustomer), 100);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setTimeout(() => handleDeleteCustomer(viewCustomer), 100);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-400/20"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Edit Customer Modal */}
      {isEditModalOpen && editCustomer && (
        <ModalOverlay onClose={() => { setIsEditModalOpen(false); setEditCustomer(null); }}>
          <div>
            <div className="flex items-center justify-between border-b border-[var(--table-divider)] px-6 py-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Edit Customer
              </h2>
              <button
                onClick={() => { setIsEditModalOpen(false); setEditCustomer(null); }}
                className="rounded-lg p-1 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={handleEditCustomerSubmit}
              className="space-y-4 p-6"
            >
              <div>
                <label
                  htmlFor="edit-fullName"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Full Name
                </label>
                <input
                  id="edit-fullName"
                  name="fullName"
                  type="text"
                  defaultValue={editCustomer.name}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
              </div>
              <div>
                <label
                  htmlFor="edit-email"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Email
                </label>
                <input
                  id="edit-email"
                  name="email"
                  type="email"
                  defaultValue={editCustomer.email}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
              </div>
              <div>
                <label
                  htmlFor="edit-phone"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Phone
                </label>
                <input
                  id="edit-phone"
                  name="phone"
                  type="tel"
                  defaultValue={editCustomer.phone}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
              </div>
              <div>
                <label
                  htmlFor="edit-company"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Company
                </label>
                <input
                  id="edit-company"
                  name="company"
                  type="text"
                  defaultValue={editCustomer.company}
                  placeholder="Acme Corp"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setIsEditModalOpen(false); setEditCustomer(null); }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-transparent bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-violet-600"
                >
                  <Edit size={14} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* ── Add Customer Modal ──────────────────────────── */}
      {isAddModalOpen && (
        <ModalOverlay onClose={() => setIsAddModalOpen(false)}>
          <div>
            <div className="flex items-center justify-between border-b border-[var(--table-divider)] px-6 py-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Add Customer
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddCustomerSubmit} className="space-y-4 p-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                  />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] pl-10 pr-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] pl-10 pr-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Phone
                </label>
                <div className="relative">
                  <Phone
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                  />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] pl-10 pr-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
                >
                  Company
                </label>
                <div className="relative">
                  <Building2
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                  />
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] pl-10 pr-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-transparent bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-violet-600"
                >
                  <Plus size={14} />
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* ── PageHeader ──────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Customers
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Manage your customer base and track activity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
          >
            <Plus size={16} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
            placeholder="Search by name, email, or ID..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 pr-8 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
            >
              <option value="joined-newest">Joined Newest</option>
              <option value="joined-oldest">Joined Oldest</option>
              <option value="az">Name A–Z</option>
              <option value="za">Name Z–A</option>
              <option value="orders-desc">Orders High–Low</option>
              <option value="orders-asc">Orders Low–High</option>
            </select>
            <ArrowUpDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
          </div>

          {/* Export & Refresh */}
          <button
            onClick={() => alert("Customer data exported as CSV.")}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
          >
            <Download size={16} />
            Export
          </button>
          <button
            onClick={() => {
              setCustomers(initialCustomers);
              setSearchQuery("");
              setStatusFilter("all");
              setSortBy("joined-newest");
              setCurrentPage(1);
              showToast("Customer data refreshed", "success");
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          {/* Clear Filters */}
          {(searchQuery || statusFilter !== "all" || sortBy !== "joined-newest") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setSortBy("joined-newest");
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
        {filteredAndSortedCustomers.length} result
        {filteredAndSortedCustomers.length !== 1 ? "s" : ""}
      </p>

      {/* Data Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[var(--table-divider)] bg-[var(--table-header-bg)]">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--table-divider)]">
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => {
                  const status = statusConfig[customer.status];
                  const StatusIcon = status.icon;
                  return (
                    <tr
                      key={customer.id}
                      className="transition-colors hover:bg-[var(--table-row-hover)]"
                    >
                      {/* Customer (avatar + name + ID) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-[var(--hover-bg)] flex items-center justify-center text-[var(--text-secondary)] font-medium text-xs">
                            <User size={14} />
                          </div>
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">
                              {customer.name}
                            </p>
                            <p className="text-xs text-[var(--text-tertiary)]">
                              {customer.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Mail size={14} className="text-[var(--text-tertiary)]" />
                          <span className="text-sm text-[var(--text-secondary)]">
                            {customer.email}
                          </span>
                        </div>
                      </td>

                      {/* Orders */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-[var(--text-secondary)]">
                          {customer.orders}
                        </span>
                      </td>

                      {/* Total Spent */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {formatCurrency(customer.totalSpent)}
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

                      {/* Joined */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-[var(--text-secondary)]">
                          {customer.joined}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <ActionDropdown
                          customer={customer}
                          onView={handleViewCustomer}
                          onEdit={handleEditCustomer}
                          onDelete={handleDeleteCustomer}
                          onToggleStatus={handleToggleStatus}
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
                      No customers match your filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setSortBy("joined-newest");
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
            {filteredAndSortedCustomers.length > 0 ? showingFrom : 0}
          </span>{" "}
          –{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {showingTo}
          </span>{" "}
          of{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {filteredAndSortedCustomers.length}
          </span>{" "}
          customers
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
    </div>
  );
}